import React, { useEffect, useRef, useState } from "react";
import './style.css'
import Chat from "./Chat";
import { ListChatProps } from "../../../utils/types";
import { useSelector } from "react-redux";
import { loadingResponse } from "../../../redux/selectors";
import { SyncLoader } from "react-spinners";

const ListChat: React.FC<ListChatProps> = ({ roomId, loading, user, chats }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const loadingResponseChat = useSelector(loadingResponse);

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
                    {chats.map((chat, index) => (
                        <Chat key={index} user={chat.user} text={chat.text} />
                    ))}
                    {
                        loadingResponseChat.status === true ? <Chat user="bot" text={
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
                <div>Loading...</div>
            )}
        </div>
    );
}

export default ListChat;