import React, { useState } from "react";
import MainChat from "../../components/main/mainChat";
import Sidebar from "../../components/sidebar/Sidebar";
import CreateDataset from "../../components/createDataset/HomeCreateDataset";

const Home = () => {
    const [showMainChat, setShowMainChat] = useState(true);

    const toggleComponent = () => {
        setShowMainChat(!showMainChat);
    };

    return (
        <div className="row" style={{ height: "100vh" }}>
            <div className="col-3">
                <Sidebar onToggleComponent={toggleComponent} />
            </div>
            <div className="col-9">
                {showMainChat ? <MainChat /> : <CreateDataset />}
            </div>
        </div>
    );
};

export default Home;
