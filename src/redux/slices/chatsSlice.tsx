import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chats } from "../../mock-data/mockData";
import { ChatProps, ListChatProps } from "../../utils/types";

export const chatsSlice = createSlice({
    name: 'chats', //mapping parent
    initialState: chats, //giá trị khởi tạo ~ state
    reducers: {
        //redux toolkit auto action creater => {type: chats/addChat}
        addChat: (state, action: PayloadAction<ChatProps>) => {
            // viết giống multation thực tế lại immultation, nhờ toolkit xử lý bên dưới
            state.push(action.payload);
        },
        loadChats: (state, action: PayloadAction<ChatProps[]>) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})