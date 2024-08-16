import React, { useState } from "react";
import styled from "styled-components";
import Screen2 from './step2/HomeStep2';
import axios from "axios";
import HomeStep1 from "./step1/HomeStep1";
// import Screen3 from './Screen3';
// import Screen4 from './Screen4';
// import Screen5 from './Screen5';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    text-align: center; 
`;

const HomeCreateDataset: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [modalText, setModalText] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post(`${process.env.REACT_APP_URL_SERVER}/datasets/upload`, formData)
                .then(response => {
                    if (response.status === 200) {
                        setModalText(response.data.text); 
                    }
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        } else {
            console.warn('No file selected');
        }
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'screen2':
                return <Screen2 />;
            // case 'screen3':
            //     return <Screen3 />;
            // case 'screen4':
            //     return <Screen4 />;
            // case 'screen5':
            //     return <Screen5 />;
            default:
                return (
                    <Wrapper>
                        <h2>Create Dataset</h2>
                        <input type="file" accept=".pdf" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload file</button>
                        {/* <button onClick={() => setCurrentScreen('screen1')}>Upload file</button> */}
                        <button onClick={() => setCurrentScreen('screen2')}>Button 2</button>
                        <button onClick={() => setCurrentScreen('screen3')}>Button 3</button>
                        <button onClick={() => setCurrentScreen('screen4')}>Button 4</button>
                        <button onClick={() => setCurrentScreen('screen5')}>Button 5</button>
                    </Wrapper>
                );
        }
    };

    return (
        <>
            {renderScreen()}
            {modalText && <HomeStep1 text={modalText} onClose={() => setModalText(null)} />}
        </>
    );
};

export default HomeCreateDataset;
