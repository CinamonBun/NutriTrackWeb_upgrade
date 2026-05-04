import React from 'react';
import AdminHeader from '@/Components/AdminHeader';

export default function AuthenticatedLayout({ showHeader = true, children }) {
    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1c1c1c] text-black dark:text-white transition-colors duration-300">
            {showHeader && <AdminHeader />}
            <main>
                {children}
            </main>
        </div>
    );
}
