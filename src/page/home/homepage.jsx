import React from "react";
import TopBar from "../../components/topBar/topBar";
import SideBar from "../../components/sideBar/sideBar";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/rightBar/rightBar";
import "./home.css"

export default function Home(){
    return(
        <>
            <TopBar/>
            <div className="homeContainer">
            <SideBar/>
            <Feed/>
            <RightBar/>
            </div>
        </>
    )
}