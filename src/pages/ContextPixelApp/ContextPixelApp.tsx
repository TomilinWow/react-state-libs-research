import React from "react";
import {AppProvider} from "../../context/AppContext/AppContext";
import WeatherCard from "../../components/ContextPixel/WeatherCard";
import SectionEdit from "../../components/ContextPixel/SectionEdit";
import RootFrame from "../../components/ContextPixel/RootFrame";

const ContextPixelApp = () => {
    return (
        <div className='window-container'>
            <AppProvider>
                <h1>Window ContextAPI</h1>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <WeatherCard />
                    <SectionEdit />
                    <RootFrame />
                </div>
            </AppProvider>
        </div>
    );
};

export default ContextPixelApp;