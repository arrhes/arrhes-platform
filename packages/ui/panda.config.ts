import { defineConfig } from "@pandacss/dev"


export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        tokens: {
            colors: {
                white: { value: "#FFFFFF" },
                background: { value: "#F9F9F9" },
                neutral: { value: "#1F292E" },
                success: { value: "#34B234" },
                error: { value: "#C91D1D" },
                warning: { value: "#E8B130" },
                information: { value: "#309be8" },
                primary: { value: "#2563eb" },
            },
            fonts: {
                mono: { value: '"Sometype Mono", monospace' },
            },
            radii: {
                xs: { value: "0.125rem" },
                sm: { value: "0.25rem" },
                md: { value: "0.5rem" },
                lg: { value: "1rem" },
                xl: { value: "2rem" },
            },
            shadows: {
                inset: { value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" },
                xs: { value: "rgba(17, 17, 26, 0.1) 0px 1px 0px" },
                sm: { value: "rgba(17, 17, 26, 0.1) 0px 1px 4px" },
            },
            sizes: {
                maxSm: { value: "320px" },
                maxMd: { value: "768px" },
                maxLg: { value: "1024px" },
                maxXl: { value: "1280px" },
            },
        },
        breakpoints: {
            sm: "320px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },

    // The output directory for your css system
    outdir: "styled-system",

    // Use JSX style props
    jsxFramework: "react",
})
