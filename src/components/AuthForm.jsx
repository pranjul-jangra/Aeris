import { useState } from "react";
import { Link } from "react-router-dom";
import useThemeStyle from "../hooks/useThemeStyle";
import { showWeatherToast } from "./WeatherToast";

export default function AuthForm({ mode = "login", onSubmit }) {
    const { bgColor, darkCardBg, border, shadow } = useThemeStyle();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [weakPsw, setWeakPsw] = useState("");

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if(weakPsw) return showWeatherToast("Validate your password strength.");
        if(!username.trim() || !password.trim()) return showWeatherToast("Both fields are required.")
        onSubmit({ username, password });
    };

    // Validate password strength
    const validatePassword = (e) => {
        const value = e.target.value;

        if(value === "") return setWeakPsw("");
        else if(value?.length < 8) return setWeakPsw("Password must be of 8 char long.");
        else if(value?.length >= 8) return setWeakPsw("");
    }

    return (
        <main className={`flex items-center justify-center w-screen min-h-dvh ${bgColor}`}>
            <div className={`${darkCardBg} p-6 w-full max-w-xl rounded-2xl border ${border} shadow-lg ${shadow} space-y-4`}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4 text-center capitalize">{mode}</h2>

                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full border ${border} rounded p-2 mb-3`} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); validatePassword(e)}} className={`w-full border ${border} rounded p-2 mb-4`} />

                    {weakPsw && <span className="text-red-600 text-sm">{weakPsw}</span>}

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                        {mode === "signup" ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div>
                    <strong>{mode === "login" ? "Do not have an account?" : "Already have an account?"}</strong>
                    <Link to={mode === "login" ? "/signup" : "/login"} replace className="ml-2 text-blue-600 underline">{mode === "login" ? "Signup" : "Login"}</Link>
                </div>
            </div>
        </main>
    );
}
