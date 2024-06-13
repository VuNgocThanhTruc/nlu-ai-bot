import React from "react";
import NLUAILogo from '../../../assests/logo-nlu-ai.png'
import userLogo from '../../../assests/user.svg'
import './style.css'

const Chat = ({ user, text }) => {

    return (
        <div className={`chat ${user.name === 'user' ? 'user' : 'bot'}`}>
            <div className="right">
                <img className="logo" src={user.name === 'user' ? userLogo : NLUAILogo} alt="" />
            </div>
            <div className="left">
                <h6>{user.name === 'user' ? 'You' : 'NLU bot'}</h6>
                <p className="text">{text}</p>
            </div>
        </div>
    )
}

export default Chat;