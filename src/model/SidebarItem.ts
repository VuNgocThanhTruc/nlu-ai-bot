export interface SidebarItem {
    title: string;
    path: string;
    icon?: any;
    idRoom?: number;
    iconOpened?: any;
    iconClosed?: any;
    subnav?: SidebarItem[];
}
