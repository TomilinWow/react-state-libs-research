import SectionEdit from '../../components/SectionEditMobX/SectionEdit';
import React, { useEffect } from 'react';
import { StoresProvider, stores } from "./store";
import RootFrame from '../../components/RootFrameMobX/RootFrame';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { observer } from 'mobx-react-lite';

const MobxPixelApp = () => {
    return (
        <div className='window-container'>
            <StoresProvider value={stores}>
                <h1>Window MobX</h1>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <WeatherCard />
                    <SectionEdit />
                    <RootFrame />
                </div>
            </StoresProvider>
        </div>
    );
};

export default observer(MobxPixelApp);