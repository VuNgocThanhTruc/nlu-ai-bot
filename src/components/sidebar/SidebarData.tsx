import { IoMdAdd } from "react-icons/io";
import { SidebarItem } from '../../models/SidebarItem';
export const SidebarData: SidebarItem[] = [
    // {
    //     title: 'Overview',
    //     path: '/overview',
    //     icon: <AiOutlineHome />,
    //     iconClosed: <AiFillCaretDown />,
    //     iconOpened: <AiFillCaretUp />,
    //     subnav: [
    //         {
    //             title: 'Users',
    //             path: '/overview/users',
    //             icon: <AiOutlineUser />
    //         },
    //         {
    //             title: 'Revenue',
    //             path: '/overview/revenue',
    //             icon: <AiOutlineMoneyCollect />
    //         }
    //     ]
    // },
    {
        title: 'Cuộc trò truyện mới',
        path: '/order',
        icon: <IoMdAdd />
    },
    // {
    //     title: 'History',
    //     path: '/history',
    //     icon: <AiOutlineHistory />
    // },
    // {
    //     title: 'Configurations',
    //     path: '/configurations',
    //     icon: <FaCog />
    // }
];
