import useThemeStyle from "../../hooks/useThemeStyle";

export default function HumiditySnow({ obj }) {
    const { shadow } = useThemeStyle();

    return (
        <section className={`*:rounded-md grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] *:whitespace-pre-wrap *:shadow-md`}>
            <article className={`relative ${shadow}`}>
                <img src="/snow-fall.png" className='absolute w-14 aspect-square -top-3 -right-5 pointer-events-none' alt="" />
                <p className='bg-cyan-800/90 py-2 text-white px-10 rounded-t-md'>Max Snow fall</p>
                <p className='p-3 *:whitespace-pre-wrap'><span className='font-bold text-xl'>{obj.day.totalsnow_cm}</span>  max/cm</p>
            </article>

            <article className={`relative ${shadow}`}>
                <img src="/humidity.png" className='absolute w-14 aspect-square -top-3 -right-5 pointer-events-none' alt="" />
                <p className='bg-cyan-800/90 py-2 text-white px-10 rounded-t-md'>Avg Humidity</p>
                <p className='p-3 *:whitespace-pre-wrap'><span className='font-bold text-xl'>{obj.day.avghumidity}</span>  avg</p>
            </article>
        </section>
    )
}
