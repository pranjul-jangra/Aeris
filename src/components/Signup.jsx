import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { showWeatherToast } from "./WeatherToast";
import axios from "axios";
import ScreenLoader from "./ScreenLoader";

export default function Signup() {
    const navigate = useNavigate();
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const [loading, setLoading] = useState(false);

    const handleSignup = async ({ username, password }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverURL}/api/auth/signup`, { username, password }, { withCredentials: true });
            localStorage.setItem("isAuthorized", res.data?.isAuthorized);
            navigate("/", { replace: true });

        } catch (err) {
            showWeatherToast(err.response?.data?.error || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            {loading && <ScreenLoader />}
            <AuthForm mode="signup" onSubmit={handleSignup} />
        </section>
    );
}
