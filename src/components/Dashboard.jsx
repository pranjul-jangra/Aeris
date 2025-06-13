import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, Wind, Thermometer, Droplets, Sun, Snowflake, Eye, CloudRain, Shirt, Activity, Calendar, Haze, Cloud, LucideActivity } from 'lucide-react';
import { generateActivitySuggestions, generateClothingRecommendations, generateWeatherAlerts, getAQIColor, getAQILevel, getAQITextColor } from '../utils/AlertLogics.js';

const WeatherDashboard = ({ theme }) => {
  const [activeChart, setActiveChart] = useState('temperature');
  const weatherData = useSelector((state) => state.weather.weatherData);

  // Warnings and recommendation
  const alerts = generateWeatherAlerts({ current: weatherData?.current, forecast: weatherData?.forecast });
  const clothingRec = generateClothingRecommendations(weatherData?.current);
  const activityRecs = generateActivitySuggestions(weatherData?.current);

  // Theme styling
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-black/30';
  const headerBg = theme === 'light' ? 'bg-white' : 'bg-zinc-800';

  // Helping handlers
  const lucideIcons = (name) => {
    if (name === 'Sun') { return <Sun size={20} className="mt-1 text-gray-600" /> }
    else if (name === 'Thermometer') { return <Thermometer size={20} className="mt-1 text-gray-600" /> }
    else if (name === 'Snowflake') { return <Snowflake size={20} className="mt-1 text-gray-600" /> }
    else if (name === 'Wind') { return <Wind size={20} className="mt-1 text-gray-600" /> }
    else if (name === 'Eye') { return <Eye size={20} className="mt-1 text-gray-600" /> }
    else if (name === 'CloudRain') { return <CloudRain size={20} className="mt-1 text-gray-600" /> }
    else if (name === 'Haze') { return <Haze size={20} className="mt-1 text-gray-600" /> }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'extreme': return 'border-purple-700 bg-purple-100';
      case 'very_high': return 'border-red-700 bg-red-100';
      case 'high': return 'border-red-500 bg-red-50';
      case 'moderate': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };



  return (
    <div className="min-h-screen mb-12">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Weather Alerts */}
        <div className={`${bgColor} transition-colors duration-150 rounded-2xl shadow-lg p-6`}>

          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-xl font-bold">Weather Alerts</h2>
          </div>

          <div className="space-y-3 max-h-64 overflow-auto">
            {alerts?.length > 0 && alerts.map((alert, i) => {
              return (
                <div key={`alert-${i}`} className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start gap-3">
                    {lucideIcons(alert.icon)}
                    <div>
                      <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Air Quality Index */}
          <div className={`${bgColor} transition-colors duration-150 rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Wind className="text-blue-500" size={24} />
              <h2 className="text-xl font-bold">Air Quality Index</h2>
            </div>

            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{weatherData?.current?.air_quality?.['us-epa-index']}</div>
                    <div className={`text-sm font-medium ${getAQITextColor(weatherData?.current?.air_quality?.['us-epa-index'])}`}>
                      {getAQILevel(weatherData?.current?.air_quality?.['us-epa-index'])}
                    </div>
                  </div>
                </div>
                <div className={`absolute top-0 left-0 w-36 h-36 rounded-full ${getAQIColor(weatherData?.current?.air_quality?.['us-epa-index'])} opacity-20`}></div>
              </div>
            </div>

            {/* Gases & PMs */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium" title='Particulate Matter 2.5 (Tiny particles ≤ 2.5)'>PM2.5</div>
                <div className="text-lg font-bold">{weatherData?.current?.air_quality?.pm2_5}</div>
              </div>
              <div className="text-center">
                <div className="font-medium" title='Particulate Matter 10 (Larger particles ≤ 10)'>PM10</div>
                <div className="text-lg font-bold">{weatherData?.current?.air_quality?.pm10}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">O₃</div>
                <div className="text-lg font-bold">{weatherData?.current?.air_quality?.o3}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">SO₃</div>
                <div className="text-lg font-bold">{weatherData?.current?.air_quality?.so2}</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className={`${bgColor} transition-colors max-h-80 relative overflow-scroll duration-150 rounded-2xl shadow-lg pb-6`}>
            <div className={`${headerBg} flex items-center gap-2 mb-4 px-6 pt-6 sticky top-0 transition-colors duration-150`}>
              <Calendar className="text-green-500" size={24} />
              <h2 className="text-xl font-bold ">Recommendations</h2>
            </div>

            <div className="mb-6 *:mb-4 mx-6 text-black">
              {
                (clothingRec?.tempRec?.length === 0 && clothingRec?.weatherRec?.length === 0 && activityRecs?.length === 0) && <div className='text-gray-500'>No suggestions</div>
              }
              {/* Recomendations based on temperature */}
              {clothingRec?.tempRec?.length > 0 && <ul className={`${clothingRec?.bg} rounded-r-lg border-l-4 ${clothingRec?.tempBorderColor} py-2 px-2`}>
                <li className="font-semibold mb-2 list-none flex items-center gap-3"><Thermometer /> What to Wear</li>
                {
                  clothingRec?.tempRec?.map((s, i) => (
                    <li className={`mb-0.5 py-1 px-2 rounded-lg`} key={`tempRec-${i}`}>{s}</li>
                  ))
                }
              </ul>}

              {/* Weather recommendations */}
              {clothingRec?.weatherRec?.length > 0 && <ul className={`${clothingRec?.weatherBg} rounded-r-lg border-l-4 ${clothingRec?.weatherBorderColor} py-2 px-2`}>
                <li className="font-semibold mb-2 list-none flex items-center gap-3"><Cloud /> Weather condition</li>
                {
                  clothingRec?.weatherRec?.map((s, i) => (
                    <li className={`mb-0.5 py-1 px-2 rounded-lg`} key={`weatherRec-${i}`}>{s}</li>
                  ))
                }
              </ul>}

              {/* Activity recommendations */}
              {activityRecs?.length > 0 && <ul className='bg-emerald-100 border-l-4 border-l-emerald-700 rounded-r-lg py-2 px-2'>
                <li className="font-semibold mb-2 list-none flex items-center gap-3"><LucideActivity />Activity</li>
                {
                  activityRecs?.map((obj, i) => (
                    <li key={`activity-${i}`} className={`mb-0.5 py-1 px-2 rounded-lg`}>
                      <p className='leading-4'>{obj.activity}</p>
                      <p className='text-sm'>Reason: {obj.reason}</p>
                    </li>
                  ))
                }
              </ul>}
            </div>
            <div>
            </div>
          </div>
        </div>


        {/* Interactive Charts */}
        <div className={`${bgColor} transition-colors duration-150 rounded-2xl shadow-lg p-6`}>
          <div className="flex max-md:flex-col items-center max-md:items-start max-md:*:mb-3 justify-between mb-6">
            <div className="flex items-center gap-2">
              <Thermometer className="text-red-500" size={24} />
              <h2 className="text-xl font-bold">Weather Trends</h2>
            </div>

            <div className="flex gap-2 *:px-4 *:py-2 *:rounded-lg *:text-sm *:font-medium *:transition-colors *:cursor-pointer">
              <button onClick={() => setActiveChart('temperature')} className={` ${activeChart === 'temperature' ? 'bg-cyan-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} aria-label='Temperature'>
                Temperature
              </button>
              <button onClick={() => setActiveChart('pressure')} className={` ${activeChart === 'pressure' ? 'bg-cyan-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} aria-label='Pressure'>
                Pressure
              </button>
              <button onClick={() => setActiveChart('humidity')} className={` ${activeChart === 'humidity' ? 'bg-cyan-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} aria-label='Humidity'>
                Humidity
              </button>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'temperature' && (
                <AreaChart data={weatherData?.forecast?.forecastday?.[0].hour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => value.split(' ')[1]} />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="temp_c" stroke="#ef4444" fill="#fef2f2" />
                </AreaChart>
              )}
              {activeChart === 'pressure' && (
                <LineChart data={weatherData?.forecast?.forecastday?.[0].hour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => value.split(' ')[1]} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pressure_mb" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              )}
              {activeChart === 'humidity' && (
                <AreaChart data={weatherData?.forecast?.forecastday?.[0].hour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => value.split(' ')[1]} />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="humidity" stroke="#06b6d4" fill="#ecfeff" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div >
  );
};

export default WeatherDashboard;