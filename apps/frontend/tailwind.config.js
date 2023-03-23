const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/@use-miller/shared-frontend-tooling/**/*.{js,jsx,ts,tsx}",
    ],

    variants: {
        animation: ["motion-safe"],
    },
    safelist: [
        "focus:ring-amber-400",
        "hover:shadow-amber-500/30",
        "text-amber-500",
        "bg-amber-500",
        "hover:text-amber-500",
        "hover:bg-amber-600",
        "hover:bg-amber-500/75",

        "focus:ring-red-400",
        "hover:shadow-red-500/30",
        "text-red-500",
        "bg-red-500",
        "hover:text-red-500",
        "hover:bg-red-600",
        "hover:bg-red-500/75",

        "hover:shadow-green-500/30",
        "focus:ring-green-400",
        "bg-green-500/30",
        "text-green-500",
        "bg-green-500",
        "hover:text-green-500",
        "hover:bg-green-600",
        "hover:bg-green-500/75",

        "focus:ring-cyan-400",
        "hover:shadow-cyan-500/30",
        "text-cyan-500",
        "bg-cyan-500",
        "hover:text-cyan-500",
        "hover:bg-cyan-600",
        "hover:bg-cyan-500/75",

        "focus:ring-violet-400",
        "hover:shadow-violet-500/30",
        "text-violet-500",
        "bg-violet-500",
        "hover:text-violet-500",
        "hover:bg-violet-600",
        "hover:bg-violet-500/75",

        "focus:ring-pink-400",
        "hover:shadow-pink-500/30",
        "text-pink-500",
        "bg-pink-500",
        "hover:text-pink-500",
        "hover:bg-pink-600",
        "hover:bg-pink-500/75",
    ],
    theme: {
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.5rem" }],
            base: ["1rem", { lineHeight: "1.75rem" }],
            lg: ["1.125rem", { lineHeight: "2rem" }],
            xl: ["1.25rem", { lineHeight: "2rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["2rem", { lineHeight: "2.5rem" }],
            "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
            "5xl": ["3rem", { lineHeight: "3.5rem" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1.1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        extend: {
            colors: {
                "light-shade": "#F8FAF4", // ivory white
                "light-accent": "#C5C5C5", // darkish-green-(text)
                "main-brand": "#21CD9C", // bright-green
                "dark-accent": "#282828", // vs code highlight
                "dark-mid": "#212122", // vs code explorer
                "dark-shade": "#1E1E1E", // vscode editor dark
            },
            animation: {
                fadeIn: "fadeIn 2s ease-in forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            borderRadius: {
                "4xl": "2rem",
            },
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                display: ["Lexend", ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                "2xl": "40rem",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
