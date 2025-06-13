export default function HumiditySnow({ obj, theme }) {
    const themeShadow = theme === 'light' ? '*:shadow-gray-300' : '*:shadow-black/70';  
    return (
        <section className={`*:rounded-md grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] *:whitespace-pre-wrap *:shadow-md ${themeShadow}`}>
            <article className='relative'>
                <img src="/snow-fall.png" className='absolute w-14 aspect-square -top-3 -right-5 pointer-events-none' alt="" />
                <p className='bg-cyan-800/90 py-2 text-white px-10 rounded-t-md'>Max Snow fall</p>
                <p className='p-3 *:whitespace-pre-wrap'><span className='font-bold text-xl'>{obj.day.totalsnow_cm}</span>  max/cm</p>
            </article>

            <article className='relative'>
                <img src="/humidity.png" className='absolute w-14 aspect-square -top-3 -right-5 pointer-events-none' alt="" />
                <p className='bg-cyan-800/90 py-2 text-white px-10 rounded-t-md'>Avg Humidity</p>
                <p className='p-3 *:whitespace-pre-wrap'><span className='font-bold text-xl'>{obj.day.avghumidity}</span>  avg</p>
            </article>
        </section>
    )
}
