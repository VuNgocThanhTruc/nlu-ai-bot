import React, { FC, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDarkMode, MdDataObject } from "react-icons/md";
import { SidebarData } from '../../mock-data/SidebarData';
import Submenu from './Submenu';
import imageChatLogo from "../../images/logo.png";
import {
    Container,
    Nav,
    SidebarNav,
    NavIcon,
    Logo,
    SidebarWrap
} from './SidebarStyles'; // Importing the styled-components
import { roomsSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { SidebarItem } from '../../model/SidebarItem';

interface SidebarProps {
    onToggleComponent: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onToggleComponent }) => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    const RoomDataFromStore: SidebarItem[] = useSelector(roomsSelector);

    return (
        <IconContext.Provider value={{ color: '#2d313a' }}> {/* Updated color */}
            <Container>
                <Nav>
                    <Logo src={imageChatLogo} alt="Logo" />
                    <NavIcon to="#" onClick={showSidebar}>
                        {sidebar ? <AiOutlineMenuFold /> : <AiOutlineMenu />}
                    </NavIcon>

                    <NavIcon to="#">
                        <MdOutlineDarkMode />
                    </NavIcon>
                    <NavIcon to="#" onClick={onToggleComponent}>
                        <MdDataObject />
                    </NavIcon>
                    <NavIcon to="#">
                        <IoSettingsOutline />
                    </NavIcon>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        {RoomDataFromStore.map((item: SidebarItem, index: number) => {
                            return <Submenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </Container>
        </IconContext.Provider>
    );
};

export default Sidebar;
