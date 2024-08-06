import React, { useEffect, useRef, useState } from "react";
import sendBtn from '../../../assests/send-icon.svg'
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingResponseChatSlice } from "../../../redux/slices/loadingResponseChatSlice";
import { ChatProps, ListChatProps } from "../../../utils/types";
import { chatsSlice } from "../../../redux/slices/chatsSlice";
import { FETCH_POST_ROOM, POST_CHAT } from "../../../utils/FetchData";
import { USER_INFO } from "../../../mock-data/mockData";
import { chats, roomsselectedSelector } from "../../../redux/selectors";

const ChatFooter = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const [isTextEmpty, setIsTextEmpty] = useState(true);
    const ws = useRef<WebSocket | null>(null);
    const roomsselected = useSelector(roomsselectedSelector);
    const roomsselectedRef = useRef(roomsselected);
    const textRef = useRef(text);
    const chatsFromStore = useSelector(chats);
    let sentense_generate = ''

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
                setIsTextEmpty(true)
                const response = JSON.parse(event.data);
                let dataRoom: ChatProps = {
                    "user": USER_INFO,
                    "text": ''
                }

                if (response.user.role != 0) {
                    sentense_generate = ''
                    dataRoom = {
                        "user": USER_INFO,
                        "text": textRef.current
                    }
                    dispatch(chatsSlice.actions.addChat(response));

                    if (chats.length === 0) {
                        dataRoom.text = textRef.current;
                        FETCH_POST_ROOM("/rooms/", dataRoom, dispatch);
                    }
                    POST_CHAT(dataRoom, roomsselectedRef.current, dispatch)
                }
                else {
                    dispatch(loadingResponseChatSlice.actions.setLoadingResponse(false))
                    const { user, generate_text, prev_text, stop } = response;
                    const newChat: ChatProps = {
                        user: user,
                        text: ''
                    };
                    prev_text == textRef.current && dispatch(chatsSlice.actions.addChat(newChat));
                    dispatch(chatsSlice.actions.updateLastChat(generate_text));
                    sentense_generate += generate_text
                    if (stop) {
                        dataRoom = {
                            "user": user,
                            "text": sentense_generate
                        }
                        POST_CHAT(dataRoom, roomsselectedRef.current, dispatch)
                        setText('')
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

            dispatch(loadingResponseChatSlice.actions.setLoadingResponse(true))
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