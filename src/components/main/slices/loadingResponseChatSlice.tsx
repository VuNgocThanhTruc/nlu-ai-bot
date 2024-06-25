import { createSlice } from "@reduxjs/toolkit";

export const loadingResponseChatSlice = createSlice({
    name: 'loadingResponse', //mapping parent
    initialState: { status: false }, //giá trị khởi tạo ~ state
    reducers: {
        setLoadingResponse: (state, action) => {
            state.status = action.payload
        }
    }
})