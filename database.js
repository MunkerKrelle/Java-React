const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const express = require('express');
const app = express();

// Create a new database or connect to an existing one
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table for users
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        profile_picture TEXT NOT NULL DEFAULT '/uploads/icon.png'
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Users table created or already exists.');
        }
    });
});

// Create a table for posts
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        owner TEXT NOT NULL,
        name TEXT NOT NULL, 
        text TEXT NOT NULL,
        date TEXT NOT NULL,
        photo BLOB NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Posts table created or already exists.');
        }
    });
});

// Create a table for comments
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY, 
        userref TEXT NOT NULL,
        text TEXT NOT NULL, 
        date TEXT NOT NULL,
        postref TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Comments table created or already exists.');
        }
    });
});

// Create a table for likes
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS likes (
        userref TEXT NOT NULL,
        postref TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Likes table created or already exists.');
        }
    });
});

// Insert a default user
db.serialize(() => {
    db.run(`INSERT INTO users (username, password, profile_picture) VALUES (?, ?, ?)`, ['admin', 'admin123', '/uploads/icon.png'], function(err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`Inserted user with ID: ${this.lastID}`);
        }
    });
});

// API endpoint to fetch users
app.get('/api/users', (req, res) => {
    console.log('GET /api/users called');
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Users fetched:', rows);
        res.json({ users: rows });
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Closed the database connection.');
    }
});

app.use(cors());
