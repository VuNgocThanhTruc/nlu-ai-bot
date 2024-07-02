import React from "react";
import NLUAILogo from '../../../assests/logo-nlu-ai.png'
import userLogo from '../../../assests/user.svg'
import './style.css'

const Chat = ({ user, text }) => {

    return (
        <div className={`chat ${user.username !== 'bot' ? 'user' : 'bot'}`}>
            <div className="left">
                <img className="logo" src={user.username !== 'bot' ? userLogo : NLUAILogo} alt="" />
            </div>
            <div className="right">
                <h6>{user.username !== 'bot' ? 'You' : 'NLU bot'}</h6>
                <p className="text">{text}</p>
            </div>
        </div>
    )
}

export default Chat;