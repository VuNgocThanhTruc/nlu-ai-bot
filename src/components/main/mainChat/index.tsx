import React from "react";
import Header from "../header";
import ListChat from "../listChat";
import ChatFooter from "../chatFooter/index";
import { ListChatProps, UserProps } from "../../../utils/types";
// import { chats } from "../../../mock-data/mockData";
import { useSelector } from "react-redux";
import { chats } from "../../../redux/selectors";

const MainChat = () => {
    const chatFromStore = useSelector(chats);
    const user: UserProps = { id: 1, role: 1, name: "user" }
    const listChat: ListChatProps = { roomId: 1, loading: false, user: user, chats: chatFromStore }

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
