import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import Submenu from './Submenu';

const Nav = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 5rem;
    background-color: black;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
`;
const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: auto;
    height: 100vh;
    background-color: black;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '5rem' : '-15rem')};
    transition: 350ms;
    display: flex;
    flex-direction: column;
`;

const NavIcon = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 2rem;
    margin-top: 2rem;
`;

const SidebarWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const Sidebar: FC = () => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavIcon to="#" onClick={showSidebar}>
                    <AiOutlineMenu />
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#" onClick={showSidebar}>
                        <AiOutlineClose />
                    </NavIcon>
                    {SidebarData.map((item, index) => {
                        return <Submenu item={item} key={index} />;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
    );
};

export default Sidebar;