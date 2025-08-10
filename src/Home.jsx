import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import FutureAssumption from './components/FutureAssumption';
import TodaysForecast from './components/TodaysForecast';
import Footer from './components/Footer';
import Map from './components/Map';
import useThemeStyle from './hooks/useThemeStyle';


export default function Home({ theme, toggleTheme }) {
    const { bgColor, metaInfoBg } = useThemeStyle();

    const weatherData = useSelector((state) => state.weather.weatherData);
    const mapRef = useRef();

    const scrollToMap = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <main className={`${bgColor} transition-colors duration-300`}>
            <Navbar toggleTheme={toggleTheme} theme={theme} onMapScroll={scrollToMap} />

            <section className={`w-full transition-colors duration-150`}>
                {/* Metadata - location */}
                <div className={`flex location-header justify-between items-center ${metaInfoBg} backdrop-blur-md rounded-b-md shadow-md p-6 mb-6`}>
                    <div className="leading-relaxed space-y-2">
                        <p>
                            <span className="font-semibold text-lg whitespace-nowrap">📍 Location:</span>
                            <span className="ml-2 tracking-wide">
                                {weatherData?.location?.name || 'City'},
                                {weatherData?.location?.region || 'Region'},
                                {weatherData?.location?.country || 'Country'}
                            </span>
                        </p>
                        <p>
                            <span className="font-semibold text-lg whitespace-nowrap">🕓 Time zone:</span>
                            <span className="ml-2 tracking-wide">{weatherData?.location?.tz_id}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-lg whitespace-nowrap">📅 Date:</span>
                            <span className="ml-2 tracking-wide">
                                {new Date(weatherData?.location?.localtime).toLocaleDateString()},
                                {new Date(weatherData?.location?.localtime).toLocaleTimeString()}
                            </span>
                        </p>
                        <p className="pt-2 font-semibold text-sm text-gray-900">Lat: {weatherData?.location?.lat} | Lon: {weatherData?.location?.lon}</p>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col items-center">
                        <img className="w-24 h-24 object-contain brightness-110 contrast-90" src={weatherData?.current?.condition?.icon} alt="weather icon" />
                        <p className="text-center text-teal-950 text-lg font-semibold text-shadow-2xs text-shadow-cyan-900 tracking-wider mt-1">{weatherData?.current?.condition?.text}</p>
                    </div>
                </div>


                <section className="px-5 max-md:px-3 max-sm:px-1">
                    {/* Todays forecast */}
                    <h1 className={`weather-heading ${theme === 'dark' && 'weather-heading-dark'}`}>Todays forecast</h1>
                    <div className='min-h-screen'>
                        <TodaysForecast />
                    </div>

                    {/* Future forecast */}
                    <h1 className={`weather-heading ${theme === 'dark' && 'weather-heading-dark'}`}>Detailed forecast</h1>
                    <div className='min-h-30 p-2 rounded-2xl mb-10'>
                        {
                            Object.keys(weatherData || {})?.length > 0 ? <FutureAssumption /> : <div className='text-xl font-medium text-gray-500/90'>Please choose a location.</div>
                        }
                    </div>

                    {/* Map */}
                    <div className='h-fit pb-3'>
                        <Map ref={mapRef} />
                    </div>
                </section>
            </section>
            <Footer />
        </main>
    )
}
