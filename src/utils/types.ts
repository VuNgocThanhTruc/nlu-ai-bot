export interface ChatProps {
    user: UserProps,
    text: string,
}

export interface UserProps {
    id: number,
    role: number,
    username: string
    // password: string,
}

export interface ListChatProps {
    roomId: number,
    chats: ChatProps[],
    user: UserProps,
    loading: boolean,
    error?: string //có thể generate or not
}

export interface RoomProps {
    roomId: number,
    userId: number,
    createAt: Date,
    updateAt: Date,
}
