import React from 'react';
import AdminHeader from '@/Components/AdminHeader';
import { useTheme } from '@/Contexts/ThemeContext';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

const themeOptions = [
    { key: 'system', icon: 'system' },
    { key: 'light', icon: 'light' },
    { key: 'dark', icon: 'dark' },
];

function ThemeIcon({ type, isActive }) {
    const iconVariants = {
        initial: { scale: 0.6, opacity: 0, rotate: -90 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        exit: { scale: 0.6, opacity: 0, rotate: 90 },
    };

    const commonProps = {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: "1.5",
        stroke: "currentColor",
        className: "w-5 h-5",
    };

    if (type === 'system') {
        return (
            <svg {...commonProps}>
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
        );
    }

    if (type === 'light') {
        return (
            <motion.svg
                {...commonProps}
                animate={isActive ? { rotate: 180 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </motion.svg>
        );
    }

    // dark / moon
    return (
        <motion.svg
            {...commonProps}
            strokeWidth="2"
            animate={isActive ? { rotate: -20, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </motion.svg>
    );
}

export default function AuthenticatedLayout({ showHeader = true, children }) {
    const { theme, changeTheme } = useTheme();

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1c1c1c] text-black dark:text-white transition-colors duration-300">
            {showHeader && <AdminHeader />}
            <main>
                {children}
            </main>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-4">
                <motion.div 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
                    className="p-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] shadow-md transition-colors duration-300"
                >
                    <Link href="/settings" id="settings-btn"
                        className="flex items-center justify-center p-2 rounded-full transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.042c1.523-.878 3.25.848 2.372 2.372a1.724 1.724 0 001.042 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.042 2.591c.878 1.523-.849 3.25-2.372 2.372a1.724 1.724 0 00-2.591 1.042c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.591-1.042c-1.523.878-3.25-.849-2.372-2.372a1.724 1.724 0 00-1.042-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.042-2.591c-.878-1.524.849-3.25 2.372-2.372a1.724 1.724 0 002.591-1.042z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                </motion.div>

                <motion.div
                    id="theme-switcher"
                    className="flex flex-col p-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                >
                    {themeOptions.map((opt) => {
                        const isActive = theme === opt.key;
                        return (
                            <motion.button
                                key={opt.key}
                                id={`${opt.key}-btn`}
                                type="button"
                                onClick={() => changeTheme(opt.key)}
                                className="relative flex items-center justify-center p-2 rounded-full"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                style={{ opacity: isActive ? 1 : 0.5 }}
                            >
                                {/* Animated active background pill */}
                                {isActive && (
                                    <motion.span
                                        layoutId="theme-active-pill"
                                        className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    <ThemeIcon type={opt.icon} isActive={isActive} />
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
