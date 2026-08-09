import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import FutureAssumption from './components/FutureAssumption';
import TodaysForecast from './components/TodaysForecast';
import Footer from './components/Footer';
import Map from './components/Map';
import useThemeStyle from './hooks/useThemeStyle';
import Hero from './components/Hero';


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
                <Hero weatherData={weatherData} />


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
                            Object.keys(weatherData || {})?.length > 0
                                ? <FutureAssumption />
                                : <div className='text-xl font-medium text-gray-500/90'>Please choose a location.</div>
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
