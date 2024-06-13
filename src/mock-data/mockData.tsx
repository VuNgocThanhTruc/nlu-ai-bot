import { ChatProps } from "../utils/types";

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