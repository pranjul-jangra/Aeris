export default function Astro({ obj, theme }) {
  const themeShadow = theme === 'light' ? '*:shadow-gray-300' : '*:shadow-black/70';


  return (
    <section className={`w-full max-w-[550px] *:bg-cyan-800/90 *:text-white *:py-5 *:hover:scale-105 *:transition-transform *:duration-150 *:rounded-lg *:shadow-md ${themeShadow} grid-container *:w-full *:h-full *:flex *:flex-col *:justify-center *:items-center`}>
      <div className="relative">
        <img src="/sun-rise.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p>{obj.astro.sunrise}</p>
        <p>Sunrise</p>
      </div>

      <div className="relative">
        <img src="/sunset.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p>{obj.astro.sunset}</p>
        <p>Sunset</p>
      </div>

      <div className="relative">
        <img src="/moon-rise.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p>{obj.astro.moonrise}</p>
        <p>Moonrise</p>
      </div>

      <div className="relative">
        <img src="/moon-set.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p>{obj.astro.moonset}</p>
        <p>Moonset</p>
      </div>

      <div className="relative">
        {
          (() => {
            switch (obj.astro.moon_phase) {
              case 'New Moon':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/new-moon.png" alt="" />;
              case 'Waxing Crescent':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/waxing-crescent.png" alt="" />;
              case 'First Quarter':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/first-quarter.png" alt="" />;
              case 'Waxing Gibbous':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/waxing-gibbous.png" alt="" />;
              case 'Full Moon':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/full-moon.png" alt="" />;
              case 'Waning Gibbous':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/waning-gibbous.png" alt="" />;
              case 'Last Quarter':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/last-quarter.png" alt="" />;
              case 'Waning Crescent':
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/waning-crescent.png" alt="" />;
              default:
                return <img className="absolute top-0 right-0 w-12 aspect-square" src="/moon.png" alt="" />;
            }
          })()
        }
        <p>Moon phase</p>
        <p>{obj.astro.moon_phase}</p>
      </div>

      <div className="relative">
        <img src="/moon-illum.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p>{obj.astro.moon_illumination}</p>
        <p>Moon illumination</p>
      </div>

      <div className="relative">
        <img src="/sun.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p className="font-bold">Sun</p>
        <p className="pt-1">{obj.astro.is_sun_up === 0 ? 'Hidden' : 'Visible in the sky'}</p>
      </div>

      <div className="relative">
        <img src="/moon.png" className="absolute top-0 right-0 w-12 aspect-square" alt="" />
        <p className="font-bold">Moon</p>
        <p className="pt-1">{obj.astro.is_moon_up === 0 ? 'Hidden' : 'Visible in the sky'}</p>
      </div>
    </section>
  )
}
