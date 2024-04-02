import React from "react";
import MainChat from "../../components/main/mainChat";
import SideBar from "../../components/sidebar";

const Home = () =>{
    return (
        <div className="row">
            <div className="col-2">
                <SideBar/>  
            </div>
            <div className="col-10">
                <MainChat/>
            </div>
        </div>
    )
}

export default Home;
