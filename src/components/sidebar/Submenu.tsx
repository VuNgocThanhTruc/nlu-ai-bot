// Submenu.tsx
import React, { FC, useState } from 'react';
import { SidebarItem } from "../../model/SidebarItem";
import {
    SidebarLink,
    SidebarLabel,
} from './SubmenuStyles'; // Importing the styled-components
import { useDispatch, useSelector } from 'react-redux';
import { chatsSlice } from '../../redux/slices/chatsSlice';
import { FETCH_CHATS_BY_ROOM } from '../../utils/FetchData';
import { roomsSlice } from '../../redux/slices/roomsSlice';
import { roomsselectedSelector } from '../../redux/selectors';
import { chats } from '../../mock-data/mockData';

type SidebarLinkProps = {
    item: SidebarItem;
};

const Submenu: FC<SidebarLinkProps> = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
    const dispatch = useDispatch()
    const roomsselected = useSelector(roomsselectedSelector);

    const handleOnClick = () => {
        setSubnav(!subnav);
        if (item.idRoom !== undefined) {
            dispatch(roomsSlice.actions.choosedRoom(item.idRoom))
            FETCH_CHATS_BY_ROOM(item.idRoom, dispatch)
        } else {
            dispatch(roomsSlice.actions.choosedRoom(0))
            dispatch(chatsSlice.actions.loadChats(chats))
        }
    }

    return (
        <>
            <SidebarLink onClick={handleOnClick} className={item.idRoom === roomsselected ? 'selected' : ''}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
                <div>{item?.subnav && subnav ? item?.iconOpened : item?.iconClosed}</div>
            </SidebarLink>
        </>
    );
};

export default Submenu;
