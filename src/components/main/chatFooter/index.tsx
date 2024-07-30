import React, { useEffect, useRef, useState } from "react";
import sendBtn from '../../../assests/send-icon.svg'
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingResponseChatSlice } from "../../../redux/slices/loadingResponseChatSlice";
import { ChatProps } from "../../../utils/types";
import { chatsSlice } from "../../../redux/slices/chatsSlice";
import { FETCH_POST_ROOM, POST_CHAT } from "../../../utils/FetchData";
import { USER_INFO } from "../../../mock-data/mockData";
import { chats, roomsSelector, roomsselectedSelector } from "../../../redux/selectors";
import { roomsSlice } from "../../../redux/slices/roomsSlice";
import axios from "axios";

const ChatFooter = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const [isTextEmpty, setIsTextEmpty] = useState(true);
    const ws = useRef<WebSocket | null>(null);
    const roomsselected = useSelector(roomsselectedSelector);
    const roomsFromStore = useSelector(roomsSelector);
    const roomsselectedRef = useRef(roomsselected);
    const textRef = useRef(text); 

    useEffect(() => {
        textRef.current = text; 
    }, [text]);

    useEffect(() => {
        roomsselectedRef.current = roomsselected;
    }, [roomsselected]);

    useEffect(() => {
        const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
        if (websocketUrl) {
            ws.current = new WebSocket(websocketUrl);
            ws.current.onopen = () => {
                console.log('WebSocket is open now.');
            };

            ws.current.onclose = () => {
                console.log('WebSocket is closed now.');
            };

            ws.current.onmessage = (event) => {
                const response = JSON.parse(event.data);
                // console.log(response);
                
                if (response.user.role != 0)
                    dispatch(chatsSlice.actions.addChat(response));
                else {
                    dispatch(loadingResponseChatSlice.actions.setLoadingResponse(false))
                    const { user, generate_text, prev_text, stop } = response;
                    const newChat: ChatProps = {
                        user: user,
                        text: ""
                    };
                    prev_text == textRef.current && dispatch(chatsSlice.actions.addChat(newChat));
                    dispatch(chatsSlice.actions.updateLastChat(generate_text));
                    if (stop) {
                        setText('')
                        setIsTextEmpty(true)
                    }
                }
            };

            return () => {
                ws.current?.close();
            };
        }
    }, [dispatch]);

    const handleButonSend = async () => {
        const newChat: ChatProps = {
            user: { id: USER_INFO.id, role: USER_INFO.role, username: USER_INFO.username },
            text: text
        }

        if (text.trim() !== '' && ws.current && ws.current.readyState === WebSocket.OPEN) {
            // Send chat to WebSocket server
            ws.current?.send(JSON.stringify(newChat));
            let dataRoom = {
                "id_user": USER_INFO.id,
                "title": text
            }
            
            const data = { "input": newChat.text }
            dispatch(loadingResponseChatSlice.actions.setLoadingResponse(true))
            // setTimeout(() => {
            //     const newBotChat: ChatProps = {
            //         user: { id: 1, role: 0, username: "bot" },
            //         text: "Đã tạo sinh văn bản thành công!"
            //     }
            //     ws.current?.send(JSON.stringify(newBotChat));
            //     dispatch(loadingResponseChatSlice.actions.setLoadingResponse(false))
            // }, 3000);
            // try {
            //     const response = await axios.post(`${process.env.REACT_APP_URL_SERVER}api/generate`, data);

            //     if (response.data.status === 200) {
            //         console.log("chats.length: " + chats.length);

            //         chats.length == 0 && FETCH_POST_ROOM("/rooms/", dataRoom, dispatch)
            //         dispatch(loadingResponseChatSlice.actions.setLoadingResponse(false))
            //         const newBotChat: ChatProps = {
            //             user: { id: 0, role: 0, username: "bot" },
            //             text: response.data.data[0].generated_text
            //         }
            //         // Send bot response to WebSocket server
            //         ws.current?.send(JSON.stringify(newBotChat));
            //     }
            // } catch (error) {
            //     if (axios.isAxiosError(error)) {
            //         console.error('Error with axios request:', error.message);
            //     } else {
            //         console.error('Unexpected error:', error);
            //     }
            // }
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