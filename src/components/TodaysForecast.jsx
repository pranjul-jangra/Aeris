import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { WiWindDeg } from "react-icons/wi";
import { useSelector } from 'react-redux';
import { getFullWindDirection } from '../utils/windDirection';
import Time from './Time';
import WeatherDashboard from './Dashboard.jsx';
import useThemeStyle from "../hooks/useThemeStyle.jsx";

export default function TodaysForecast() {
    const { shadow, darkCardBg, iconBg, border, hoverBorder, mutedText, textColor, cardBg, secondaryText } = useThemeStyle();

    const weatherData = useSelector((state) => state.weather.weatherData);


    return (
        <>
            <WeatherDashboard />

            {/* Weather Metrics */}
            <section className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                {/* Day / Night */}
                <div
                    className={`
            ${darkCardBg} ${border} ${hoverBorder} ${shadow}
            flex min-h-[120px] flex-col justify-between
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={`
                    ${mutedText}
                    text-xs font-medium uppercase tracking-wider
                `}
                        >
                            Time
                        </span>

                        <img
                            src={
                                weatherData?.current?.is_day
                                    ? "/sun.png"
                                    : "/moon.png"
                            }
                            className="h-8 w-8 object-contain"
                            alt=""
                        />
                    </div>

                    <div>
                        <p className={`${textColor} text-lg font-semibold`}>
                            {weatherData?.current?.is_day === 1
                                ? "Day"
                                : "Night"}
                        </p>

                        <p className={`${mutedText} mt-0.5 text-xs`}>
                            Current period
                        </p>
                    </div>
                </div>


                {/* Pressure */}
                <div
                    className={`
            ${darkCardBg} ${border} ${hoverBorder} ${shadow}
            flex min-h-[120px] flex-col justify-between
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={`
                    ${mutedText}
                    text-xs font-medium uppercase tracking-wider
                `}
                        >
                            Pressure
                        </span>

                        <img
                            src="/pressure.png"
                            className="h-8 w-8 object-contain"
                            alt=""
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <p className={`${textColor} text-lg font-semibold`}>
                                {weatherData?.current?.pressure_mb ?? "--"}
                            </p>

                            <span className={`${mutedText} text-xs`}>
                                mb
                            </span>
                        </div>

                        <p className={`${mutedText} mt-0.5 text-xs`}>
                            {weatherData?.current?.pressure_in ?? "--"} inHg
                        </p>
                    </div>
                </div>


                {/* Precipitation */}
                <div
                    className={`
            ${darkCardBg} ${border} ${hoverBorder} ${shadow}
            flex min-h-[120px] flex-col justify-between
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={`
                    ${mutedText}
                    text-xs font-medium uppercase tracking-wider
                `}
                        >
                            Precipitation
                        </span>

                        <img
                            src="/rain.png"
                            className="h-8 w-8 object-contain"
                            alt=""
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <p className={`${textColor} text-lg font-semibold`}>
                                {weatherData?.current?.precip_mm ?? "--"}
                            </p>

                            <span className={`${mutedText} text-xs`}>
                                mm
                            </span>
                        </div>

                        <p className={`${mutedText} mt-0.5 text-xs`}>
                            {weatherData?.current?.precip_in ?? "--"} in
                        </p>
                    </div>
                </div>


                {/* Humidity */}
                <div
                    className={`
            ${darkCardBg} ${border} ${hoverBorder} ${shadow}
            flex min-h-[120px] flex-col justify-between
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={`
                    ${mutedText}
                    text-xs font-medium uppercase tracking-wider
                `}
                        >
                            Humidity
                        </span>

                        <img
                            src="/humidity.png"
                            className="h-8 w-8 object-contain"
                            alt=""
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-1">
                            <p className={`${textColor} text-2xl font-semibold`}>
                                {weatherData?.current?.humidity ?? "--"}
                            </p>

                            <span className={`${mutedText} text-sm`}>
                                %
                            </span>
                        </div>

                        <p className={`${mutedText} mt-0.5 text-xs`}>
                            Relative humidity
                        </p>
                    </div>
                </div>


                {/* Cloud Cover */}
                <div
                    className={`
            ${darkCardBg} ${border} ${hoverBorder} ${shadow}
            flex min-h-[120px] flex-col justify-between
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={`
                    ${mutedText}
                    text-xs font-medium uppercase tracking-wider
                `}
                        >
                            Cloud Cover
                        </span>

                        <img
                            src="/cloud.png"
                            className="h-8 w-8 object-contain"
                            alt=""
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-1">
                            <p className={`${textColor} text-2xl font-semibold`}>
                                {weatherData?.current?.cloud ?? "--"}
                            </p>

                            <span className={`${mutedText} text-sm`}>
                                %
                            </span>
                        </div>

                        <p className={`${mutedText} mt-0.5 text-xs`}>
                            {weatherData?.current?.cloud > 50
                                ? "Mostly cloudy"
                                : "Mostly clear"}
                        </p>
                    </div>
                </div>


                {/* Visibility */}
                <div
                    className={`
            ${darkCardBg} ${border} ${hoverBorder} ${shadow}
            flex min-h-[120px] flex-col justify-between
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={`
                    ${mutedText}
                    text-xs font-medium uppercase tracking-wider
                `}
                        >
                            Visibility
                        </span>

                        <img
                            src="/vision.png"
                            className="h-8 w-8 object-contain"
                            alt=""
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <p className={`${textColor} text-lg font-semibold`}>
                                {weatherData?.current?.vis_km ?? "--"}
                            </p>

                            <span className={`${mutedText} text-xs`}>
                                km
                            </span>
                        </div>

                        <p className={`${mutedText} mt-0.5 text-xs`}>
                            {weatherData?.current?.vis_miles ?? "--"} miles
                        </p>
                    </div>
                </div>
            </section>


            {/* Additional Weather Conditions */}
            <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                {/* Feels Like */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <p className={`${mutedText} text-xs uppercase tracking-wider`}>
                        Feels Like
                    </p>

                    <p className={`${textColor} mt-2 text-xl font-semibold`}>
                        {weatherData?.current?.feelslike_c ?? "--"}
                        <span className={`${secondaryText} ml-1 text-sm font-normal`}>
                            °C
                        </span>
                    </p>
                </div>


                {/* Heat Index */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <p className={`${mutedText} text-xs uppercase tracking-wider`}>
                        Heat Index
                    </p>

                    <p className={`${textColor} mt-2 text-xl font-semibold`}>
                        {weatherData?.current?.heatindex_c ?? "--"}
                        <span className={`${secondaryText} ml-1 text-sm font-normal`}>
                            °C
                        </span>
                    </p>
                </div>


                {/* Wind Chill */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <p className={`${mutedText} text-xs uppercase tracking-wider`}>
                        Wind Chill
                    </p>

                    <p className={`${textColor} mt-2 text-xl font-semibold`}>
                        {weatherData?.current?.windchill_c ?? "--"}
                        <span className={`${secondaryText} ml-1 text-sm font-normal`}>
                            °C
                        </span>
                    </p>
                </div>


                {/* Dew Point */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <p className={`${mutedText} text-xs uppercase tracking-wider`}>
                        Dew Point
                    </p>

                    <p className={`${textColor} mt-2 text-xl font-semibold`}>
                        {weatherData?.current?.dewpoint_c ?? "--"}
                        <span className={`${secondaryText} ml-1 text-sm font-normal`}>
                            °C
                        </span>
                    </p>
                </div>


                {/* UV Index */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <p className={`${mutedText} text-xs uppercase tracking-wider`}>
                        UV Index
                    </p>

                    <p className={`${textColor} mt-2 text-xl font-semibold`}>
                        {weatherData?.current?.uv ?? "--"}
                    </p>
                </div>


                {/* Wind Gust */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            rounded-2xl border p-4
            transition-all duration-200
        `}
                >
                    <p className={`${mutedText} text-xs uppercase tracking-wider`}>
                        Wind Gust
                    </p>

                    <p className={`${textColor} mt-2 text-xl font-semibold`}>
                        {weatherData?.current?.gust_kph ?? "--"}
                        <span className={`${secondaryText} ml-1 text-sm font-normal`}>
                            km/h
                        </span>
                    </p>
                </div>
            </section>


            {/* Wind & Time */}
            <section className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">

                {/* Wind */}
                <div
                    className={`
            ${cardBg} ${border} ${hoverBorder} ${shadow}
            flex flex-col justify-between
            rounded-2xl border p-5
            transition-all duration-200
        `}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`${mutedText} text-xs font-medium uppercase tracking-wider`}>
                                Wind
                            </p>

                            <p className={`${secondaryText} mt-1 text-sm`}>
                                Current wind conditions
                            </p>
                        </div>

                        <div
                            className={`
                    ${iconBg}
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                `}
                        >
                            <img
                                src="/wind.png"
                                className="h-7 w-7 object-contain"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">

                        {/* Wind Speed */}
                        <div>
                            <p className={`${mutedText} text-xs`}>
                                Speed
                            </p>

                            <p className={`${textColor} mt-1 text-2xl font-semibold`}>
                                {weatherData?.current?.wind_kph ?? "--"}
                                <span className={`${secondaryText} ml-1 text-sm font-normal`}>
                                    km/h
                                </span>
                            </p>
                        </div>


                        {/* Wind MPH */}
                        <div>
                            <p className={`${mutedText} text-xs`}>
                                Miles / hour
                            </p>

                            <p className={`${secondaryText} mt-1 text-lg font-medium`}>
                                {weatherData?.current?.wind_mph ?? "--"} mph
                            </p>
                        </div>


                        {/* Wind Direction */}
                        <div>
                            <p className={`${mutedText} text-xs`}>
                                Direction
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <p className={`${textColor} text-lg font-medium`}>
                                    {weatherData?.current?.wind_degree ?? "--"}°
                                </p>

                                <p className={`${secondaryText} text-sm`}>
                                    {getFullWindDirection(
                                        weatherData?.current?.wind_dir
                                    )}
                                </p>

                                <WiWindDeg
                                    className={`${secondaryText} text-xl`}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Time */}
                <div
                    className={`
            ${cardBg} ${border} ${shadow}
            rounded-2xl border p-5
        `}
                >
                    <Time />
                </div>
            </section>
        </>
    )
}
