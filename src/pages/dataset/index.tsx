import styled from "styled-components";
import CreateDataset from "../../components/createDataset/HomeCreateDataset";
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
