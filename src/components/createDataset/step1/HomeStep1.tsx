import React, { useState } from 'react';
import { CloseButton, DownloadButton, EditableTextArea, ModalContent, ModalWrapper, NextButton } from './HomeStep1Style';
import { useNavigate } from 'react-router-dom';

interface EditableTextModalProps {
    text: string;
    onClose: () => void;
}

const HomeStep1: React.FC<EditableTextModalProps> = ({ text, onClose }) => {
    const [editableText, setEditableText] = useState(text);
    const navigation = useNavigate()

    const downloadTextAsFile = () => {
        const element = document.createElement('a');
        const file = new Blob([editableText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'data.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleNext = () => {
        onClose();
        navigation("/datasets/screen2")
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <h2>Chỉnh sửa văn bản</h2>
                <EditableTextArea value={editableText} onChange={(e) => setEditableText(e.target.value)} />
                <DownloadButton onClick={downloadTextAsFile}>Download .txt</DownloadButton>
                <NextButton onClick={handleNext}>Next</NextButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default HomeStep1;
