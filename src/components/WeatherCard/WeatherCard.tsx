import { useStore } from "../../pages/MobxPixelApp/hook";
import { observer } from "mobx-react-lite";
import WeatherDictionary from './WeatherDictionary';

const WeatherCard: React.FC = () => {
    const store = useStore("store");
    const { weathercode, sunrise, sunset, time, actualTime } =  store.weather;
    const sunriseTime = sunrise ? new Date(sunrise) : null;
    const sunsetTime = sunset ? new Date(sunset) : null;
    const weather = weathercode ? WeatherDictionary[weathercode] : null;
    const currentTime = time ? new Date(time) : null;


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
export default observer(WeatherCard);