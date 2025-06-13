import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Temperature from './Cards/Temperature';
import WindRainVision from './Cards/WindRainVision';
import HumiditySnow from './Cards/HumiditySnow';
import Astro from './Cards/Astro';
import { updateHourlyData } from './globalVariables/WeatherSlice';



const FutureAssumption = memo(({ theme }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weather.weatherData);
    
    const bgColor = theme === 'light' ? 'bg-gray-100' : 'bg-black/30';


    return (
        <>
            {
                weatherData?.forecast?.forecastday?.map((obj) => {
                    const todaysDay = new Date().toLocaleDateString();
                    return (
                        <article className={`mb-5 ${bgColor} p-4 rounded-xl transition-colors duration-200`}>
                            <p className='pb-4 mb-4 border-b-[1px] border-b-gray-400 text-center text-2xl font-bold'>{new Date(obj.date).toLocaleDateString() === todaysDay ? 'Today' : new Date(obj.date).toLocaleDateString()}</p>

                            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] *:mb-6'>
                                {/* Wind + Rain + Vision */}
                                <div className='w-full col-span-full'>
                                    <WindRainVision obj={obj} theme={theme} />
                                </div>

                                {/* Humidity + Snow */}
                                <div className='w-full col-span-full'>
                                    <HumiditySnow obj={obj} theme={theme} />
                                </div>

                                {/* Temprature */}
                                <div className='w-full col-span-full flex flex-wrap gap-8 justify-between'>
                                    <Temperature obj={obj} theme={theme} />
                                    <Astro obj={obj} theme={theme} />
                                </div>
                            </div>

                            {/* Hourly forecast */}
                            <div className='w-full flex justify-end pt-5'>
                                <button type='button' className='hourly-forecast-button' onClick={() => {dispatch(updateHourlyData(obj?.hour)); navigate('/hours-forecast')}} aria-label='Hourly forecast'><span className='navigation-button'>Hourly forecast</span> <div></div></button>
                            </div>
                        </article>)
                })
            }
        </>
    )
})


export default FutureAssumption;