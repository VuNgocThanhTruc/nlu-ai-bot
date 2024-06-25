import { configureStore } from "@reduxjs/toolkit";
import { chatsSlice } from "../components/main/listChat/chatsSlice";
import { loadingResponseChatSlice } from "../components/main/slices/loadingResponseChatSlice";

// tạo một nơi lưu trữ các obj global ~ public in java
export const store = configureStore({

    // tạo một reducer tổng hợp các slice
    reducer:{
        chats: chatsSlice.reducer,
        loadingResponse: loadingResponseChatSlice.reducer
    }
})