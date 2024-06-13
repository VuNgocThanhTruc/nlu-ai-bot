import React, { useState } from "react";
import sendBtn from '../../../assests/send-icon.svg'
import "./style.css";
import { useDispatch } from "react-redux";
import { chatsSlice } from "../listChat/chatsSlice";
import { ChatProps } from "../../../utils/types";
// import { chats } from "../../../mock-data/mockData";


const ChatFooter = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleButonSend = () => {
        const newChat: ChatProps = {
            user: { id: 1, role: 1, name: "user" },
            text: text
        }

        dispatch(chatsSlice.actions.addChat(newChat))
        setText('')
    }

    return (
        <div className="chat-footer">
            <div className="component">
                <textarea className="text" placeholder="Nhập câu hỏi của bạn..." onChange={(e) => setText(e.target.value)} value={text}></textarea>
                <button className="send" onClick={handleButonSend}><img src={sendBtn} alt="" /></button>
            </div>
        </div>
    )
}

export default ChatFooter;