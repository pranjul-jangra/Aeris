import { useEffect, useState } from "react";

const loadingMessages = [
    "Warming up the sun… ☀️",
    "Chasing the clouds… ☁️",
    "Measuring the wind… 🌬️",
    "Counting the raindrops… 🌧️",
    "Tuning the thunder… ⛈️",
    "Clearing the skies… 🌤️",
    "Almost there… ⏳"
];

const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        zIndex: 9999
    },
    loaderContainer: {
        textAlign: "center",
        animation: "fadeIn 0.5s ease-in-out"
    },
    spinner: {
        border: "6px solid rgba(255, 255, 255, 0.2)",
        borderTop: "6px solid #61dafb",
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        animation: "spin 1s linear infinite",
        margin: "0 auto 20px"
    },
    message: {
        fontSize: "1.2rem",
        fontWeight: "500"
    }
};

export default function ScreenLoader() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.overlay}>
            <div style={styles.loaderContainer}>
                <div className="spinner" style={styles.spinner}></div>
                <p style={styles.message}>{loadingMessages[messageIndex]}</p>
            </div>
        </div>
    );
}
