import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { showWeatherToast } from "./WeatherToast";
import axios from "axios";
import ScreenLoader from "./ScreenLoader";

export default function Login() {
    const navigate = useNavigate();
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const [loading, setLoading] = useState(false);

    const handleLogin = async ({ username, password }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverURL}/api/auth/login`, { username, password }, { withCredentials: true });
            localStorage.setItem("isAuthorized", res.data?.isAuthorized);
            navigate("/", { replace: true });
            
        } catch (error) {
            showWeatherToast(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            {loading && <ScreenLoader />}
            <AuthForm mode="login" onSubmit={handleLogin} />
        </section>
    );
}
