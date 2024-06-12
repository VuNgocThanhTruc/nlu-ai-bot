import React from "react";
import sendBtn from '../../../assests/send-icon.svg'
import "./style.css";

const ChatFooter = () =>{
    return (
        <div className="chat-footer">
            <div className="component">
                <textarea className="text" placeholder="Nhập câu hỏi của bạn..."></textarea>
                <button className="send"><img src={sendBtn} alt="" /></button>
            </div>
        </div>
    )
}

export default ChatFooter;