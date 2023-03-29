import {useContext} from "react";
import {AppContext} from "../../context/AppContext/AppContext";
import WeatherDictionary from "../../components/WeatherCard/WeatherDictionary";


const WeatherCard: React.FC = () => {
    const {weather} = useContext(AppContext)
    const weathercode = weather['weathercode'] ? WeatherDictionary[weather['weathercode']] : null;
    const sunriseTime = weather['sunrise'] ? new Date(weather['sunrise']) : null;
    const sunsetTime = weather['sunset'] ? new Date(weather['sunset']) : null;
    const currentTime = weather['time'] ? new Date(weather['time']) : null;

    return (<div style={{ margin: 10 }}>
        <h3>Погода за окном</h3>
        <div><span><strong>Место:</strong> Санкт-Петербург</span></div>
        {sunriseTime ? <div><span><strong>Восход солнца:</strong> {sunriseTime.toLocaleTimeString()}</span> </div>: null}
        {sunsetTime ? <div><span><strong>Заход солнца:</strong> {sunsetTime.toLocaleTimeString()}</span></div>: null}
        {weathercode ? <div><span><strong>Погода:</strong> {weathercode}</span></div> : null}
        {currentTime ? <div><span><strong>Время прогноза:</strong> {currentTime.toLocaleTimeString()}</span></div> : null}
        {currentTime ? <div><span><strong>Актуальное время:</strong> {weather['actualTime']}</span></div> : null}
    </div>)
}
export default WeatherCard;