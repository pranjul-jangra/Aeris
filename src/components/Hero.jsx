import React from 'react'
import useThemeStyle from '../hooks/useThemeStyle';

export default function Hero({weatherData}) {
    const { darkCardBg, textColor, secondaryText, mutedText, headerBg, shadow, border, softBorder } = useThemeStyle();


    return (
        <div className={`min-h-[86vh] w-full rounded-3xl p-5 md:p-8`}>
            {/* Main Weather Card */}
            <div className={`mx-auto flex min-h-[86vh] max-w-6xl flex-col overflow-hidden rounded-3xl border ${border} ${darkCardBg} ${textColor} shadow-md ${shadow} transition-all`}>

                {/* Header */}
                <div className={`flex flex-col gap-4 border-b ${softBorder} px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10`}>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <h1 className="text-xl font-semibold tracking-tight">
                                {weatherData?.location?.name || "Unknown Location"}
                            </h1>
                        </div>

                        <p className={`mt-1 text-sm ${secondaryText}`}>
                            {weatherData?.location?.region
                                ? `${weatherData.location.region}, `
                                : ""}
                            {weatherData?.location?.country || ""}
                        </p>
                    </div>

                    <div className="text-left md:text-right">
                        <p className={`text-sm font-medium ${mutedText}`}>
                            {weatherData?.location?.localtime
                                ? new Date(weatherData.location.localtime).toLocaleDateString(
                                    "en-IN",
                                    {
                                        weekday: "long",
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )
                                : "--"}
                        </p>

                        <p className={`mt-1 text-xs ${secondaryText}`}>
                            Local time{" "}
                            {weatherData?.location?.localtime
                                ? new Date(weatherData.location.localtime).toLocaleTimeString(
                                    "en-IN",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )
                                : "--"}
                        </p>
                    </div>
                </div>

                {/* Main Weather Section */}
                <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-10">

                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

                        {/* Temperature */}
                        <div>
                            <p className={`text-sm font-medium uppercase tracking-[0.2em] ${mutedText}`}>
                                Current Weather
                            </p>

                            <div className="mt-3 flex items-center gap-5">
                                <img
                                    src={weatherData?.current?.condition?.icon}
                                    alt={weatherData?.current?.condition?.text || "Weather"}
                                    className="h-28 w-28 object-contain"
                                />

                                <div>
                                    <div className="flex items-start">
                                        <span className="text-7xl font-semibold tracking-tighter md:text-8xl">
                                            {weatherData?.current?.temp_c ?? "--"}
                                        </span>

                                        <span className={`mt-2 text-3xl font-medium ${secondaryText}`}>
                                            °C
                                        </span>
                                    </div>

                                    <p className={`mt-1 text-lg font-medium ${mutedText}`}>
                                        {weatherData?.current?.condition?.text || "--"}
                                    </p>

                                    <p className={`mt-1 text-sm ${mutedText}`}>
                                        Feels like{" "}
                                        <span className={`font-medium ${secondaryText}`}>
                                            {weatherData?.current?.feelslike_c ?? "--"}°C
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className={`rounded-2xl border ${softBorder} shadow-sm ${shadow} p-5`}>
                            <p className={`mb-4 text-sm font-semibold ${mutedText}`}>
                                Location Details
                            </p>

                            <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                                <div>
                                    <p className={`text-xs ${mutedText}`}>Latitude</p>
                                    <p className={`mt-1 text-sm font-medium ${secondaryText}`}>
                                        {weatherData?.location?.lat ?? "--"}°
                                    </p>
                                </div>

                                <div>
                                    <p className={`text-xs ${mutedText}`}>Longitude</p>
                                    <p className={`mt-1 text-sm font-medium ${secondaryText}`}>
                                        {weatherData?.location?.lon ?? "--"}°
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className={`text-xs ${mutedText}`}>Timezone</p>
                                    <p className={`mt-1 truncate text-sm ${secondaryText}`}>
                                        {weatherData?.location?.tz_id || "--"}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className={`text-xs ${mutedText}`}>Last Updated</p>
                                    <p className={`mt-1 text-sm font-medium ${secondaryText}`}>
                                        {weatherData?.current?.last_updated || "--"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weather Statistics */}
                    <div className="mt-10 mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                        <div className={`rounded-2xl border ${softBorder} p-4`}>
                            <p className={`text-xs ${secondaryText}`}>Humidity</p>
                            <p className={`mt-2 text-lg font-semibold ${mutedText}`}>
                                {weatherData?.current?.humidity ?? "--"}%
                            </p>
                        </div>

                        <div className={`rounded-2xl border ${softBorder} p-4`}>
                            <p className={`text-xs ${secondaryText}`}>Wind</p>
                            <p className={`mt-2 text-lg font-semibold ${mutedText}`}>
                                {weatherData?.current?.wind_kph ?? "--"}
                                <span className={`ml-1 text-xs font-normal ${secondaryText}`}>
                                    km/h
                                </span>
                            </p>
                        </div>

                        <div className={`rounded-2xl border ${softBorder} p-4`}>
                            <p className={`text-xs ${secondaryText}`}>Pressure</p>
                            <p className={`mt-2 text-lg font-semibold ${mutedText}`}>
                                {weatherData?.current?.pressure_mb ?? "--"}
                                <span className={`ml-1 text-xs font-normal ${secondaryText}`}>
                                    mb
                                </span>
                            </p>
                        </div>

                        <div className={`rounded-2xl border ${softBorder} p-4`}>
                            <p className={`text-xs ${secondaryText}`}>Visibility</p>
                            <p className={`mt-2 text-lg font-semibold ${mutedText}`}>
                                {weatherData?.current?.vis_km ?? "--"}
                                <span className={`ml-1 text-xs font-normal ${secondaryText}`}>
                                    km
                                </span>
                            </p>
                        </div>

                        <div className={`rounded-2xl border ${softBorder} p-4`}>
                            <p className={`text-xs ${secondaryText}`}>UV Index</p>
                            <p className={`mt-2 text-lg font-semibold ${mutedText}`}>
                                {weatherData?.current?.uv ?? "--"}
                            </p>
                        </div>

                        <div className={`rounded-2xl border ${softBorder} p-4`}>
                            <p className={`text-xs ${secondaryText}`}>Cloud Cover</p>
                            <p className={`mt-2 text-lg font-semibold ${mutedText}`}>
                                {weatherData?.current?.cloud ?? "--"}%
                            </p>
                        </div>
                    </div>

                    {/* Coordinates Footer */}
                    <div className={`mt-auto flex flex-col gap-3 border-t ${softBorder} pt-6 sm:flex-row sm:items-center sm:justify-between`}>
                        <div>
                            <p className={`text-xs uppercase tracking-wider ${mutedText}`}>
                                Coordinates
                            </p>

                            <p className={`mt-1 text-sm font-medium ${secondaryText}`}>
                                {weatherData?.location?.lat ?? "--"}°,{" "}
                                {weatherData?.location?.lon ?? "--"}°
                            </p>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className={`text-xs uppercase tracking-wider ${mutedText}`}>
                                Timezone
                            </p>

                            <p className={`mt-1 text-sm font-medium ${secondaryText}`}>
                                {weatherData?.location?.tz_id || "--"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
