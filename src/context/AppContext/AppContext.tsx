import React, {createContext, FC, useEffect, useState} from "react";
import axios from "axios";

interface IAppContext {
    selectedSectionId: number | null,
    root: ISection,
    weather: WeatherState,
    setSelectedSectionId: (e: any) => void,
    handleTypeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleFrameSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleVerticalSplit: () => void,
    handleHorizontalSplit: () => void,

}

export const AppContext = createContext<IAppContext>({
    weather: {
        weathercode: null,
        sunset: null,
        sunrise: null,
        time: null,
        actualTime: null
    },
    selectedSectionId: null,
    root: {
        nodeType: 'section',
        id: id(),
        width: 800,
        height: 1000,
        frameSize: 50,
        type: 'none',
        splitDirection: null,
        sections: [],
    },
    setSelectedSectionId: (e: any) => {},
    handleTypeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => {},
    handleFrameSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
    handleVerticalSplit: () => {},
    handleHorizontalSplit: () => {}
});


const DEVIDER_SIZE = 40;

function id() {
    return Math.round(Math.random() * 10000);
}

export function findNested(sec: any, id: any) {
    if (sec.id === id) {
        return sec;
    }
    if (!sec.sections) {
        return null;
    }
    for (let i = 0; i < sec.sections.length; i++) {
        let founded: any = findNested(sec.sections[i], id);
        if (founded) {
            return founded;
        }
    }
}

export interface ISection {
    nodeType: string;
    id: number;
    width: number;
    height: number;
    frameSize: number;
    type: string;
    splitDirection: string | null;
    sections: ISection[] | IDevider[];
}

export interface IDevider {
    nodeType: string;
    id: number;
    width: number;
    height: number;
    sections: ISection[];
}

interface AppProviderType {
    children: React.ReactNode
}

interface WeatherState {
    weathercode: string | null;
    sunset: string | null;
    sunrise: string | null;
    time: string | null;
    actualTime: string | null;
}

export const AppProvider:FC<AppProviderType> = ({ children }) => {
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
    const [root, setRoot] = useState<any>({
        nodeType: 'section',
        id: id(),
        width: 800,
        height: 1000,
        frameSize: 50,
        type: 'none',
        splitDirection: null,
        sections: [
            {
                nodeType: 'section',
                id: id(),
                width: 800 - 50 * 2,
                height: 1000 - 50 * 2,
                type: 'none',
                splitDirection: null,
                sections: [],
                frameSize: 0,
            },
        ],
    });

    const [weather, setWeather] = useState<WeatherState>({
        weathercode: null,
        sunset: null,
        sunrise: null,
        time: null,
        actualTime: null,
    });

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=59.94&longitude=30.31&current_weather=true&daily=sunrise,sunset&timezone=Europe/Moscow',
        };
        const fetchWeatherData = async () => {
            try {
                const response:any= await axios.request(options);
                const date = new Date().toISOString().slice(0, 10);
                // @ts-ignore
                const sunsetTimes = Object.assign(...response.data.daily.time.map((n: any, i: string | number) => ({ [n]: response.data.daily.sunset[i] })))
                // @ts-ignore
                const sunriseTimes = Object.assign(...response.data.daily.time.map((n: any, i: string | number) => ({ [n]: response.data.daily.sunrise[i] })))
                setWeather({
                    weathercode: response.data.current_weather.weathercode,
                    sunrise: sunriseTimes[date],
                    sunset: sunsetTimes[date],
                    time: response.data.current_weather.time,
                    actualTime: (new Date()).toLocaleTimeString(),
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSection = findNested(root, selectedSectionId);

        selectedSection.type = e.target.value;
        if (e.target.value === "none") {
            selectedSection.frameSize = 0;
        } else {
            selectedSection.frameSize = selectedSection.frameSize || 50;
        }
        setRoot({ ...root });
    };

    const handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedSection = findNested(root, selectedSectionId);
        selectedSection.frameSize = parseInt(e.target.value, 10);
        setRoot({ ...root });
    };

    const handleVerticalSplit = () => {
        const selectedSection = findNested(root, selectedSectionId);
        selectedSection.splitDirection = "vertical";
        selectedSection.sections.push(
            {
                nodeType: "section",
                id: id(),
                width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
                height: selectedSection.height,
                type: "none",
                splitDirection: null,
                sections: [],
                frameSize: 0,
            },
            {
                nodeType: "devider",
                id: id(),
                width: DEVIDER_SIZE,
                height: selectedSection.height,
                sections: [],
            },
            {
                nodeType: "section",
                id: id(),
                width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
                height: selectedSection.height,
                type: "none",
                splitDirection: null,
                sections: [],
                frameSize: 0,
            }
        );
        setSelectedSectionId(null);
        setRoot({ ...root });
    };

    const handleHorizontalSplit = () => {
        const selectedSection = findNested(root, selectedSectionId);
        selectedSection.splitDirection = "horizontal";
        selectedSection.sections.push(
            {
                nodeType: "section",
                id: id(),
                width: selectedSection.width,
                height: selectedSection.height / 2 - DEVIDER_SIZE / 2,
                type: "none",
                splitDirection: null,
                sections: [],
                frameSize: 0,
            },
            {
                nodeType: "devider",
                id: id(),
                width: selectedSection.width,
                height: DEVIDER_SIZE,
                sections: [],
            },
            {
                nodeType: "section",
                id: id(),
                width: selectedSection.width,
                height: selectedSection.height / 2 - DEVIDER_SIZE / 2,
                type: "none",
                splitDirection: null,
                sections: [],
                frameSize: 0,
            }
        );
        setSelectedSectionId(null);
        setRoot({...root});
    }

    const value = {
        selectedSectionId,
        root,
        weather,
        setSelectedSectionId,
        handleTypeSelect,
        handleFrameSizeChange,
        handleVerticalSplit,
        handleHorizontalSplit,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}