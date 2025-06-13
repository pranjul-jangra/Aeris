import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";


export default function Temperature({ obj, theme }) {
    const themeShadow = theme === 'light' ? 'shadow-gray-300' : 'shadow-black/70';

    return (
        <div className={`w-full max-w-[400px] h-fit rounded-md *:flex *:gap-1 pb-3 relative shrink-0 grow-0 shadow-md ${themeShadow}`} yy>
            <img src="/temp.png" className="w-14 aspect-square absolute -top-3 -right-5 pointer-events-none" alt="" />

            <div className='*:bg-cyan-800/90 *:w-full *:py-1 text-white'>
                <p className='flex justify-center text-2xl rounded-tl-md'>Temp <TbTemperatureCelsius /></p>
                <p className='flex justify-center text-2xl rounded-tr-md'>Temp <TbTemperatureFahrenheit /></p>
            </div>

            <div className='*:w-full'>
                <div>
                    <p className='flex items-center gap-2 text-2xl font-semibold justify-center mt-2.5'>{obj?.day?.avgtemp_c} <TbTemperatureCelsius /></p>
                    <p className='text-center text-sm border-b-[1px] border-b-cyan-600/30 pb-2'>Avg temperature</p>

                    <p className='flex items-center gap-2 text-2xl font-semibold justify-center mt-2.5'>{obj?.day?.maxtemp_c} <TbTemperatureCelsius /></p>
                    <p className='text-center text-sm border-b-[1px] border-b-cyan-600/30 pb-2'>Max temperature</p>

                    <p className='flex items-center gap-2 text-2xl font-semibold justify-center mt-2.5'>{obj?.day?.mintemp_c} <TbTemperatureCelsius /></p>
                    <p className='text-center text-sm'>Min temperature</p>
                </div>
                <div>
                    <p className='flex items-center gap-2 text-2xl font-semibold justify-center mt-2.5'>{obj?.day?.avgtemp_f} <TbTemperatureFahrenheit /></p>
                    <p className='text-center text-sm border-b-[1px] border-b-cyan-600/30 pb-2'>Avg temperature</p>

                    <p className='flex items-center gap-2 text-2xl font-semibold justify-center mt-2.5'>{obj?.day?.maxtemp_f} <TbTemperatureFahrenheit /></p>
                    <p className='text-center text-sm border-b-[1px] border-b-cyan-600/30 pb-2'>Max temperature</p>

                    <p className='flex items-center gap-2 text-2xl font-semibold justify-center mt-2.5'>{obj?.day?.mintemp_f} <TbTemperatureFahrenheit /></p>
                    <p className='text-center text-sm'>Min temperature</p>
                </div>
            </div>
        </div>
    )
}
