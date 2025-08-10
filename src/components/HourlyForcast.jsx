import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { TbArrowBack, TbTemperatureCelsius, TbWind, TbDroplet, TbSun, TbGauge, TbMoon, } from "react-icons/tb";
import ToggleSwitch from './ToggleSwitch';
import Footer from './Footer';
import useThemeStyle from '../hooks/useThemeStyle';


export default function HourlyForecast({ theme, toggleTheme }) {
  const { bgColor, darkCardBg, border } = useThemeStyle();

  const navigate = useNavigate();
  const [selectedHour, setSelectedHour] = useState(null);
  const hourlyData = useSelector((state) => state.weather.hourlyData);

  const getWeatherIcon = (condition, isDay) => {
    const iconMap = {
      'Sunny': isDay ? '☀️' : '🌙',
      'Partly cloudy': isDay ? '⛅' : '☁️',
      'Cloudy': '☁️',
      'Light rain': '🌧️',
      'Rain': '🌧️'
    };
    return iconMap[condition] || '☁️';
  };

  const getTimeDisplay = (timeString) => {
    const hour = new Date(timeString).getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${ampm}`;
  };


  return (
    <main className={`${bgColor} min-h-dvh transition-all duration-150`}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex items-center justify-between py-4 px-2">

          <button type='button' onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-800 text-white cursor-pointer" aria-label='Back'>
            <TbArrowBack className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">24-Hour Forecast</h1>

          <ToggleSwitch toggleTheme={toggleTheme} theme={theme} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {hourlyData.map((hour, i) => (
            <div
              key={i}
              className={`${darkCardBg} rounded-xl p-4 shadow-lg border ${border} hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getWeatherIcon(hour.condition.text, hour.is_day)}</span>
                  <div>
                    <p className="font-semibold text-lg">{getTimeDisplay(hour.time)}</p>
                    <p className="text-sm opacity-75">{hour.condition.text}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold flex items-center">
                    {hour.temp_c}
                    <TbTemperatureCelsius className="w-6 h-6" />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TbWind className="w-4 h-4 text-blue-500" />
                  <span>{hour.wind_kph} km/h</span>
                </div>
                <div className="flex items-center gap-1">
                  <TbDroplet className="w-4 h-4 text-blue-500" />
                  <span>{hour.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <TbSun className="w-4 h-4 text-yellow-500" />
                  <span>UV {hour.uv}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className={`${darkCardBg} rounded-xl shadow-xl border ${border} overflow-hidden transition-colors duration-150`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-800 to-cyan-800 via-cyan-700 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-center font-semibold">Condition</th>
                    <th className="px-6 py-4 text-center font-semibold">Temperature</th>
                    <th className="px-6 py-4 text-center font-semibold">Wind</th>
                    <th className="px-6 py-4 text-center font-semibold">Humidity</th>
                    <th className="px-6 py-4 text-center font-semibold">UV Index</th>
                    <th className="px-6 py-4 text-center font-semibold">Pressure</th>
                  </tr>
                </thead>
                <tbody>
                  {hourlyData.map((hour, i) => (
                    <tr key={i} className={`border-b border-gray-200/20 hover:bg-white/5 transition-colors cursor-pointer ${selectedHour === i ? 'bg-blue-500/20' : '' }`}
                      onClick={() => setSelectedHour(selectedHour === i ? null : i)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">{getTimeDisplay(hour.time)}</div>
                        <div className="text-sm opacity-60">Hour {i + 1}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl">{getWeatherIcon(hour.condition.text, hour.is_day)}</span>
                          <span className="hidden xl:inline">{hour.condition.text}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg font-semibold">{hour.temp_c} <TbTemperatureCelsius className="w-5 h-5" /></div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1"><TbWind className="w-5 h-5 text-blue-500" /> {hour.wind_kph} km/h</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1"><TbDroplet className="w-5 h-5 text-blue-500" /> {hour.humidity}%</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1"><TbSun className="w-5 h-5 text-yellow-500" /> {hour.uv}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1"><TbGauge className="w-5 h-5 text-green-500" /> {hour.pressure_in}"</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Hour Details (Desktop) */}
        {selectedHour !== null && (
          <div className={`${darkCardBg} rounded-xl p-6 mt-6 shadow-xl border ${border} hidden lg:block transition-colors duration-150`}>
            <h3 className="text-xl font-bold mb-4">
              Detailed forecast for {getTimeDisplay(hourlyData[selectedHour].time)}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <div className="text-3xl mb-2">{getWeatherIcon(hourlyData[selectedHour].condition.text, hourlyData[selectedHour].is_day)}</div>
                <p className="font-semibold">{hourlyData[selectedHour].condition.text}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
                <div className="text-2xl font-bold mb-2 flex items-center justify-center">
                  {hourlyData[selectedHour].temp_c}
                  <TbTemperatureCelsius className="w-6 h-6" />
                </div>
                <p className="font-semibold">Temperature</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/20">
                <div className="text-2xl font-bold mb-2">{hourlyData[selectedHour].wind_kph} km/h</div>
                <p className="font-semibold">Wind Speed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <div className="text-2xl font-bold mb-2">UV {hourlyData[selectedHour].uv}</div>
                <p className="font-semibold">UV Index</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}