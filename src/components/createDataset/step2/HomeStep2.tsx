import styled, { CSSProperties } from "styled-components";
import imageChatLogo from "../../../images/logo.png";
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
            <h2>Screen 2</h2>
        </div>
    )
}

export default Dataset;
