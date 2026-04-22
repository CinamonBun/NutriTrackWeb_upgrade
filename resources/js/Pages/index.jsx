import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

export default function Index() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [theme, setTheme] = useState(localStorage.theme || 'system');
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [language, setLanguage] = useState('Language');

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.theme = newTheme;
    };
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        const root = window.document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme, isSticky]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <React.Fragment>



            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NutriTrack - Landing Page</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet" />
                <script src="https://kit.fontawesome.com/45b50d7995.js" crossorigin="anonymous"></script>
            </Head>

            <header id="sticky-header" className={`fixed z-50 w-full transition-all duration-300 ease-in-out ${isSticky ? 'py-3 bg-[#f5f5f5] text-black dark:bg-[#404040]/80 dark:text-white backdrop-blur-md shadow-md' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="relative flex justify-between items-center">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold">NutriTrack+</h1>
                        </div>
                        <ul className="hidden md:flex items-center space-x-8">
                            <li><a href="index.php" className="transition duration-200 transform">Home</a></li>
                            <li><a href="about.php" className="transition duration-200 transform">About Us</a></li>
                            <li><a href="features.php"
                                className="transition duration-200 transform">Features</a>
                            </li>
                            <li><a href="riviews.php" className="transition duration-200 transform">Riviews</a></li>
                            <li><a href="#" className="transition duration-200 transform">Download</a></li>
                        </ul>
                        <div className="hidden md:flex items-center space-x-3">
                            <a href="signin.php"
                                className="whitespace-nowrap transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none">
                                Sign In
                            </a>
                            <a href="signup.php"
                                className="inline-flex justify-center gap-2 text-white bg-[#3dccc7] hover:bg-[#68d8d6] px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                Sign Up
                            </a>
                        </div>
                        <div className="md:hidden">
                            <button id="menu-toggle-btn" onClick={toggleMenu} type="button" aria-expanded={isMenuOpen} aria-controls="mobile-menu"
                                aria-label="Toggle navigation" className="p-2 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3dccc7]">
                                <svg id="menu-icon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                    <div id="mobile-menu" className={`md:hidden mt-3 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="mobile-menu-panel card shadow-lg rounded-xl p-6 space-y-4">
                            <div className="flex flex-col space-y-3">
                                <a href="index.php" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Home</a>
                                <a href="about.php" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">About Us</a>
                                <a href="features.php" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Features</a>
                                <a href="riviews.php" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Riviews</a>
                                <a href="#" className="block text-base font-medium transition-colors duration-200 hover:text-[#3dccc7]">Download</a>
                            </div>
                            <div className="flex flex-col gap-3 py-3 border-t border-neutral-200 dark:border-neutral-700">
                                <a href="signin.php"
                                    className="inline-flex justify-center items-center gap-2 text-sm font-medium rounded-md py-2 px-4 card transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3dccc7]">Sign
                                    In</a>
                                <a href="signup.php"
                                    className="inline-flex justify-center items-center gap-2 text-sm font-medium rounded-md py-2 px-4 text-white bg-[#3dccc7] hover:bg-[#68d8d6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3dccc7]">Sign
                                    Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


            <main>

                <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-[6%] overflow-hidden pt-32 lg:pt-24 pb-16 lg:pb-32">

                    <div className="hidden md:block absolute top-0 right-0 md:w-[380px] md:h-[380px] lg:w-[600px] lg:h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="hidden md:block absolute bottom-0 left-0 md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full card text-sm text-primary mb-6 animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                New Feature: Chat Bot AI
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                                Mulai <span className="gradient-text">Gaya Hidup</span> <br /> Lebih Sehat.
                            </h1>

                            <p className="text-lg md:text-xl opacity-60 dark:opacity-70 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                                Pantau kalori, nutrisi, dan aktivitas harianmu dalam satu aplikasi cerdas. Data akurat untuk hasil yang nyata.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                                <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.3)]">
                                    <i className="fab fa-google-play"></i>
                                    <span>Google Play</span>
                                </a>
                                <a href="#" className="inline-flex items-center justify-center gap-2 card opacity-80 px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1">
                                    <i className="fab fa-apple"></i>
                                    <span>App Store</span>
                                </a>
                            </div>
                        </div>

                        <div className="flex-1 relative flex justify-center items-center perspective-container">

                            <div className="absolute top-[20%] -left-[5%] z-20 glass-card p-4 rounded-2xl animate-float-delayed hidden md:block w-40">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                                        <i className="fas fa-fire text-sm"></i>
                                    </div>
                                    <span className="text-xs opacity-90 font-semibold">Burned</span>
                                </div>
                                <div className="text-xl font-bold">840 <span className="text-xs font-normal opacity-70">kcal</span></div>
                                <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-orange-500 w-[70%]"></div>
                                </div>
                            </div>

                            <div className="absolute bottom-[25%] -right-[5%] z-20 glass-card p-4 rounded-2xl animate-float hidden md:block w-40">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                        <i className="fas fa-heartbeat text-sm"></i>
                                    </div>
                                    <span className="text-xs opacity-90 font-semibold">Heart Rate</span>
                                </div>
                                <div className="text-xl font-bold">98 <span className="text-xs font-normal opacity-70">bpm</span></div>
                                <div className="mt-2 flex gap-1 items-end h-6 opacity-50">
                                    <div className="w-1 bg-red-500 h-[40%] rounded-sm"></div>
                                    <div className="w-1 bg-red-500 h-[70%] rounded-sm"></div>
                                    <div className="w-1 bg-red-500 h-[50%] rounded-sm"></div>
                                    <div className="w-1 bg-red-500 h-[100%] rounded-sm"></div>
                                    <div className="w-1 bg-red-500 h-[60%] rounded-sm"></div>
                                </div>
                            </div>

                            <div className="phone-container relative w-[300px] h-[600px] bg-[#151515] rounded-[45px] shadow-[0_0_0_8px_#252525,0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#252525] rounded-b-2xl z-30"></div>

                                <div className="w-full h-full bg-gradient p-6 pt-12 flex flex-col relative">

                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <p className="opacity-70 text-xs">Hello, Alex</p>
                                            <h3 className="font-bold text-lg">Daily Progress</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <img src="assets/me.png" alt="User" className="w-8 h-8" />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl card mb-4">
                                        <div className="flex justify-between items-end h-[100px] gap-2 mb-2">
                                            <div className="w-full bg-primary/20 rounded-t-md relative group h-[40%] hover:bg-primary/40 transition-all"></div>
                                            <div className="w-full bg-primary/20 rounded-t-md relative group h-[60%] hover:bg-primary/40 transition-all"></div>
                                            <div className="w-full bg-primary rounded-t-md relative group h-[85%] shadow-[0_0_20px_rgba(61,204,199,0.4)]"></div>
                                            <div className="w-full bg-primary/20 rounded-t-md relative group h-[50%] hover:bg-primary/40 transition-all"></div>
                                            <div className="w-full bg-primary/20 rounded-t-md relative group h-[70%] hover:bg-primary/40 transition-all"></div>
                                        </div>
                                        <p className="text-center text-xs opacity-60 dark:opacity-70 mt-2">Calories Intake vs Goal</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-xl card">
                                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                                                <i className="fas fa-apple-alt"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold">Breakfast</h4>
                                                <p className="text-xs opacity-60 dark:opacity-70">Oatmeal & Berries</p>
                                            </div>
                                            <span className="text-sm font-bold">320</span>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl card">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                                                <i className="fas fa-glass-whiskey"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold">Hydration</h4>
                                                <p className="text-xs opacity-60 dark:opacity-70">6/8 Glasses</p>
                                            </div>
                                            <span className="text-sm font-bold">75%</span>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl card">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                                                <i className="fas fa-running"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold">Evening Run</h4>
                                                <p className="text-xs opacity-60 dark:opacity-70">Scheduled 6:00 PM</p>
                                            </div>
                                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Soon</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex justify-between opacity-60 dark:opacity-70 pt-4 border-t">
                                        <i className="fas fa-home text-primary"></i>
                                        <i className="fas fa-chart-bar hover:text-primary transition"></i>
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center -mt-8 shadow-lg text-white border-2 border-primary">
                                            <i className="fas fa-plus"></i>
                                        </div>
                                        <i className="fas fa-book hover:text-primary transition"></i>
                                        <i className="fas fa-user hover:text-primary transition"></i>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="relative text-center py-16 sm:py-32 overflow-hidden ">
                    <div className="relative z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-6 md:mb-0">
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                    Why NutriTrack ?
                                </h2>
                                <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-xl mx-auto">
                                    Get expert nutritional guidance and personalized meal plans specifically for your journey.
                                </p>
                            </div>

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mt-12 max-w-6xl mx-auto rounded-lg shadow-md card hover:border-[#0F9E99] overflow-hidden">
                                    <div className="grid md:grid-cols-2 gap-0">

                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="space-y-6">

                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <i className="fas fa-brain text-primary text-xl"></i>
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="font-semibold text-lg mb-1">Smart AI Recommendations</h3>
                                                        <p className="opacity-60 dark:opacity-70 text-sm">Dapatkan rekomendasi makanan cerdas berdasarkan kebutuhan nutrisi dan preferensi Anda dengan teknologi AI.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <i className="fas fa-chart-pie text-secondary text-xl"></i>
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="font-semibold text-lg mb-1">Detailed Analytics</h3>
                                                        <p className="opacity-60 dark:opacity-70 text-sm">Visualisasi lengkap dari asupan nutrisi harian, mingguan, dan bulanan dalam grafik yang mudah dipahami.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <i className="fas fa-users text-accent text-xl"></i>
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="font-semibold text-lg mb-1">Community Support</h3>
                                                        <p className="opacity-60 dark:opacity-70 text-sm">Bergabung dengan komunitas pengguna yang saling mendukung dalam perjalanan hidup sehat mereka.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-[#FFC107]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <i className="fas fa-shield-alt text-[#FFC107] text-xl"></i>
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="font-semibold text-lg mb-1">Data Security</h3>
                                                        <p className="opacity-60 dark:opacity-70 text-sm">Data kesehatan Anda tersimpan aman dengan enkripsi tingkat tinggi dan privasi terjaga.</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 flex items-center justify-center">
                                            <div className="relative w-full max-w-sm">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>

                                                <div className="relative card rounded-2xl p-6 shadow-xl">
                                                    <div className="text-center mb-6">
                                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                                                            <i className="fas fa-star text-white text-2xl"></i>
                                                        </div>
                                                        <h4 className="font-bold text-2xl mb-2">10,000+</h4>
                                                        <p className="opacity-80">Happy Users</p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between card p-3 rounded-xl">
                                                            <span className="text-sm">User Rating</span>
                                                            <div className="flex items-center gap-1">
                                                                <i className="fas fa-star text-[#FFC107] text-xs"></i>
                                                                <span className="font-semibold">4.8</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between card p-3 rounded-xl">
                                                            <span className="text-sm">Meals Tracked</span>
                                                            <span className="font-semibold">500K+</span>
                                                        </div>

                                                        <div className="flex items-center justify-between card p-3 rounded-xl">
                                                            <span className="text-sm">Success Rate</span>
                                                            <span className="font-semibold text-primary">92%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">

                    <section className="py-16 sm:py-24">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16">
                                <div className="text-center md:text-left mb-6 md:mb-0">
                                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                        See NutriTrack in Action</h2>
                                    <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-xl">
                                        Dive into our core functionalities tailored for your goals.
                                    </p>
                                </div>
                                <a href="#"
                                    className="text-white px-6 py-3 rounded-lg font-medium bg-[#3dccc7] hover:bg-[#68d8d6] transition-colors duration-200">
                                    See more features
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                                <div className="rounded-lg shadow-md card hover:border-[#0F9E99] p-6 flex flex-col h-full">
                                    <div className="mb-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                                            <i className="fas fa-camera text-primary text-3xl"></i>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Scan Makanan</h3>
                                        <p className="opacity-60 dark:opacity-70 text-sm mb-4">Foto makananmu dan AI kami akan mengidentifikasi serta menghitung nutrisinya secara otomatis.</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="card rounded-lg p-4 bg-gradient-to-br from-primary/5 to-transparent">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                                                <div className="flex-1">
                                                    <div className="h-3 bg-primary/20 rounded w-3/4 mb-2"></div>
                                                    <div className="h-2 bg-primary/10 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 h-8 bg-primary/20 rounded"></div>
                                                <div className="flex-1 h-8 bg-primary/20 rounded"></div>
                                                <div className="flex-1 h-8 bg-primary/20 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="rounded-lg shadow-md card hover:border-[#0F9E99] p-6 flex flex-col h-full">
                                    <div className="mb-4">
                                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                                            <i className="fas fa-chart-line text-secondary text-3xl"></i>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                                        <p className="opacity-60 dark:opacity-70 text-sm mb-4">Monitor perkembangan berat badan, kalori, dan nutrisi dengan grafik yang detail dan mudah dipahami.</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="card rounded-lg p-4 bg-gradient-to-br from-secondary/5 to-transparent">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs opacity-80">Protein</span>
                                                    <span className="text-xs font-semibold">75%</span>
                                                </div>
                                                <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs opacity-80">Karbo</span>
                                                    <span className="text-xs font-semibold">60%</span>
                                                </div>
                                                <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-secondary w-3/5 rounded-full"></div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs opacity-80">Lemak</span>
                                                    <span className="text-xs font-semibold">85%</span>
                                                </div>
                                                <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-secondary w-5/6 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="rounded-lg shadow-md card hover:border-[#0F9E99] p-6 flex flex-col h-full">
                                    <div className="mb-4">
                                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                                            <i className="fas fa-book-open text-accent text-3xl"></i>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Meal Planning</h3>
                                        <p className="opacity-60 dark:opacity-70 text-sm mb-4">Rencanakan menu makanan mingguan dengan rekomendasi resep sehat yang disesuaikan dengan kebutuhanmu.</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="card rounded-lg p-4 bg-gradient-to-br from-accent/5 to-transparent">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 p-2 bg-accent/10 rounded-lg">
                                                    <div className="w-8 h-8 bg-accent/20 rounded"></div>
                                                    <div className="flex-1">
                                                        <div className="h-2 bg-accent/30 rounded w-3/4 mb-1"></div>
                                                        <div className="h-2 bg-accent/20 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-2 bg-accent/10 rounded-lg">
                                                    <div className="w-8 h-8 bg-accent/20 rounded"></div>
                                                    <div className="flex-1">
                                                        <div className="h-2 bg-accent/30 rounded w-3/4 mb-1"></div>
                                                        <div className="h-2 bg-accent/20 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-2 bg-accent/10 rounded-lg">
                                                    <div className="w-8 h-8 bg-accent/20 rounded"></div>
                                                    <div className="flex-1">
                                                        <div className="h-2 bg-accent/30 rounded w-3/4 mb-1"></div>
                                                        <div className="h-2 bg-accent/20 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-16 sm:py-24">

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-6">
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Reviews</h2>
                                <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-xl mx-auto">
                                    What are they saying about us?
                                </p>
                            </div>
                            <div className="relative mt-12 max-w-6xl mx-auto overflow-hidden rounded-lg h-[550px]">
                                <div className="absolute inset-x-0 top-0 h-16 pointer-events-none fade-top z-10">
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none fade-bottom z-10">
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">


                                    <div className="marquee-col h-full overflow-y-hidden">
                                        <div className="marquee-track reverse px-2 py-4">
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/34373b/ffffff?text=A"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Sarah K.</div>
                                                        <div className="text-xs">@sarahk</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">NutriTrack changed my life!
                                                    So easy to track meals.</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/f87171/ffffff?text=B"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Mike T.</div>
                                                        <div className="text-xs">@miket</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Best nutrition app I've
                                                    ever used. Highly recommend!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/34d399/ffffff?text=C"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Lina R.</div>
                                                        <div className="text-xs">@linar</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Love the personalized meal
                                                    plans. So accurate!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/a78bfa/ffffff?text=D"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">James L.</div>
                                                        <div className="text-xs">@jamesl</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Perfect for my fitness
                                                    journey. Thank you!</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/34373b/ffffff?text=A"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Sarah K.</div>
                                                        <div className="text-xs">@sarahk</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">NutriTrack changed my life!
                                                    So easy to track meals.</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/f87171/ffffff?text=B"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Mike T.</div>
                                                        <div className="text-xs">@miket</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Best nutrition app I've
                                                    ever used. Highly recommend!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/34d399/ffffff?text=C"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Lina R.</div>
                                                        <div className="text-xs">@linar</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Love the personalized meal
                                                    plans. So accurate!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/a78bfa/ffffff?text=D"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">James L.</div>
                                                        <div className="text-xs">@jamesl</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Perfect for my fitness
                                                    journey. Thank you!</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="marquee-col h-full overflow-y-hidden">
                                        <div className="marquee-track px-2 py-4">
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/60a5fa/ffffff?text=E"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Emma W.</div>
                                                        <div className="text-xs">@emmaw</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">So intuitive and beautiful
                                                    UI. Love it!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/fbbf24/ffffff?text=F"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">David H.</div>
                                                        <div className="text-xs">@davidh</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Helped me lose 10kg in 3
                                                    months. Amazing!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/ec4899/ffffff?text=G"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Anna P.</div>
                                                        <div className="text-xs">@annap</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">The calorie tracker is spot
                                                    on. Great job!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/8b5cf6/ffffff?text=H"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Tom B.</div>
                                                        <div className="text-xs">@tomb</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Worth every penny. Best
                                                    health app ever.</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/60a5fa/ffffff?text=E"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Emma W.</div>
                                                        <div className="text-xs">@emmaw</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">So intuitive and beautiful
                                                    UI. Love it!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/fbbf24/ffffff?text=F"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">David H.</div>
                                                        <div className="text-xs">@davidh</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Helped me lose 10kg in 3
                                                    months. Amazing!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/ec4899/ffffff?text=G"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Anna P.</div>
                                                        <div className="text-xs">@annap</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">The calorie tracker is spot
                                                    on. Great job!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/8b5cf6/ffffff?text=H"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Tom B.</div>
                                                        <div className="text-xs">@tomb</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Worth every penny. Best
                                                    health app ever.</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="marquee-col h-full overflow-y-hidden hidden lg:block">
                                        <div className="marquee-track reverse px-2 py-4">
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/10b981/ffffff?text=I"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Chris M.</div>
                                                        <div className="text-xs">@chrism</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Game changer for my diet.
                                                    Thank you!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/f43f5e/ffffff?text=J"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Nina S.</div>
                                                        <div className="text-xs">@ninas</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">So easy to use. I track
                                                    everything now.</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/10b981/ffffff?text=I"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Chris M.</div>
                                                        <div className="text-xs">@chrism</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Game changer for my diet.
                                                    Thank you!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/f43f5e/ffffff?text=J"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Nina S.</div>
                                                        <div className="text-xs">@ninas</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">So easy to use. I track
                                                    everything now.</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/34373b/ffffff?text=A"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Sarah K.</div>
                                                        <div className="text-xs">@sarahk</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">NutriTrack changed my life!
                                                    So easy to track meals.</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/f87171/ffffff?text=B"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Mike T.</div>
                                                        <div className="text-xs">@miket</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Best nutrition app I've
                                                    ever used. Highly recommend!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/34d399/ffffff?text=C"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Lina R.</div>
                                                        <div className="text-xs">@linar</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Love the personalized meal
                                                    plans. So accurate!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/a78bfa/ffffff?text=D"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">James L.</div>
                                                        <div className="text-xs">@jamesl</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Perfect for my fitness
                                                    journey. Thank you!</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="marquee-col h-full overflow-y-hidden hidden lg:block">
                                        <div className="marquee-track px-2 py-4">
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/0ea5e9/ffffff?text=K"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Ali R.</div>
                                                        <div className="text-xs">@alir</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Perfect for busy people
                                                    like me!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/84cc16/ffffff?text=L"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Maya T.</div>
                                                        <div className="text-xs">@mayat</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Love the clean design and
                                                    accuracy.</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/0ea5e9/ffffff?text=K"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Ali R.</div>
                                                        <div className="text-xs">@alir</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Perfect for busy people
                                                    like me!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/84cc16/ffffff?text=L"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Maya T.</div>
                                                        <div className="text-xs">@mayat</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Love the clean design and
                                                    accuracy.</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/60a5fa/ffffff?text=E"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Emma W.</div>
                                                        <div className="text-xs">@emmaw</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">So intuitive and beautiful
                                                    UI. Love it!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/fbbf24/ffffff?text=F"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">David H.</div>
                                                        <div className="text-xs">@davidh</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Helped me lose 10kg in 3
                                                    months. Amazing!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/ec4899/ffffff?text=G"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Anna P.</div>
                                                        <div className="text-xs">@annap</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">The calorie tracker is spot
                                                    on. Great job!</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-lg shadow-md card hover:border-[#0F9E99]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src="https://placehold.co/40x40/8b5cf6/ffffff?text=H"
                                                        className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="font-medium">Tom B.</div>
                                                        <div className="text-xs">@tomb</div>
                                                    </div>
                                                </div>
                                                <p className="text-sm">Worth every penny. Best
                                                    health app ever.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>


            <footer className="my-24 sm:py-24 ">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
                        <div className="space-y-4">
                            <a href="mailto:hi@nutritrack.com"
                                className="text-lg hover:underline block">hi@nutritrack.com</a>
                            <div className="flex space-x-4">
                                <a href="#" className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                        stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </a>
                                <a href="#" className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                        stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                </a>
                                <a href="#" className="">
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
                                <li><a href="index.php" className="opacity-80">Home</a>
                                </li>
                                <li><a href="features.php" className="opacity-80">Features</a>
                                </li>
                                <li><a href="#" className="opacity-80">Download</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-medium">Company</h4>
                            <ul className="mt-4 space-y-4 text-sm">
                                <li><a href="4ever-young.php" className="opacity-80">4Ever
                                    Young</a></li>
                                <li><a href="#" className="opacity-80">Community</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-medium">What Our Users Say</h4>
                            <ul className="mt-4 space-y-4 text-sm">
                                <li><a href="riviews.php" className="opacity-80">Riviews</a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <div className="relative inline-block text-left w-full">
                                {/* Dropdown menu — opens UPWARD */}
                                <div
                                    id="dropdownMenu"
                                    className={`${isLanguageOpen ? 'block' : 'hidden'} absolute bottom-full mb-2 left-0 w-full rounded-xl shadow-2xl focus:outline-none fade-in overflow-hidden bg-[#ffffff] text-black dark:bg-[#2a2a2a] dark:text-white border border-[#cccccc] dark:border-[#404040]`}
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

                                {/* Trigger button */}
                                <button
                                    id="dropdownButton"
                                    type="button"
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    className="inline-flex items-center justify-between w-full rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none transition-colors duration-200 bg-[#ffffff] text-black dark:bg-[#2a2a2a] dark:text-white border border-[#cccccc] dark:border-[#404040]"
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
                                <div id="theme-switcher" className="flex p-1 rounded-full card shadow-sm">
                                    <button id="system-btn" onClick={() => changeTheme('system')}
                                        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 opacity-50 ${theme === 'system' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                        </svg>
                                    </button>

                                    <button id="light-btn" onClick={() => changeTheme('light')}
                                        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 opacity-50 ${theme === 'light' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                    </button>

                                    <button id="dark-btn" onClick={() => changeTheme('dark')}
                                        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 opacity-50 ${theme === 'dark' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
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

                    <div className="mt-20 pt-20 dark:text-gray-400 text-md">
                        <p>© 2025 Made By 4Ever Young</p>
                    </div>
                </div>
            </footer>

        </React.Fragment>
    );
}
