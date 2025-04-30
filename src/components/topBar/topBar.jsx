import React, {useEffect, useState} from "react"
import "./topbar.css"
import { AiOutlineSearch,AiOutlineUser, AiFillMessage, AiFillSound } from "react-icons/ai";
import { CiChat2 } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";


export default function TopBar(){
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || { username: "Guest" };
    const [, setUsers] = useState([]);
    const [profilePicture, setProfilePicture] = useState('/uploads/icon.png');

        useEffect(() => {
            fetch('http://localhost:3001/api/users')
                .then(response => response.json())
                .then(data => {
                    setUsers(data.users);
                    const currentUser = data.users.find(user => user.username === username);
                    if (currentUser && currentUser.profile_picture) {
                        setProfilePicture(currentUser.profile_picture);
                    }
                })
                .catch(error => console.error('Error fetching users:', error));
        }, [username]);

        
    return(
        <div className="topBarContainer">
            <div className="topBarLeft">
                <span className="logo">S.B.Social</span>
            </div>
            <div className="topBarCenter">
                <div className="searchbar">
                    <AiOutlineSearch className="searchIcon"/>
                    <input placeholder="Search for people or posts" className="searchInput"/>
                </div>
            </div>
            <div className="topBarRight">
                <div className="topBarLinks">
                    <span className="topBarLink">Homepage</span>
                    <span className="topBarLink">TimeLine</span>
                </div>
                    <div className="post">
                        <CiChat2 />
                        
                        </div>
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <AiOutlineUser />
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <AiFillMessage />
                        <span className="topBarIconBadge">3</span>
                    </div>
                    <div className="topBarIconItem">
                        <AiFillSound />
                        <span className="topBarIconBadge">2</span>
                    </div>
                </div>
                <img src={`http://localhost:3001${profilePicture}`} alt="" className="profilePicture"
                onClick={() => navigate('/profile', { state: { username } })}/>
            </div>


        </div>
    )
}