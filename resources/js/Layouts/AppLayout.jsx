import React, { useState, useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function AppLayout({ children, showHeader = true, showFooter = true }) {
    const [theme, setTheme] = useState(localStorage.theme || 'system');

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.theme = newTheme;
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1c1c1c] text-black dark:text-white transition-colors duration-300">
            {showHeader && <Header />}
            <main>
                {children}
            </main>
            {showFooter && <Footer theme={theme} changeTheme={changeTheme} />}
        </div>
    );
}
