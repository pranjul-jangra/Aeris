import { useState, memo } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showWeatherToast } from './WeatherToast';
import { Search } from 'lucide-react';
import { fetchWeatherData } from './globalVariables/WeatherSlice';


// Ensure icons runs only once
let iconsFixed = false;
if (!iconsFixed) {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    iconsFixed = true;
}

// Find position and city on interaction
function LocationMarker({ onLocationFound }) {
    const [position, setPosition] = useState(null);
    const [city, setCity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const MAX_RETRY_TIME = 15000;
    const RETRY_INTERVAL = 1500;

    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setCity(null);
            setNetworkError(false);
            setIsLoading(true);

            const reverseGeoUrl = import.meta.env.VITE_REVERSE_GEOAPIFY_URL;
            const apiKey = import.meta.env.VITE_GEOAPIFY_API;

            if (!reverseGeoUrl || !apiKey) {
                return showWeatherToast("Access not granted. Please try again after some time.");
            }

            const fetchLocation = async () => {
                try {
                    const response = await axios.get(reverseGeoUrl, { params: { lat, lon: lng, apiKey: apiKey }, timeout: 5000 });

                    const cityName = response.data.features?.[0]?.properties?.city ||
                        response.data.features?.[0]?.properties?.town ||
                        response.data.features?.[0]?.properties?.village ||
                        'Unknown Location';

                    setCity(cityName);
                    onLocationFound({ lat, lng, city: cityName });
                    setIsLoading(false);
                    return true;
                } catch (err) {
                    return false;
                }
            };

            // Retry loop
            const start = Date.now();
            let success = false;

            while (Date.now() - start < MAX_RETRY_TIME && !success) {
                success = await fetchLocation();
                if (!success) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
                }
            }

            // IF success is false even after max retries
            if (!success) {
                setCity(null);
                setNetworkError(true);
                setIsLoading(false);
            }
        },
    });

    return position ? (
        <Marker position={position}>
            <Popup>
                <div>
                    {networkError ? (
                        <span className="text-red-600 font-semibold">Network error. Please try again later.</span>
                    ) : (
                        <>
                            <strong>City:</strong> {isLoading ? 'Loading...' : city}<br />
                            <strong>Lat:</strong> {position[0].toFixed(5)}<br />
                            <strong>Lng:</strong> {position[1].toFixed(5)}
                        </>
                    )}
                </div>
            </Popup>
        </Marker>
    ) : null;
}



// Component
const Map = memo(({ theme, ref }) => {
    const dispatch = useDispatch();
    const [locationInfo, setLocationInfo] = useState(null);

    const handleSearch = (city) => {
        if (city.trim()) dispatch(fetchWeatherData({ city }));
    };

    // Theme styling
    const textColor = theme === 'light' ? 'text-gray-900' : 'text-gray-300'

    return (
        <div ref={ref}>
            <MapContainer
                center={[20.5937, 78.9629]} // Centered on India
                zoom={5}
                scrollWheelZoom={true}
                zoomSnap={0.5}
                zoomDelta={0.5}
                wheelPxPerZoomLevel={120}
                className='h-[400px] w-full brightness-95 contrast-125'
                key="map-container"
            >
                <TileLayer
                    url={`${import.meta.env.VITE_GEOAPIFY_URL}?apiKey=${import.meta.env.VITE_GEOAPIFY_API}`}
                    attribution='&copy; <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />
                <LocationMarker onLocationFound={setLocationInfo} />
            </MapContainer>

            {locationInfo && (
                <div className={`pb-14 pt-5 ${textColor}`}>
                    <strong className='text-xl'>Current Pick</strong>
                    <p>City: {locationInfo?.city}</p>
                    <p className='text-sm'>Latitude: {locationInfo?.lat}</p>
                    <p className='text-sm'>Longitude: {locationInfo?.lng}</p>

                    <button
                        className='flex items-center gap-2 cursor-pointer focus-visible:outline-[1.4px] rounded-md px-2 mt-1.5 shadow-2xs shadow-gray-400 hover:shadow-transparent bg-cyan-900 text-white'
                        onClick={() => {handleSearch(locationInfo?.city || '')}}
                        aria-label={`Get weather for ${locationInfo?.city}`}>
                        <span className='pb-0.5'>Get weather</span> <Search className='text-white text-sm w-4 h-4' />
                    </button>
                </div>
            )}
        </div>
    );
})

export default Map;