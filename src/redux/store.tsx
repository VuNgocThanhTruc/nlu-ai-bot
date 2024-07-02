import { configureStore } from "@reduxjs/toolkit";
import { loadingResponseChatSlice } from "./slices/loadingResponseChatSlice";
import { chatsSlice } from "./slices/chatsSlice";
import { roomsSlice } from "./slices/roomsSlice";

// tạo một nơi lưu trữ các obj global ~ public in java
export const store = configureStore({

    // tạo một reducer tổng hợp các slice
    reducer:{
        chats: chatsSlice.reducer,
        rooms: roomsSlice.reducer,
        loadingResponse: loadingResponseChatSlice.reducer
    }
})