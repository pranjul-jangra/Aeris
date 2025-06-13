function Cards({ obj, imgsrc, text, firstField, firstFieldUnit, secondField, secondFieldUnit }) {

    return (
        <article className='relative'>
            <img src={imgsrc} className='absolute w-14 aspect-square -top-3 -right-5 pointer-events-none' alt="" />
            <p className='bg-cyan-800/90 py-2 text-white px-10 rounded-t-md'>{text}</p>
            <div className='p-3 *:whitespace-pre-wrap'>
                <p className='border-b-[1px] border-b-cyan-600/30 pb-2 mb-2'><span className='font-bold text-xl'>{obj.day[firstField]}</span>   {firstFieldUnit}</p>
                <p><span className='font-bold text-xl'>{obj.day[secondField]}</span>   {secondFieldUnit}</p>
            </div>
        </article>
    )
}

export default function WindRainVision({ obj, theme }) {

    const themeShadow = theme === 'light' ? '*:shadow-gray-300' : '*:shadow-black/70';


    return (
        <section className={`*:rounded-md grid gap-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] *:shadow-md ${themeShadow}`}>

            {/* Wind speed */}
            <Cards obj={obj} imgsrc='/wind.png' text='Max Wind speed' firstField='maxwind_mph' firstFieldUnit='miles/h' secondField='maxwind_kph' secondFieldUnit='km/h' />

            {/* Precip (Wind speed) */}
            <Cards obj={obj} imgsrc='/rain.png' text='Max Rain fall' firstField='totalprecip_mm' firstFieldUnit='max/millimeters' secondField='totalprecip_in' secondFieldUnit='max/inches' />

            {/* Vision */}
            <Cards obj={obj} imgsrc='/vision.png' text='Avg Vision' firstField='avgvis_km' firstFieldUnit='visibility/km' secondField='avgvis_miles' secondFieldUnit='visibility/mile' />

        </section>
    )
}
