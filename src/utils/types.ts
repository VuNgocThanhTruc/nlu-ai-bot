export interface ChatProps {
    user: UserProps,
    text: string,
}

export interface UserProps {
    id: number,
    role: number,
    name: string,
}

export interface ListChatProps {
    roomId: number,
    chats: ChatProps[],
    user: UserProps,
    loading: boolean,
    error?: string //có thể generate or not
}