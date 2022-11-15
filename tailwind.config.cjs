/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backdropBrightness: {
                25: ".25",
            },
            colors: require("daisyui/src/colors"),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require("daisyui")
    ],
    daisyui: {
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        themes: [
            {
                ashdark: {

                    'primary': '#53a1b3',
                    'primary-focus': '#73d1e3',
                    'primary-content': '#eeeeff',

                    'secondary': '#228740',
                    'secondary-focus': '#53f361',
                    'secondary-content': '#eeeeff',

                    'accent': '#6009b3',
                    'accent-focus': '#9009e3',
                    'accent-content': '#eeeeff',

                    'neutral': '#5f7992',
                    'neutral-focus': '#7f99a2',
                    'neutral-content': '#77a1b3',

                    'base-100': '#000b16',
                    'base-200': '#000f1e',
                    'base-300': '#15252c',
                    'base-content': '#53a1b3',

                    'info': '#0260c7',
                    'success': '#87cf0a',
                    'warning': '#ffc347',
                    'error': '#ff0a0a',

                    '--rounded-box': '0.25rem',
                    '--rounded-btn': '0.0rem',
                    '--rounded-badge': '0.1rem',

                    '--animation-btn': '0.15s',
                    '--animation-input': '0.2s',

                    '--navbar-padding': '.5rem',
                    '--border-btn': '1px',
                },

                ashlight: {

                    'primary': '#026087',
                    'primary-focus': '#114095',
                    'primary-content': '#eeeeff',

                    'secondary': '#00cc66',
                    'secondary-focus': '#00cc00',
                    'secondary-content': '#eeeeff',

                    'accent': '#d04988',
                    'accent-focus': '#d90368',
                    'accent-content': '#eeeeff',

                    'neutral': '#5f7992',
                    'neutral-focus': '#7f99a2',
                    'neutral-content': '#eeeeff',

                    'base-100': '#eeeeff',
                    'base-200': '#ddddee',
                    'base-300': '#ccccdd',
                    'base-content': '#222200',

                    'info': '#384fff',
                    'success': '#87cf3a',
                    'warning': '#ffb347',
                    'error': '#ff1a1a',

                    '--rounded-box': '0.25rem',
                    '--rounded-btn': '1.5rem',
                    '--rounded-badge': '0.1rem',

                    '--animation-btn': '0.25s',
                    '--animation-input': '0.2s',

                    '--navbar-padding': '.5rem',
                    '--border-btn': '1px',
                },

            },
        ],
    },

}
