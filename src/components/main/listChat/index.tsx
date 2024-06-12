import React from "react";
import './style.css'
import Chat from "./Chat";
import userLogo from '../../../assests/user.svg'

const ListChat = () => {
    return (
        <div className="list-chat flex-grow-1">
            <Chat user='user' text='Lorem ipsum dolor sit amet consectetur '/>

            <Chat user='bot' text='Lorem ipsum dolor sit amet consectetur '/>

            <Chat user='bot' text='Lorem ipsum dolor sit amet consectetur '/>
        </div>
    )
}

export default ListChat;