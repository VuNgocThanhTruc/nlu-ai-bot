import styled from 'styled-components';

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    box-sizing: border-box;
    position: relative; /* Ensure relative positioning for absolute children */
`;

export const CloseButton = styled.button`
    background: white;
    color: black;
    border: none;
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 32px
`;

export const EditableTextArea = styled.textarea`
    width: 100%;
    height: calc(100% - 6rem);
    padding: 1rem;
    margin-top: 1rem;
    box-sizing: border-box;
`;

export const DownloadButton = styled.button`
    background: #4caf50;
    color: white;
    border: none;
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 4px 12px 0 0;
`;

export const NextButton = styled.button`
    background: #2196f3;
    color: white;
    border: none;
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 4px 12px 0 0;
`;
