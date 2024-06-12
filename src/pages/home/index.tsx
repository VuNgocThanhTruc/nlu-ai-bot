import React from "react";
import MainChat from "../../components/main/mainChat";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () =>{
    return (
        <div className="row">
            <div className="col-2">
                <Sidebar/>
            </div>
            <div className="col-10">
                <MainChat/>
            </div>
        </div>
    )
}

export default Home;
