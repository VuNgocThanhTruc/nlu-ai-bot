import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chats } from "../../mock-data/mockData";
import { ChatProps } from "../../utils/types";

export const chatsSlice = createSlice({
    name: 'chats', //mapping parent
    initialState: chats, //giá trị khởi tạo ~ state
    reducers: {
        //redux toolkit auto action creater => {type: chats/addChat}
        addChat: (state, action: PayloadAction<ChatProps>) => {
            // viết giống multation thực tế lại immultation, nhờ toolkit xử lý bên dưới
            state.push(action.payload);
        },
        updateLastChat: (state, action: PayloadAction<string>) => {
            if (state.length > 0) {
                state[state.length - 1].text += action.payload;
            } else {
                state[0].text += action.payload;
            }
        },
        loadChats: (state, action: PayloadAction<ChatProps[]>) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})