import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: [...defaultTheme.fontFamily.sans],
            serif: [...defaultTheme.fontFamily.serif],
            mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
        },
    },
    plugins: [require('daisyui')],
}
