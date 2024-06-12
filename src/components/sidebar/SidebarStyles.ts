// SidebarStyles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    position: relative;
`;

export const Nav = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 5rem;
    background-color: white;
    height: 100vh;
    flex-direction: column;
    z-index: 2;
`;

export const LogoContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-image: url('../../logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

export const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: auto;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    transform: ${({ sidebar }) => (sidebar ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 5rem;
    z-index: 1;
    border-left: 2px solid #2d313a;
`;

export const NavIcon = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 2rem;
    margin-top: 2rem;
    color: inherit; // Ensure color is inherited from IconContext
`;

export const Logo = styled.img`
    width: 80%; /* Adjust width as needed */
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const SidebarWrap = styled.div`
    display: flex;
    flex-direction: column;
`;
