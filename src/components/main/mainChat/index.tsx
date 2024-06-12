import React from "react";
import Header from "../header";
import ListChat from "../listChat";
import ChatFooter from "../chatFooter/index";

const MainChat = () =>{
    return (
        <div className="main d-flex flex-column">
            <Header/>
            <ListChat/>
            <ChatFooter/>
        </div>
    )
}

export default MainChat;
