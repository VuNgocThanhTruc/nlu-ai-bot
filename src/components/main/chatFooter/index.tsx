import React, { useState } from "react";
import sendBtn from '../../../assests/send-icon.svg'
import "./style.css";
import { useDispatch } from "react-redux";
import { chatsSlice } from "../listChat/chatsSlice";
import { loadingResponseChatSlice } from "../slices/loadingResponseChatSlice";
import { ChatProps } from "../../../utils/types";
import { API_FASTAPI } from '../../../utils/server_util'
import axios from "axios";

const ChatFooter = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const [isTextEmpty, setIsTextEmpty] = useState(true);

    const handleButonSend = async () => {
        const newChat: ChatProps = {
            user: { id: 1, role: 1, name: "user" },
            text: text
        }

        if (text.trim() !== '') {
            dispatch(chatsSlice.actions.addChat(newChat))
            setText('')
            setIsTextEmpty(true);
            const data = { "input": newChat.text }
            dispatch(loadingResponseChatSlice.actions.setLoadingResponse(true))
            setTimeout(() => {
                dispatch(chatsSlice.actions.addChat({
                    user: { id: 1, role: 1, name: "bot" },
                    text: "Đã tạo sinh văn bản thành công!"
                }))
                dispatch(loadingResponseChatSlice.actions.setLoadingResponse(false))
            }, 3000);
            try {
                const response = await axios.post(`${API_FASTAPI.url}api/generate`, data);

                if (response.data.status === 200) {
                    dispatch(loadingResponseChatSlice.actions.setLoadingResponse(false))
                    const newChat: ChatProps = {
                        user: { id: 0, role: 0, name: "bot" },
                        text: response.data.data[0].generated_text
                    }
                    dispatch(chatsSlice.actions.addChat(newChat))
                    console.log('Response:', response.data.data[0].generated_text);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error with axios request:', error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        }
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setIsTextEmpty(e.target.value === '');
    };

    const handleSubmitSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleButonSend()
        }
    }

    return (
        <div className="chat-footer">
            <div className="component">
                <textarea id="textarea" className="text" placeholder="Nhập câu hỏi của bạn..."
                    onKeyDown={(e) => handleSubmitSend(e)}
                    onChange={(e) => handleChangeText(e)}
                    value={text}
                ></textarea>
                <button id="sendButton" className="send" onClick={handleButonSend} disabled={isTextEmpty}><img src={sendBtn} alt="" /></button>
            </div>
        </div>
    )
}

export default ChatFooter;