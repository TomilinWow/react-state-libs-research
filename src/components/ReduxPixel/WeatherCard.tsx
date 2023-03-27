import { useSelector, useDispatch } from 'react-redux';
import WeatherDictionary from "../../components/WeatherCard/WeatherDictionary";
import {RootState} from "../../store/window/store";
import {fetchWeather} from "../../store/window/slices/weatherSlice/weatherSlice";
import {useEffect} from "react";

const WeatherCard: React.FC = () => {
    const dispatch = useDispatch();
    const { weathercode, sunrise, sunset, time, actualTime } = useSelector((state: RootState) => state.weather);
    const sunriseTime = sunrise ? new Date(sunrise) : null;
    const sunsetTime = sunset ? new Date(sunset) : null;
    const weather = weathercode ? WeatherDictionary[weathercode] : null;
    const currentTime = time ? new Date(time) : null;

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchWeather());
        // @ts-ignore
        const interval = setInterval(() => dispatch(fetchWeather()), 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (<div style={{ margin: 10 }}>
        <h3>Погода за окном</h3>
        <div><span><strong>Место:</strong> Санкт-Петербург</span></div> 
        {sunriseTime ? <div><span><strong>Восход солнца:</strong> {sunriseTime.toLocaleTimeString()}</span> </div>: null}
        {sunsetTime ? <div><span><strong>Заход солнца:</strong> {sunsetTime.toLocaleTimeString()}</span></div>: null}
        {weather ? <div><span><strong>Погода:</strong> {weather}</span></div> : null}
        {currentTime ? <div><span><strong>Время прогноза:</strong> {currentTime.toLocaleTimeString()}</span></div> : null}
        {currentTime ? <div><span><strong>Актуальное время:</strong> {actualTime}</span></div> : null}
    </div>)
}
export default WeatherCard;