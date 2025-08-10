export default function useThemeStyle() {
    const theme = localStorage.getItem('Aeris-theme') || 'light'

    return (
        {
            bgColor: theme === 'light' ? 'bg-white' : 'bg-black/85 text-gray-300',
            metaInfoBg: theme === 'light' ? 'bg-white' : 'bg-zinc-900 text-gray-300',
            cardBg: theme === 'light' ? 'bg-gray-100' : 'bg-black/30',
            darkCardBg: theme === 'light' ? 'bg-gray-100/20' : 'bg-zinc-900',
            headerBg: theme === 'light' ? 'bg-white' : 'bg-zinc-900',

            textColor: theme === 'light' ? 'text-gray-900' : 'text-gray-300',

            border: theme === "light" ? "border-gray-200" : "border-zinc-700/80",

            shadow: theme === 'light' ? 'shadow-gray-200' : 'shadow-black/50',
        }
    )
}
