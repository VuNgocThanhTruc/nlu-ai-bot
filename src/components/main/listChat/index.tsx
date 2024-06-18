import React from "react";
import './style.css'
import Chat from "./Chat";
import { ListChatProps } from "../../../utils/types";

const ListChat: React.FC<ListChatProps> = ({ roomId, loading, user, chats }) => {

    return (
        <div className="list-chat flex-grow-1">
            {loading === false ? chats.map((chat, index) => (
                <Chat key={index} user={chat.user} text={chat.text} />
            )) : <div>Loading...</div>}
        </div>
    )
}

export default ListChat;