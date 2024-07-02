// SubmenuStyles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarLink = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    padding: 2rem;
    text-decoration: none;
    color: black;
    border-radius: 10px;

    &.selected {
        background-color: rgba(31, 31, 27, 0.06);
        border-bottom: 4px solid #44903E;
    }

    &:hover {
        background-color: rgba(31, 31, 27, 0.06);
        border-bottom: 4px solid #44903E;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 0.875rem;
        padding: 1rem;
    }
`;

export const SidebarLabel = styled.span`
    margin-left: 1rem;

    @media (max-width: 768px) {
        margin-left: 0.75rem;
    }

    @media (max-width: 480px) {
        margin-left: 0.5rem;
    }
`;

export const DropdownLink = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 3.75rem;
    font-size: 1.125rem;
    padding-left: 3rem;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #6d44dc;
    }

    @media (max-width: 768px) {
        height: 3rem;
        font-size: 1rem;
        padding-left: 2.5rem;
    }

    @media (max-width: 480px) {
        height: 2.5rem;
        font-size: 0.875rem;
        padding-left: 2rem;
    }
`;
