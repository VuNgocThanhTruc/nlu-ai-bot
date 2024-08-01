import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SidebarData } from "../../mock-data/SidebarData";
import { SidebarItem } from "../../model/SidebarItem";

export const roomsSlice = createSlice({
    name: 'rooms', //mapping parent
    initialState: {
        rooms: SidebarData,
        selectedRoom: 0,
    }, //giá trị khởi tạo ~ state
    reducers: {
        //redux toolkit auto action creater => {type: rooms/addRoom}
        addRoom: (state, action: PayloadAction<SidebarItem>) => {
            // viết giống multation thực tế lại immultation, nhờ toolkit xử lý bên dưới
            state.rooms.splice(1, 0, action.payload);
        },
        choosedRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
        loadRooms: (state, action: PayloadAction<SidebarItem[]>) => {
            state.rooms = [state.rooms[0], ...action.payload]; 
        }
    }
})