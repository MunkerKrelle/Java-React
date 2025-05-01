const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to SQLite database
const db = new sqlite3.Database('mydatabase.db');

// API endpoint to get users
app.get('/api/users', (req, res) => {
    db.all('SELECT id, username, profile_picture FROM users', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

// API endpoint to add a new user
app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, password], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: this.lastID, username });
    });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(sql, [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database error' });
        } else if (row) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// API endpoint to upload a profile picture
app.post('/api/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
    const { username } = req.body; 
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    const sql = `UPDATE users SET profile_picture = ? WHERE username = ?`;

    db.run(sql, [filePath, username], function (err) {
        if (err) {
            console.error('Error updating profile picture:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Profile picture updated', filePath });
    });
});

// API endpoint to create a new post
app.post('/api/posts', upload.single('photo'), (req, res) => {
    const { owner, name, text, date } = req.body; // Extract post details from the request body
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Default to null if no photo is uploaded
    console.log('Post data received:', { owner, name, text, date, photo });

    const sql = `INSERT INTO posts (owner, name, text, date, photo) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [owner, name, text, date, photo], function (err) {
        if (err) {
            console.error('Error creating post:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: this.lastID, owner, name, text, date, photo });
    });
});

// API endpoint to fetch posts
app.get('/api/posts', (req, res) => {
    const { owner } = req.query;
    const sql = owner
        ? `SELECT * FROM posts WHERE owner = ?`
        : `SELECT * FROM posts`;

    db.all(sql, owner ? [owner] : [], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ posts: rows });
    });
});

// API endpoint to save a like
app.post('/api/likes', (req, res) => {
    const { userref, postref } = req.body;

    // Check if the user has already liked the post
    const checkSql = `SELECT * FROM likes WHERE userref = ? AND postref = ?`;
    db.get(checkSql, [userref, postref], (err, row) => {
        if (err) {
            console.error('Error checking like:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            // User has already liked the post
            return res.status(400).json({ error: 'User has already liked this post' });
        }

        // Insert the like into the likes table
        const insertSql = `INSERT INTO likes (userref, postref) VALUES (?, ?)`;
        db.run(insertSql, [userref, postref], function (err) {
            if (err) {
                console.error('Error saving like:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            // Increment the likes count in the posts table
            const updateSql = `UPDATE posts SET likes = likes + 1 WHERE id = ?`;
            db.run(updateSql, [postref], function (err) {
                if (err) {
                    console.error('Error updating likes count:', err.message);
                    return res.status(500).json({ error: 'Database error' });
                }

                res.status(201).json({ success: true });
            });
        });
    });
});

// API endpoint to save a comment
app.post('/api/comments', (req, res) => {
    const { userref, text, date, postref } = req.body;
    const sql = `INSERT INTO comments (userref, text, date, postref) VALUES (?, ?, ?, ?)`;
    db.run(sql, [userref, text, date, postref], function (err) {
        if (err) {
            console.error('Error saving comment:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ success: true });
    });
});

// API endpoint to fetch comments
app.get('/api/comments', (req, res) => {
    const sql = `SELECT * FROM comments`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching comments:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ comments: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
