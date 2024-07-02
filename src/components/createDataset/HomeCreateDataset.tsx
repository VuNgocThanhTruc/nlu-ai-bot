import React, { useState } from "react";
import styled from "styled-components";
import Screen1 from './step1/HomeStep1';
import Screen2 from './step2/HomeStep2';
// import Screen3 from './Screen3';
// import Screen4 from './Screen4';
// import Screen5 from './Screen5';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    text-align: center; /* Ensure text is centered */
`;

const HomeCreateDataset: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<string | null>(null);

    const renderScreen = () => {
        switch (currentScreen) {
            case 'screen1':
                return <Screen1 />;
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
                        <button onClick={() => setCurrentScreen('screen1')}>Button 1</button>
                        <button onClick={() => setCurrentScreen('screen2')}>Button 2</button>
                        <button onClick={() => setCurrentScreen('screen3')}>Button 3</button>
                        <button onClick={() => setCurrentScreen('screen4')}>Button 4</button>
                        <button onClick={() => setCurrentScreen('screen5')}>Button 5</button>
                    </Wrapper>
                );
        }
    };

    return renderScreen();
};

export default HomeCreateDataset;
