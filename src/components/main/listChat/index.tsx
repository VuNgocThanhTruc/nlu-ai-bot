import React, { useEffect, useRef } from "react";
import './style.css'
import Chat from "./Chat";
import { ListChatProps, UserProps } from "../../../utils/types";
import { useSelector } from "react-redux";
import { loadingResponse } from "../../../redux/selectors";
import { SyncLoader } from "react-spinners";

const ListChat: React.FC<ListChatProps> = ({ roomId, loading, user, chats }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const loadingResponseChat = useSelector(loadingResponse);
    const bot: UserProps = { id: 0, role: 0, username: "bot" }

    const scrollToBottom = () => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    return (
        <div className="list-chat flex-grow-1">
            {loading === false ? (
                <>
                    {chats.length <= 0 ?
                        <Chat user={bot} text={`Xin chào ${user.username}, NLU bot có thể giúp gì được cho bạn?`} />
                        :
                        chats.map((chat, index) => (
                            <Chat key={index} user={chat.user} text={chat.text} />
                        ))}
                        {
                            loadingResponseChat.status === true ? <Chat user={bot} text={
                                <SyncLoader
                                    color="#74b636"
                                    size={8}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    speedMultiplier={1}
                                />
                            } /> : ""}
                    <div ref={endOfMessagesRef} />
                </>
            ) : (
                <div><SyncLoader
                    // color="#74b636"
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    speedMultiplier={1}
                /></div>
            )}
        </div>
    );
}

export default ListChat;