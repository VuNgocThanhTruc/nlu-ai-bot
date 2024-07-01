import axios from "axios";
import { ChatProps, RoomProps } from "../utils/types";
import { API_FASTAPI } from "../utils/server_util";
import { SidebarItem } from "../model/SidebarItem";
import { IoMdAdd } from "react-icons/io";
import { SidebarData } from "../components/sidebar/SidebarData";

export const chats: ChatProps[] = [
    {
        user: { id: 1, role: 1, name: "user" },
        text: 'Hello, how are you?'
    },
    {
        user: { id: 1, role: 0, name: "bot" },
        text: 'I am a bot, how can I assist you?'
    },
    {
        user: { id: 1, role: 1, name: "user" },
        text: 'I need help with my account.'
    },
    {
        user: { id: 1, role: 0, name: "bot" },
        text: 'Sure, I can help with that. What seems to be the problem?'
    },
    {
        user: { id: 1, role: 1, name: "user" },
        text: 'I forgot my password.'
    },
    {
        user: { id: 1, role: 0, name: "bot" },
        text: 'No worries, you can reset your password by clicking on the "Forgot Password" link.'
    }
]

export const rooms_fetch_data: RoomProps[] = [
    {
        roomId: 1,
        userId: 1,
        createAt: new Date(),
        updateAt: new Date(),
    },
    {
        roomId: 2,
        userId: 1,
        createAt: new Date(),
        updateAt: new Date(),
    },
    {
        roomId: 3,
        userId: 2,
        createAt: new Date('2023-01-01'),
        updateAt: new Date('2023-01-02'),
    },
    {
        roomId: 4,
        userId: 1,
        createAt: new Date(),
        updateAt: new Date(),
    },
]

export const USER_INFO = {
    id: 1,
    role: 1,
    username: "tester",
    password: "123456",
}

export const FETCH_ROOM = (user_id: number, arr: SidebarItem[]) => {
    axios.get(`${API_FASTAPI.url}/rooms/user/${user_id}`)
        .then(response => {
            if (response.status === 200)
                response.data.forEach((room: any) => {
                    arr.push({
                        title: `Room ${room.id}`,
                        path: `/rooms/${room.id}`,
                        icon: <IoMdAdd />
                    });
                })
                console.log(SidebarData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
