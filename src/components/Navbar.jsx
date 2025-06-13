import { memo, useState, useEffect } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LocateFixed } from "lucide-react";
import { showWeatherToast } from "./WeatherToast";
import { fetchWeatherData } from "./globalVariables/WeatherSlice.js"


const Navbar = memo(({ toggleTheme, theme, onMapScroll }) => {
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [delayChangeEvent, setDelayChangeEvent] = useState(false);

    const dispatch = useDispatch();

    // Get stored location on mount
    useEffect(() => {
        const stored = localStorage.getItem("Aeris-location");
        if (stored) {
            const location = JSON.parse(stored);
            dispatch(fetchWeatherData(location));
        } else {
            handleLocateYouself();
        }
    }, []);

    // Store location and fetch weather
    const updateLocation = (location) => {
        localStorage.setItem("Aeris-location", JSON.stringify(location));
        dispatch(fetchWeatherData(location));
    };

    // Search bar
    const handleSearch = () => {
        if (city.trim()) {
            updateLocation({ city });
            setCity('');
        }
    };

    // Locate yourself
    const handleLocateYouself = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    updateLocation({ lat: latitude, lon: longitude });
                },
                () => showWeatherToast("Failed to get location. Please allow location access."),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            showWeatherToast("Geolocation is not supported by your browser.");
        }
    };

    // City list fetch (autocomplete)
    useEffect(() => {
        if (delayChangeEvent) return setDelayChangeEvent(false);
        if (!city.trim()) return setCityList([]);

        const debounceTimeout = setTimeout(async () => {
            try {
                const response = await axios.get("https://api.locationiq.com/v1/autocomplete", {
                    params: { key: import.meta.env.VITE_LOCATIONIQ_API, q: city, limit: 6, format: "json" },
                });
                setCityList(response.data);
            } catch {
                setCityList([]);
            }
        }, 300);
        return () => clearTimeout(debounceTimeout);
    }, [city]);

    //  Intervaly fetch weather
    useEffect(() => {
        const stored = localStorage.getItem("Aeris-location");
        if (!stored) return;

        const location = JSON.parse(stored);
        const interval = setInterval(() => {
            dispatch(fetchWeatherData(location));
        }, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <nav className={`w-full h-14 flex justify-between items-center px-5 max-md:pl-2 max-md:pr-0 sticky top-0 backdrop-blur-md z-10 bg-white/10 border-b border-white/20`}>
            <img src="/logo.png" alt="" loading='eager' className='w-10 aspect-square object-contain pointer-events-none max-md:hidden' />

            <div className="flex relative">
                <input type="search" name="Search location" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Location?" className="w-68 max-md:max-w-56 placeholder:text-sm rounded-l-md pl-2 py-1.5 bg-white/70 border-[1px] border-gray-300 border-r-0 outline-0 focus-visible:outline-2 outline-cyan-700" aria-label="Seach location" />
                <button type="button" onClick={handleSearch} className="px-2 rounded-r-md bg-cyan-800 text-white cursor-pointer border-0 outline-0 focus-visible:outline-2 outline-cyan-700" aria-label="Search">Search</button>

                {/* Cities suggestion */}
                {(cityList && cityList?.length !== 0) && <ul className="cityList absolute top-full left-0 w-full px-3 py-2 rounded-sm bg-white/95 text-gray-900 flex flex-col gap-2 list-none">
                    {
                        cityList?.map((obj, i) => (
                            <li key={`city-${i}`}
                                tabIndex='0' aria-label={obj?.address?.name}
                                className="focus:outline-1 focus:outline-black focus:rounded-md"
                                onClick={() => { setCity(obj?.address?.name); setCityList([]); setDelayChangeEvent(true) }}
                                onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { setCity(obj?.address?.name); setCityList([]); setDelayChangeEvent(true) } }}>
                                <p>
                                    {obj?.address?.name}
                                    {(obj?.address?.country && obj?.address?.country !== 'undefined') && `, ${obj?.address?.country}`}
                                    {(obj?.address?.postcode && obj?.address?.postcode !== 'undefined') && `, ${obj?.address?.postcode}`}</p>
                                <p>Type: {obj?.type}</p>
                            </li>
                        ))
                    }
                </ul>}
            </div>


            <div className="flex gap-6 max-md:gap-3">
                <button type="button" onClick={onMapScroll} className="px-2 py-1.5 bg-cyan-800 rounded-md cursor-pointer max-md:hidden border-0 outline-0 focus-visible:outline-2 outline-cyan-700" title="Explore the world" aria-label="Explore the world">🗺️</button>
                <button type="button" onClick={handleLocateYouself} title="Locate yourself" className="px-1.5 py-1.5 bg-cyan-800 rounded-md text-white cursor-pointer max-sm:hidden border-0 outline-0 focus-visible:outline-2 outline-cyan-700" aria-label="Locate yourself"><LocateFixed /></button>
                <ToggleSwitch toggleTheme={toggleTheme} theme={theme} />
            </div>
        </nav>
    )
})


export default Navbar;