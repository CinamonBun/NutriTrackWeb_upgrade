import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function AppLayout({ children, showHeader = true, showFooter = true }) {
    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1c1c1c] text-black dark:text-white transition-colors duration-300">
            {showHeader && <Header />}
            <main>
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
