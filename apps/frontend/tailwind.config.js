module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "node_modules/@use-miller/shared-frontend-tooling/**/*.{js,jsx,ts,tsx}",
    ],
    variants: {
        animation: ["motion-safe"],
        opacity: ({ after }) => after(["disabled"]),
        extend: {},
    },
    safelist: [
        "focus:ring-amber-400",
        "hover:shadow-amber-500/30",
        "text-amber-500",
        "bg-amber-500",
        "hover:text-amber-500",
        "hover:bg-amber-600",

        "focus:ring-red-400",
        "hover:shadow-red-500/30",
        "text-red-500",
        "bg-red-500",
        "hover:text-red-500",
        "hover:bg-red-600",

        "hover:shadow-green-500/30",
        "focus:ring-green-400",
        "bg-green-500/30",
        "text-green-500",
        "bg-green-500",
        "hover:text-green-500",
        "hover:bg-green-600",

        "focus:ring-cyan-400",
        "hover:shadow-cyan-500/30",
        "text-cyan-500",
        "bg-cyan-500",
        "hover:text-cyan-500",
        "hover:bg-cyan-600",

        "focus:ring-violet-400",
        "hover:shadow-violet-500/30",
        "text-violet-500",
        "bg-violet-500",
        "hover:text-violet-500",
        "hover:bg-violet-600",

        "focus:ring-pink-400",
        "hover:shadow-pink-500/30",
        "text-pink-500",
        "bg-pink-500",
        "hover:text-pink-500",
        "hover:bg-pink-600",
    ],
    theme: {
        extend: {
            colors: {
                "light-shade": "#F8FAF4", // ivory white
                "light-accent": "#C5C5C5", // darkish-green-(text)
                "main-brand": "#21CD9C", // bright-green
                "dark-accent": "#282828", // vs code highlight
                "dark-mid": "#212122", // vs code explorer
                "dark-shade": "#1E1E1E", // vscode editor dark
            },
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
