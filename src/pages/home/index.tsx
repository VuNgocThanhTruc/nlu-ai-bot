import { useEffect } from "react";
import MainChat from "../../components/main/mainChat";
import Sidebar from "../../components/sidebar/Sidebar";
import { FETCH_ROOM, USER_INFO } from "../../mock-data/mockData";
import { PacmanLoader } from "react-spinners";
import { CSSProperties } from "styled-components";
import { SidebarData } from "../../components/sidebar/SidebarData";
import CreateDataset from "../../components/createDataset/HomeCreateDataset";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Home = () => {
     const [showMainChat, setShowMainChat] = useState(true);

    const toggleComponent = () => {
        setShowMainChat(!showMainChat);
    };
    useEffect(()=>{
        FETCH_ROOM(USER_INFO?.id, SidebarData)
    },[USER_INFO?.id])

    return (
        USER_INFO?.id ?
                <div className="row" style={{ height: "100vh" }}>
            <div className="col-3">
                <Sidebar onToggleComponent={toggleComponent} />
            </div>
            <div className="col-9">
                {showMainChat ? <MainChat /> : <CreateDataset />}
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
