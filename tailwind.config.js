import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3dccc7',
                    dark: '#68d8d6',
                },
                secondary: '#4CAF50',
                accent: '#FF6B6B',
                darker: '#0a0a0a',
                'light-bg': '#f5f5f5',
                'dark-bg': '#1c1c1c',
                'light-card': '#ffffff',
                'dark-card': '#2a2a2a',
                'light-border': '#cccccc',
                'dark-border': '#404040',
                'light-hover': '#f9fafb',
                'dark-hover': '#374151',
                'light-active': '#e7e6e6',
                'dark-active': '#34373b',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
