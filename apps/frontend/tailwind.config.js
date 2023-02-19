module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    variants: {
        animation: ["motion-safe"],
        opacity: ({ after }) => after(["disabled"]),
        extend: {},
    },
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

    plugins: [],
};
