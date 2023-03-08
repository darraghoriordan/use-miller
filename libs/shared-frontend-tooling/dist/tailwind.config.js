import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./**/*.{js,jsx,ts,tsx}"],
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
        "focus:ring-red-400",
        "hover:shadow-red-500/30",
        "text-red-500",
        "bg-red-500",
        "hover:text-red-500",
        "hover:bg-red-600",
        "hover:shadow-green-500/30",
        "focus:ring-green-400",
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
    plugins: [require("@tailwindcss/forms")],
};
export default config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFpbHdpbmQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RhaWx3aW5kLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCwyQ0FBMkM7QUFDM0MsTUFBTSxNQUFNLEdBQUc7SUFDWCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUNuQyxRQUFRLEVBQUU7UUFDTixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDN0I7SUFDRCxRQUFRLEVBQUU7UUFDTixzQkFBc0I7UUFDdEIsMkJBQTJCO1FBQzNCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUVwQixvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLGNBQWM7UUFDZCxZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLGtCQUFrQjtRQUVsQiwyQkFBMkI7UUFDM0Isc0JBQXNCO1FBQ3RCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUVwQixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLGVBQWU7UUFDZixhQUFhO1FBQ2IscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUVuQix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsdUJBQXVCO1FBQ3ZCLHFCQUFxQjtRQUVyQixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLGVBQWU7UUFDZixhQUFhO1FBQ2IscUJBQXFCO1FBQ3JCLG1CQUFtQjtLQUN0QjtJQUNELEtBQUssRUFBRTtRQUNILFFBQVEsRUFBRTtZQUNOLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN2QyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDMUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQ3pDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN4QyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3pDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQztZQUN6QyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDM0MsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDeEMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUN2QztRQUNELE1BQU0sRUFBRTtZQUNKLFNBQVMsRUFBRTtnQkFDUCxNQUFNLEVBQUUsNEJBQTRCO2FBQ3ZDO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO29CQUNwQixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO2lCQUN6QjthQUNKO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN2RDtZQUNELFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUUsT0FBTzthQUNqQjtTQUNKO0tBQ0o7SUFDRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztDQUMzQyxDQUFDO0FBRUYsZUFBZSxNQUFNLENBQUMifQ==