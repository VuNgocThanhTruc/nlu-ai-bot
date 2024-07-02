import { useEffect } from "react";
import MainChat from "../../components/main/mainChat";
import Sidebar from "../../components/sidebar/Sidebar";
import { USER_INFO } from "../../mock-data/mockData";
import { PacmanLoader } from "react-spinners";
import { CSSProperties } from "styled-components";
import { FETCH_ROOM } from "../../utils/FetchData";
import { useDispatch } from "react-redux";
import { SidebarData } from "../../components/sidebar/SidebarData";
import CreateDataset from "../../components/createDataset/HomeCreateDataset";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Home = () => {
     const dispatch = useDispatch();
     const [showMainChat, setShowMainChat] = useState(true);

    const toggleComponent = () => {
        setShowMainChat(!showMainChat);
    };
    useEffect(() => {
        FETCH_ROOM(USER_INFO.id, dispatch);
    }, [])

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
