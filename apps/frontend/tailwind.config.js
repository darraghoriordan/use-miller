const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/@use-miller/shared-frontend-tooling/**/*.{js,jsx,ts,tsx}",
    ],

    variants: {
        animation: ["motion-safe", "motion-reduce"],
    },
    safelist: [
        // Primary accent
        "text-accent",
        "bg-accent",
        "border-accent",
        "hover:bg-accent-dim",
        "hover:text-accent",
        "hover:border-accent",
        "focus:ring-accent",
        "shadow-accent/20",
        "shadow-accent/30",
        // Product colors - DevShell (muted teal-green)
        "text-product-devshell",
        "bg-product-devshell",
        "border-product-devshell",
        "hover:text-product-devshell",
        "hover:bg-product-devshell/20",
        "group-hover:text-product-devshell",
        // Product colors - Local Tools (muted cyan)
        "text-product-localtools",
        "bg-product-localtools",
        "border-product-localtools",
        "hover:text-product-localtools",
        "hover:bg-product-localtools/20",
        "group-hover:text-product-localtools",
        // Product colors - Miller Start (muted violet)
        "text-product-millerstart",
        "bg-product-millerstart",
        "border-product-millerstart",
        "hover:text-product-millerstart",
        "hover:bg-product-millerstart/20",
        "group-hover:text-product-millerstart",
        // Product colors - ESLint (muted amber)
        "text-product-eslint",
        "bg-product-eslint",
        "border-product-eslint",
        "hover:text-product-eslint",
        "hover:bg-product-eslint/20",
        "group-hover:text-product-eslint",
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
            "4xl": ["2.5rem", { lineHeight: "3rem" }],
            "5xl": ["3rem", { lineHeight: "3.5rem" }],
            "6xl": ["3.75rem", { lineHeight: "1.1" }],
            "7xl": ["4.5rem", { lineHeight: "1.1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        extend: {
            colors: {
                // Base monochrome - security dark theme
                "security-black": "#0A0A0B",
                "security-darker": "#101011",
                "security-dark": "#141415",
                "security-mid": "#1C1C1E",
                "security-border": "#2A2A2C",
                "security-muted": "#6B6B6F",
                "security-text": "#A1A1A6",
                "security-light": "#E8E8ED",

                // Primary accent - security green (terminal/matrix aesthetic)
                accent: "#00FF88",
                "accent-dim": "#00CC6A",
                "accent-muted": "rgba(0, 255, 136, 0.15)",

                // Muted product colors (desaturated for professional look)
                "product-devshell": "#4A9B7C",
                "product-localtools": "#5B8A9A",
                "product-millerstart": "#8B7BA3",
                "product-eslint": "#9B8A5B",

                // Semantic colors
                warning: "#FFB800",
                error: "#FF4444",

                // Legacy colors (keep for gradual migration)
                "light-shade": "#F8FAF4",
                "light-accent": "#C5C5C5",
                "main-brand": "#00FF88",
                "dark-accent": "#1C1C1E",
                "dark-mid": "#141415",
                "dark-shade": "#0A0A0B",
            },
            animation: {
                fadeIn: "fadeIn 0.6s ease-out forwards",
                fadeInUp: "fadeInUp 0.6s ease-out forwards",
                fadeInDown: "fadeInDown 0.6s ease-out forwards",
                blink: "blink 1s step-end infinite",
                typewriter: "typewriter 2s steps(20) forwards",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                scan: "scan 8s linear infinite",
                "slide-up": "slideUp 0.5s ease-out forwards",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeInDown: {
                    "0%": { opacity: "0", transform: "translateY(-20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                typewriter: {
                    "0%": { width: "0" },
                    "100%": { width: "100%" },
                },
                "glow-pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(0, 255, 136, 0.15)",
                    },
                    "50%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.3)" },
                },
                scan: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            borderRadius: {
                "4xl": "2rem",
            },
            fontFamily: {
                sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
                display: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
                mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
            },
            maxWidth: {
                "2xl": "40rem",
            },
            backgroundImage: {
                "grid-pattern":
                    "linear-gradient(rgba(42, 42, 44, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 42, 44, 0.4) 1px, transparent 1px)",
                "gradient-radial":
                    "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
            },
            backgroundSize: {
                grid: "40px 40px",
            },
            boxShadow: {
                glow: "0 0 20px rgba(0, 255, 136, 0.2)",
                "glow-lg": "0 0 40px rgba(0, 255, 136, 0.3)",
                "glow-xl": "0 0 60px rgba(0, 255, 136, 0.4)",
                terminal:
                    "0 0 0 1px rgba(42, 42, 44, 1), 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
