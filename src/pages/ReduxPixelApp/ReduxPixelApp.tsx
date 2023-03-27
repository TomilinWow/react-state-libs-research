import React from 'react';
import SectionEdit from "../../components/ReduxPixel/SectionEdit";
import {Provider} from "react-redux";
import {store} from "../../store/window/store";
import WeatherCard from "../../components/ReduxPixel/WeatherCard";
import RootFrame from "../../components/ReduxPixel/RootFrame";

const ReduxPixelApp = () => {
    return (
        <Provider store={store}>
            <h1>Window Redux</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <WeatherCard />
                <SectionEdit />
                <RootFrame />
            </div>
        </Provider>
    );
};

export default ReduxPixelApp;