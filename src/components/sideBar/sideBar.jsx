import React from "react"
import "./sideBar.css"
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

export default function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <AiOutlineUnorderedList className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaBookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <MdGroups className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <SlCalender className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>

                </ul>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    <span className="sbFriendList">Friend List</span>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/people/Eevee.jpg" alt="" />
                        <span className="sidebarFriendName">Eevee dog</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}