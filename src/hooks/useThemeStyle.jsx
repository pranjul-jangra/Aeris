export default function useThemeStyle() {
    const theme = localStorage.getItem('Aeris-theme') || 'light'

    return (
        {
            bgColor: theme === 'light' ? 'bg-white' : 'bg-black/85 text-gray-300',
            metaInfoBg: theme === 'light' ? 'bg-white' : 'bg-zinc-900 text-gray-300',
            cardBg: theme === 'light' ? 'bg-gray-100' : 'bg-black/30',
            darkCardBg: theme === 'light' ? 'bg-gray-100/20' : 'bg-zinc-900/50',
            headerBg: theme === 'light' ? 'bg-white' : 'bg-zinc-900',
            buttonBg: theme === "light" ? "bg-cyan-800 text-white hover:bg-cyan-900" : "bg-cyan-900/80 text-gray-100 hover:bg-cyan-900",
            iconBg: theme === "light" ? "bg-gray-50" : "bg-zinc-800/70",

            textColor: theme === 'light' ? 'text-gray-900' : 'text-gray-300',
            secondaryText: theme === 'light' ? 'text-gray-600' : 'text-gray-300/70',
            mutedText: theme === 'light' ? 'text-gray-700' : 'text-gray-300',

            border: theme === "light" ? "border-gray-200" : "border-zinc-700/80",
            softBorder: theme === 'light' ? 'border-gray-100' : 'border-zinc-800',
            hoverBorder: theme === "light" ? "hover:border-gray-300" : "hover:border-zinc-700",

            shadow: theme === 'light' ? 'shadow-gray-200' : 'shadow-black/50',

        }
    )
}
