import { USER_INFO } from "../../mock-data/mockData";
import { PacmanLoader } from "react-spinners";
import styled, { CSSProperties } from "styled-components";
import { useDispatch } from "react-redux";
import CreateDataset from "../../components/createDataset/HomeCreateDataset";
import { Logo, NavIcon } from "../../components/sidebar/SidebarStyles";
import imageChatLogo from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';
const LogoContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
`;

const LogoImage = styled.img`
    height: 50px;
`;
const Dataset = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div>
            <LogoContainer onClick={handleLogoClick}>
                <LogoImage src={imageChatLogo} alt="Logo" />
            </LogoContainer>
            <CreateDataset />
        </div>
    )
}

export default Dataset;
