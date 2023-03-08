/** @type {import('tailwindcss').Config} */
declare const config: {
    content: string[];
    variants: {
        animation: string[];
    };
    safelist: string[];
    theme: {
        fontSize: {
            xs: (string | {
                lineHeight: string;
            })[];
            sm: (string | {
                lineHeight: string;
            })[];
            base: (string | {
                lineHeight: string;
            })[];
            lg: (string | {
                lineHeight: string;
            })[];
            xl: (string | {
                lineHeight: string;
            })[];
            "2xl": (string | {
                lineHeight: string;
            })[];
            "3xl": (string | {
                lineHeight: string;
            })[];
            "4xl": (string | {
                lineHeight: string;
            })[];
            "5xl": (string | {
                lineHeight: string;
            })[];
            "6xl": (string | {
                lineHeight: string;
            })[];
            "7xl": (string | {
                lineHeight: string;
            })[];
            "8xl": (string | {
                lineHeight: string;
            })[];
            "9xl": (string | {
                lineHeight: string;
            })[];
        };
        extend: {
            animation: {
                fadeIn: string;
            };
            keyframes: {
                fadeIn: {
                    "0%": {
                        opacity: number;
                    };
                    "100%": {
                        opacity: number;
                    };
                };
            };
            borderRadius: {
                "4xl": string;
            };
            fontFamily: {
                sans: string[];
                display: string[];
            };
            maxWidth: {
                "2xl": string;
            };
        };
    };
    plugins: any[];
};
export default config;
