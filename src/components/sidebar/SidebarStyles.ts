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

    @media (max-width: 768px) {
        width: 4rem;
    }

    @media (max-width: 480px) {
        width: 3rem;
    }
`;

export const LogoContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-image: url('../../logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: 768px) {
        height: 4rem;
    }

    @media (max-width: 480px) {
        height: 3rem;
    }
`;

export const SidebarNav = styled.div<{ sidebar: boolean }>`
    width: auto;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    transform: ${({ sidebar }) => (sidebar ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    z-index: 1;
    border-left: 2px solid #2d313a;

    @media (max-width: 768px) {
        left: 4rem;
    }

    @media (max-width: 480px) {
        left: 3rem;
    }
`;

export const NavIcon = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 2rem;
    margin-top: 2rem;
    color: inherit; // Ensure color is inherited from IconContext

    @media (max-width: 768px) {
        height: 4rem;
        font-size: 1.75rem;
    }

    @media (max-width: 480px) {
        height: 3rem;
        font-size: 1.5rem;
    }
`;

export const Logo = styled.img`
    width: 80%; /* Adjust width as needed */
    margin-top: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
`;

export const SidebarWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 768px) {
        padding: 0 1rem;
    }

    @media (max-width: 480px) {
        padding: 0 0.5rem;
    }
`;
