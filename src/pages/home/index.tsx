import { useEffect } from "react";
import MainChat from "../../components/main/mainChat";
import Sidebar from "../../components/sidebar/Sidebar";
import { FETCH_ROOM, USER_INFO } from "../../mock-data/mockData";
import { PacmanLoader } from "react-spinners";
import { CSSProperties } from "styled-components";
import { SidebarData } from "../../components/sidebar/SidebarData";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Home = () => {
    useEffect(()=>{
        FETCH_ROOM(USER_INFO?.id, SidebarData)
    },[USER_INFO?.id])

    return (
        USER_INFO?.id ?
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10">
                    <MainChat />
                </div>
            </div> :
            <PacmanLoader
                color="#74b636"
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={1}
            />
    )
}

export default Home;
