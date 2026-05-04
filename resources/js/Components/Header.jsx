import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header id="sticky-header" className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${isSticky ? 'py-3 bg-[#ffffff]/80 text-black dark:bg-[#2a2a2a]/80 dark:text-white backdrop-blur-lg shadow-sm' : 'py-5 lg:py-6 bg-transparent text-black dark:text-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="relative flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-2xl font-bold">NutriTrack+</h1>
                        {user && (
                            <div className="hidden md:flex items-center space-x-4 border-l border-neutral-300 dark:border-neutral-600 pl-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium">{user.name}</span>
                                </div>
                                <Link href="/logout" method="post" as="button"
                                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                    <ul className="hidden md:flex items-center space-x-8">
                        <li><Link href="/" className="transform transition-colors hover:text-[#3dccc7]">Home</Link></li>
                        <li><Link href="/about" className="transform transition-colors hover:text-[#3dccc7]">About Us</Link></li>
                        <li><Link href="/features" className="transform transition-colors hover:text-[#3dccc7]">Features</Link></li>
                        <li><Link href="/riviews" className="transform transition-colors hover:text-[#3dccc7]">Riviews</Link></li>
                        <li><Link href="#" className="transform transition-colors hover:text-[#3dccc7]">Download</Link></li>
                    </ul>
                    <div className="hidden md:flex items-center space-x-3">
                        {!user && (
                            <>
                                <Link href="/signin"
                                    className="whitespace-nowrap transition duration-200 hover:text-[#3dccc7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none">
                                    Sign In
                                </Link>
                                <Link href="/signup"
                                    className="inline-flex justify-center gap-2 text-white bg-[#3dccc7] hover:bg-[#68d8d6] px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button id="menu-toggle-btn" onClick={toggleMenu} type="button" aria-expanded={isMenuOpen} aria-controls="mobile-menu"
                            aria-label="Toggle navigation" className="p-2 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3dccc7]">
                            <svg id="menu-icon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </nav>
                <div id="mobile-menu" className={`md:hidden mt-3 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="mobile-menu-panel bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 shadow-lg rounded-xl p-6 space-y-4">
                        <div className="flex flex-col space-y-3">
                            <Link href="/" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Home</Link>
                            <Link href="/about" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">About Us</Link>
                            <Link href="/features" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Features</Link>
                            <Link href="/riviews" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Riviews</Link>
                            <Link href="/" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Download</Link>
                        </div>
                        <div className="flex flex-col gap-3 py-3 border-t border-neutral-200 dark:border-neutral-700">
                            <Link href="/signin"
                                className="inline-flex justify-center items-center gap-2 text-sm font-medium rounded-md py-2 px-4 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 hover:text-[#3dccc7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3dccc7]">Sign In</Link>
                            <Link href="/signup"
                                className="inline-flex justify-center items-center gap-2 text-sm font-medium rounded-md py-2 px-4 text-white bg-[#3dccc7] hover:bg-[#68d8d6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3dccc7]">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
