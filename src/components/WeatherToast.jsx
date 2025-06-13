import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './weatherToast.css';

export function showWeatherToast(message) {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        newestOnTop: true,
        draggable: true,
        icon: <div className="toast-cloud-icon">
            <img src="/cloud.png" alt="" />
        </div>,
        className: "weather-toast",
        bodyClassName: "weather-toast-body",
        progressClassName: "weather-toast-progress"
    });
}

export default function WeatherToastContainer() {
    return <ToastContainer />;
}
