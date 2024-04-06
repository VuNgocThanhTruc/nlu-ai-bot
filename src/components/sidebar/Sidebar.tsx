import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {IconContext} from 'react-icons';
import {AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai';
import {IoSettingsOutline} from "react-icons/io5";
import {MdOutlineDarkMode} from "react-icons/md";
import {SidebarData} from './SidebarData';
import Submenu from './Submenu';
import imageChatLogo from "../../images/chat_logo.png";

const Container = styled.div`
    display: flex;
    position: relative;
`;

const Nav = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 5rem;
    background-color: #2d313a;
    height: 100vh;
    flex-direction: column;
    z-index: 2;
`;

const LogoContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-image: url('../../logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: auto;
    height: 100vh;
    background-color: #2d313a;
    display: flex;
    flex-direction: column;
    transform: ${({sidebar}) => (sidebar ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 5rem;
    z-index: 1;
    border-left: 2px solid white;
`;

const NavIcon = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 2rem;
    margin-top: 2rem;
`;
const Logo = styled.img`
    width: 80%; /* Adjust width as needed */
    margin-top: 2rem;
    margin-bottom: 2rem;
`;
const SidebarWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const Sidebar: FC = () => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <Container>
                <Nav>
                    <Logo src={imageChatLogo} alt="Logo" />
                    <NavIcon to="#" onClick={showSidebar}>
                        {sidebar ? <AiOutlineMenuFold/> : <AiOutlineMenu/>}
                    </NavIcon>

                    <NavIcon to="#">
                        <MdOutlineDarkMode/>
                    </NavIcon>
                    <NavIcon to="#">
                        <IoSettingsOutline/>
                    </NavIcon>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        {SidebarData.map((item, index) => {
                            return <Submenu item={item} key={index}/>;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </Container>
        </IconContext.Provider>
    );
};

export default Sidebar;
