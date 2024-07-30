import { ChatProps, RoomProps } from "../utils/types";

export const chats: ChatProps[] = [
    // {
    //     user: { id: 1, role: 1, user: user },
    //     text: 'Hello, how are you?'
    // },
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
    id: 2,
    role: 1,
    username: "tester",
    password: "123456",
}
