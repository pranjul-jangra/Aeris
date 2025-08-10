import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { WiWindDeg } from "react-icons/wi";
import { useSelector } from 'react-redux';
import { getFullWindDirection } from '../utils/windDirection';
import Time from './Time';
import WeatherDashboard from './Dashboard.jsx';
import useThemeStyle from "../hooks/useThemeStyle.jsx";

export default function TodaysForecast() {
    const { shadow } = useThemeStyle();

    const weatherData = useSelector((state) => state.weather.weatherData);


    return (
        <>
            <WeatherDashboard />

            <section className='flex gap-6 *:shrink-0 mt-3 flex-wrap whitespace-nowrap *:bg-cyan-800/90 *:text-white *:flex *:gap-2 *:items-center *:rounded-lg *:py-2 *:px-3 *:shadow-lg *:hover:shadow-md *:transition-all *:duration-150'>
                {/* Temperature */}
                <div className={`*:flex *:items-center *:gap-2 ${shadow}`}>
                    <img src="/temp.png" className='w-10 aspect-square' alt="" />
                    <p className='border-r-[1px] border-r-cyan-800 pr-2'>{weatherData?.current?.temp_c} <TbTemperatureCelsius /></p>
                    <p>{weatherData?.current?.temp_f} <TbTemperatureFahrenheit /></p>
                </div>

                {/* Day time ? */}
                <div className={`${shadow}`}>
                    <img src={weatherData?.current?.is_day ? '/sun.png' : '/moon.png'} className='w-10 aspect-square' alt="" />
                    <p className='ml-2'>{weatherData?.current?.is_day === 1 ? 'Day' : 'Night'}</p>
                </div>

                {/* Pressure */}
                <div className={`${shadow}`}>
                    <img src="/pressure.png" className='w-10 aspect-square' alt="" />
                    <p className='border-r-[1px] border-r-cyan-800 pr-2'>{weatherData?.current?.pressure_mb} pressure/mb</p>
                    <p>{weatherData?.current?.pressure_in} pressure/in</p>
                </div>

                {/* Precise (rain) */}
                <div className={`${shadow}`}>
                    <img src="/rain.png" className='w-10 aspect-square' alt="" />
                    <p className='border-r-[1px] border-r-cyan-800 pr-2'>{weatherData?.current?.precip_mm} rain/mm</p>
                    <p>{weatherData?.current?.precip_in} rain/in</p>
                </div>

                {/* Humidity */}
                <div className={`${shadow}`}>
                    <img src="/humidity.png" className='w-10 aspect-square' alt="" />
                    <p>Max humidity: {weatherData?.current?.humidity}</p>
                </div>

                {/* Cloud */}
                <div className={`${shadow}`}>
                    <img src="/cloud.png" className='w-10 aspect-square' alt="" />
                    <p>{weatherData?.current?.cloud ? 'Cloudy' : 'Clear Sky'}</p>
                </div>

                {/* Visibility */}
                <div className={`${shadow}`}>
                    <img src="/vision.png" className='w-10 aspect-square' alt="" />
                    <p className='border-r-[1px] border-r-cyan-800 pr-2'>Visibility: {weatherData?.current?.vis_km}/km</p>
                    <p>Visibility: {weatherData?.current?.vis_miles}/miles</p>
                </div>
            </section>

            <section className="flex gap-6 mt-6 flex-wrap *:bg-cyan-800/90 *:text-white *:flex *:gap-2 *:items-center *:rounded-lg *:py-2 *:px-3 *:shadow-lg *:hover:shadow-md *:transition-all *:duration-150 *:whitespace-nowrap">
                <p className={`${shadow}`}>🌡️ Feels Like: <strong>{weatherData?.current?.feelslike_c} °C</strong></p>
                <p className={`${shadow}`}>🔥 Heat Index: <strong>{weatherData?.current?.heatindex_c} °C</strong></p>
                <p className={`${shadow}`}>💨❄️ Wind Chill: <strong>{weatherData?.current?.windchill_c} °C</strong></p>
                <p className={`${shadow}`}>💧 Dew Point: <strong>{weatherData?.current?.dewpoint_c} °C</strong></p>
                <p className={`${shadow}`}>☀️ UV Index: <strong>{weatherData?.current?.uv}</strong></p>
                <p className={`${shadow}`}>💨⚠️ Wind Gusts: <strong>{weatherData?.current?.gust_kph} km/h</strong></p>
            </section>

            <section className="flex gap-6 mt-6 flex-wrap *:bg-cyan-800/90 *:text-white *:flex *:gap-2 *:items-center *:rounded-lg *:py-2 *:px-3 *:shadow-lg *:hover:shadow-md *:transition-all *:duration-150">
                {/* Wind */}
                <div className={`${shadow}`}>
                    <img src="/wind.png" className='w-10 aspect-square mr-1' alt="" />
                    <p className="border-r-[1px] border-r-cyan-800 pr-2 pb-1">{weatherData?.current?.wind_kph} km/h</p>
                    <p className="border-r-[1px] border-r-cyan-800 pr-2 pb-1">{weatherData?.current?.wind_mph} miles/h</p>
                    <p className="pb-1 flex items-center gap-3">{weatherData?.current?.wind_degree} deg - {getFullWindDirection(weatherData?.current?.wind_dir)} <WiWindDeg className='text-2xl' /></p>
                </div>

                {/* Time */}
                <Time />
            </section>
        </>
    )
}
