import React from "react";
import NLUAILogo from '../../../assests/logo-nlu-ai.png'
import userLogo from '../../../assests/user.svg'
import './style.css'

const ListChat = () =>{
    return (
        <div className="list-chat flex-grow-1">
            <div className="chat bot">
                <img className="logo" src={NLUAILogo} alt="" />
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eaque labore facere, officia mollitia exercitationem minima animi similique magni voluptate dignissimos laborum delectus, corrupti ea. Asperiores vel labore unde ullam!</p>
            </div>

            <div className="chat user">
                <img className="logo" src={userLogo} alt="" />
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eaque labore facere, officia mollitia exercitationem minima animi similique magni voluptate dignissimos laborum delectus, corrupti ea. Asperiores vel labore unde ullam!</p>
            </div>
        </div>
    )
}

export default ListChat;