import { useState, useEffect, memo } from "react"
import useThemeStyle from "../hooks/useThemeStyle";

const Time = memo(() => {
    const { shadow } = useThemeStyle();

    const [time, setTime] = useState(new Date());
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            setTime(currentTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <article className={`bg-cyan-700 min-w-56 flex-col justify-center h-36 max-w-72 rounded-xl text-white ${shadow}`}>
            <p className="text-center text-4xl">{time.getHours() === 0 ? 12 : time.getHours()} : {time.getMinutes()} : {time.getSeconds()}</p>
            <p className="text-center text-lg">{days[time.getDay()]}, {time.getDate()}, {time.getFullYear()}</p>
        </article>
    )
})

export default Time;
