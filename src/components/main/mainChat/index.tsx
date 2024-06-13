import React from "react";
import Header from "../header";
import ListChat from "../listChat";
import ChatFooter from "../chatFooter/index";
import { ListChatProps, UserProps } from "../../../utils/types";
import { chats } from "../../../mock-data/mockData";

const MainChat = () => {
    const user: UserProps = { id: 1, role: 1, name: "user" }
    const listChat: ListChatProps = { roomId: 1, loading: false, user: user, chats: chats }

    return (
        <div className="main d-flex flex-column">
            <Header />
            <ListChat
                roomId={listChat.roomId}
                loading={listChat.loading}
                user={listChat.user}
                chats={listChat.chats}
            />
            <ChatFooter />
        </div>
    )
}

export default MainChat;
