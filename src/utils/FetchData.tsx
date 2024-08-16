import axios from "axios";
import { SidebarItem } from "../model/SidebarItem";
import { roomsSlice } from "../redux/slices/roomsSlice";
import { chatsSlice } from "../redux/slices/chatsSlice";
import { ChatProps, UserProps } from "./types";

export const FETCH_ROOM = (user_id: number, dispatch: any) => {
    axios.get(`${process.env.REACT_APP_URL_SERVER}/rooms/user/${user_id}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
        .then(response => {
            const rooms: SidebarItem[] = [];
            if (response.status === 200)
                response.data.forEach((room: any) => {
                    const newRoom: SidebarItem = {
                        title: room.title,
                        path: `/rooms/${room.id}`,
                        idRoom: room.id
                    }
                    rooms.push(newRoom)
                })
            dispatch(roomsSlice.actions.loadRooms(rooms));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// /rooms/
export const FETCH_POST_ROOM = async (path: string, data: any, dispatch: any) => {
    const dataRequest = {
        id_user: data.user.id,
        title: data.text
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_URL_SERVER}${path}`, dataRequest, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (response.status === 200) {
            const room = response.data;
            const newRoom: SidebarItem = {
                title: room.title,
                path: `/rooms/${room.id}`,
                idRoom: room.id
            };

            dispatch(roomsSlice.actions.choosedRoom(room.id));
            dispatch(roomsSlice.actions.addRoom(newRoom));

            return room.id;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
// /chats/room/{id_room}
export const FETCH_CHATS_BY_ROOM = (id_room: number, dispatch: any) => {
    axios.get(`${process.env.REACT_APP_URL_SERVER}/chats/room/${id_room}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
        .then(response => {            
            const arrChat: ChatProps[] = [];
            if (response.status === 200)
                response.data.forEach((chat: any) => {
                    const user: UserProps = {
                        id: chat.user.id,
                        role: chat.user.role,
                        username: chat.user.username,
                    }

                    const newChat: ChatProps = {
                        user: user,
                        text: chat.message
                    }
                    arrChat.push(newChat)
                })
            dispatch(chatsSlice.actions.loadChats(arrChat));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// /chats/
export const POST_CHAT = async (data: ChatProps, roomsSelected: number, dispatch: any) => {
    const dataRequest = {
        message: data.text,
        id_room: roomsSelected,
        id_user: data.user.id
    }

    await axios.post(`${process.env.REACT_APP_URL_SERVER}/chats/`, dataRequest, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
        .then(response => {
            response.status === 200 && data.user.id !== 1 &&
                FETCH_ROOM(data.user.id, dispatch)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
