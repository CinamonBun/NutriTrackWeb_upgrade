import React from 'react';
import AdminHeader from '@/Components/AdminHeader';
import { useTheme } from '@/Contexts/ThemeContext';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ showHeader = true, children }) {
    const { theme, changeTheme } = useTheme();

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1c1c1c] text-black dark:text-white transition-colors duration-300">
            {showHeader && <AdminHeader />}
            <main>
                {children}
            </main>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-4">
                <div className="p-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] shadow-md transition-all duration-300">
                    <Link href="/settings" id="settings-btn"
                        className="flex items-center justify-center p-2 rounded-full transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.042c1.523-.878 3.25.848 2.372 2.372a1.724 1.724 0 001.042 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.042 2.591c.878 1.523-.849 3.25-2.372 2.372a1.724 1.724 0 00-2.591 1.042c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.591-1.042c-1.523.878-3.25-.849-2.372-2.372a1.724 1.724 0 00-1.042-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.042-2.591c-.878-1.524.849-3.25 2.372-2.372a1.724 1.724 0 002.591-1.042z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                </div>

                <div
                    id="theme-switcher"
                    className="flex flex-col p-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] shadow-sm"
                >
                    <button id="system-btn" type="button" onClick={() => changeTheme('system')}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'system' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                        </svg>
                    </button>

                    <button id="light-btn" type="button" onClick={() => changeTheme('light')}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    </button>

                    <button id="dark-btn" type="button" onClick={() => changeTheme('dark')}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
