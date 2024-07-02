import React from "react";
import Header from "../header";
import ListChat from "../listChat";
import ChatFooter from "../chatFooter/index";
import { ListChatProps, UserProps } from "../../../utils/types";
// import { chats } from "../../../mock-data/mockData";
import { useSelector } from "react-redux";
import { chats } from "../../../redux/selectors";
import { USER_INFO } from "../../../mock-data/mockData";

const MainChat = () => {
    const chatsFromStore = useSelector(chats);
    const user: UserProps = USER_INFO
    const listChat: ListChatProps = { roomId: 1, loading: false, user: user, chats: chatsFromStore }

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
