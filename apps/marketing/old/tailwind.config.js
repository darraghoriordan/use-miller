module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                "hero-image": "url('/mountains.jpg')",
            }),
            colors: {
                "light-shade": "#F8FAF4", // ivory white
                "light-accent": "#1B4942", // darkish-green-(text)
                "main-brand": "#21CD9C", // bright-green
                "dark-accent": "#212732", // weird-brown
                "dark-shade": "#262638", // dark-purple
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
