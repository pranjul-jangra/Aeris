import { useState, useEffect, memo } from "react"

const Time = memo(({theme}) => {
    const [time, setTime] = useState(new Date());
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            setTime(currentTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    // Theme style
    const themeShadow = theme === 'light' ? 'shadow-gray-400' : 'shadow-black/50';

    return (
        <article className={`bg-cyan-700 min-w-56 flex-col justify-center h-36 max-w-72 rounded-xl text-white ${themeShadow}`}>
            <p className="text-center text-4xl">{time.getHours() === 0 ? 12 : time.getHours()} : {time.getMinutes()} : {time.getSeconds()}</p>
            <p className="text-center text-lg">{days[time.getDay()]}, {time.getDate()}, {time.getFullYear()}</p>
        </article>
    )
})

export default Time;
