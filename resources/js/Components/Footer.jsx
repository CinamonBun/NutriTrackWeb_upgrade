import React, { useState } from 'react';

export default function Footer({ theme, changeTheme }) {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [language, setLanguage] = useState('Language');

    return (
        <footer className="my-24 sm:py-24">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
                    <div className="space-y-4">
                        <a href="mailto:hi@nutritrack.com"
                            className="text-lg hover:underline block transition-all">hi@nutritrack.com</a>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#3dccc7] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-[#3dccc7] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-[#3dccc7] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium">Product</h4>
                        <ul className="mt-4 space-y-4 text-sm">
                            <li><a href="index.php" className="opacity-80 hover:opacity-100 transition-opacity">Home</a></li>
                            <li><a href="features.php" className="opacity-80 hover:opacity-100 transition-opacity">Features</a></li>
                            <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Download</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium">Company</h4>
                        <ul className="mt-4 space-y-4 text-sm">
                            <li><a href="4ever-young.php" className="opacity-80 hover:opacity-100 transition-opacity">4Ever Young</a></li>
                            <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Community</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium">What Our Users Say</h4>
                        <ul className="mt-4 space-y-4 text-sm">
                            <li><a href="riviews.php" className="opacity-80 hover:opacity-100 transition-opacity">Riviews</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="relative inline-block text-left w-full">
                            <div
                                id="dropdownMenu"
                                className={`${isLanguageOpen ? 'block' : 'hidden'} absolute bottom-full mb-2 left-0 w-full rounded-xl shadow-2xl focus:outline-none fade-in overflow-hidden bg-[#ffffff] text-black/70 dark:bg-[#2a2a2a] dark:text-white/70 border border-[#cccccc] dark:border-[#404040]`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="dropdownButton"
                            >
                                <div className="py-1" role="none">
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setLanguage('English'); setIsLanguageOpen(false); }}
                                        className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${language === 'English' ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
                                        role="menuitem"
                                    >
                                        English
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setLanguage('Bahasa Indonesia'); setIsLanguageOpen(false); }}
                                        className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${language === 'Bahasa Indonesia' ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
                                        role="menuitem"
                                    >
                                        Bahasa Indonesia
                                    </a>
                                </div>
                            </div>

                            <button
                                id="dropdownButton"
                                type="button"
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="inline-flex items-center justify-between w-full rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none transition-colors duration-200 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] text-black/60 dark:text-white/60"
                                aria-expanded={isLanguageOpen}
                                aria-haspopup="true"
                            >
                                {language}
                                <svg
                                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-0' : 'rotate-180'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex space-x-2">
                            <div id="theme-switcher" className="flex p-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] shadow-sm">
                                <button id="system-btn" onClick={() => changeTheme('system')}
                                    className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'system' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                    </svg>
                                </button>

                                <button id="light-btn" onClick={() => changeTheme('light')}
                                    className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                </button>

                                <button id="dark-btn" onClick={() => changeTheme('dark')}
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
                </div>

                <div className="mt-20 pt-20 text-gray-500 dark:text-gray-400 text-md">
                    <p>© 2025 Made By 4Ever Young</p>
                </div>
            </div>
        </footer>
    );
}
