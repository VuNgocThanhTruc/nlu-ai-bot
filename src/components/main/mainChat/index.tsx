import React from "react";
import Header from "../header";
import ListChat from "../listChat";
import ComponentChat from "../componentChat/ComponentChat";

const MainChat = () =>{
    return (
        <div className="d-flex flex-column">
            <Header/>
            <ListChat/>
            <ComponentChat/>
        </div>
    )
}

export default MainChat;
