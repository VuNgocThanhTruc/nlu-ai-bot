// Submenu.tsx
import React, { FC, useState } from 'react';
import { SidebarItem } from "../../model/SidebarItem";
import {
    SidebarLink,
    SidebarLabel,
    DropdownLink
} from './SubmenuStyles'; // Importing the styled-components

type SidebarLinkProps = {
    item: SidebarItem;
};

const Submenu: FC<SidebarLinkProps> = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);


    return (
        <>
            <SidebarLink to={item.path} onClick={showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>{item?.subnav && subnav ? item?.iconOpened : item?.iconClosed}</div>
            </SidebarLink>
            {subnav &&
                item?.subnav?.map((subnavItem, index) => {
                    return (
                        <DropdownLink to={subnavItem.path} key={index}>
                            {subnavItem.icon}
                            <SidebarLabel>{subnavItem.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    );
};

export default Submenu;
