import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const reviews = [
    { name: 'Sarah K.', handle: '@sarahk', text: 'NutriTrack changed my life! So easy to track meals.', color: '34373b' },
    { name: 'Mike T.', handle: '@miket', text: "Best nutrition app I've ever used. Highly recommend!", color: 'f87171' },
    { name: 'Lina R.', handle: '@linar', text: 'Love the personalized meal plans. So accurate!', color: '34d399' },
    { name: 'James L.', handle: '@jamesl', text: 'Perfect for my fitness journey. Thank you!', color: 'a78bfa' },
    { name: 'Emma W.', handle: '@emmaw', text: 'So intuitive and beautiful UI. Love it!', color: '60a5fa' },
    { name: 'David H.', handle: '@davidh', text: 'Helped me lose 10kg in 3 months. Amazing!', color: 'fbbf24' },
    { name: 'Anna P.', handle: '@annap', text: 'The calorie tracker is spot on. Great job!', color: 'ec4899' },
    { name: 'Tom B.', handle: '@tomb', text: 'Worth every penny. Best health app ever.', color: '8b5cf6' },
];

export default function Index() {
    return (
        <AppLayout>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NutriTrack - Landing Page</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet" />
                <script src="https://kit.fontawesome.com/45b50d7995.js" crossOrigin="anonymous"></script>
            </Head>

            <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-[6%] overflow-hidden pt-32 lg:pt-24 pb-16 lg:pb-32">
                <div className="hidden md:block absolute top-0 right-0 md:w-[380px] md:h-[380px] lg:w-[600px] lg:h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="hidden md:block absolute bottom-0 left-0 md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="flex-1 text-center lg:text-left"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 text-sm text-primary mb-6 animate-pulse"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            New Feature: Chat Bot AI
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-gray-200"
                        >
                            Mulai <span className="gradient-text">Gaya Hidup</span> <br /> Lebih Sehat.
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
                        >
                            Pantau kalori, nutrisi, dan aktivitas harianmu dalam satu aplikasi cerdas. Data akurat untuk hasil yang nyata.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                        >
                            <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.3)]">
                                <i className="fab fa-google-play"></i>
                                <span>Google Play</span>
                            </a>
                            <a href="#" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] opacity-80 px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 ease-in-out hover:opacity-100 hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.15)]">
                                <i className="fab fa-apple"></i>
                                <span>App Store</span>
                            </a>
                        </motion.div>
                    </motion.div>

                    <div className="flex-1 relative flex justify-center items-center perspective-container">
                        <div className="absolute top-[20%] -left-[5%] z-20 bg-white/40 dark:bg-[#2a2a2a]/10 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-colors duration-300 p-4 rounded-2xl animate-float-delayed hidden md:block w-40">
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

                        <div className="absolute bottom-[25%] -right-[5%] z-20 bg-white/40 dark:bg-[#2a2a2a]/10 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-colors duration-300 p-4 rounded-2xl animate-float hidden md:block w-40">
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

                        <div className="phone-container relative w-[300px] h-[600px] bg-[#ffffff] dark:bg-[#212121] text-black dark:text-white rounded-[45px] shadow-[0_0_0_8px_#252525,0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#252525] rounded-b-2xl z-30"></div>

                            <div className="w-full h-full p-6 pt-12 flex flex-col relative">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <p className="opacity-70 text-xs">Hello, Alex</p>
                                        <h3 className="font-bold text-lg">Daily Progress</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <img src="assets/me.png" alt="User" className="w-8 h-8" />
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 mb-4">
                                    <div className="flex justify-between items-end h-[100px] gap-2 mb-2">
                                        <div className="w-full bg-primary/20 rounded-t-md relative group h-[40%] hover:bg-primary/40 transition-all"></div>
                                        <div className="w-full bg-primary/20 rounded-t-md relative group h-[60%] hover:bg-primary/40 transition-all"></div>
                                        <div className="w-full bg-primary rounded-t-md relative group h-[85%] shadow-[0_0_20px_rgba(61,204,199,0.4)]"></div>
                                        <div className="w-full bg-primary/20 rounded-t-md relative group h-[50%] hover:bg-primary/40 transition-all"></div>
                                        <div className="w-full bg-primary/20 rounded-t-md relative group h-[70%] hover:bg-primary/40 transition-all"></div>
                                    </div>
                                    <p className="text-center text-xs opacity-60 dark:opacity-70 mt-2">Calories Intake vs Goal</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300">
                                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                                            <i className="fas fa-apple-alt"></i>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold">Breakfast</h4>
                                            <p className="text-xs opacity-60 dark:opacity-70">Oatmeal & Berries</p>
                                        </div>
                                        <span className="text-sm font-bold">320</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                                            <i className="fas fa-glass-whiskey"></i>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold">Hydration</h4>
                                            <p className="text-xs opacity-60 dark:opacity-70">6/8 Glasses</p>
                                        </div>
                                        <span className="text-sm font-bold">75%</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300">
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

                                <div className="mt-auto flex justify-between border-[#676d77] dark:border-[#ffffff] pt-4 border-t">
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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="text-center mb-6 md:mb-0">
                            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight opacity-90">Why NutriTrack ?</h2>
                            <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-xl mx-auto">
                                Get expert nutritional guidance and personalized meal plans specifically for your journey.
                            </p>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mt-12 max-w-6xl mx-auto rounded-lg shadow-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] overflow-hidden group">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="initial"
                                            whileInView="animate"
                                            viewport={{ once: true }}
                                            className="space-y-6"
                                        >
                                            <motion.div variants={fadeInUp} className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <i className="fas fa-brain text-primary text-xl"></i>
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-lg mb-1">Smart AI Recommendations</h3>
                                                    <p className="opacity-60 dark:opacity-70 text-sm">Dapatkan rekomendasi makanan cerdas berdasarkan kebutuhan nutrisi dan preferensi Anda dengan teknologi AI.</p>
                                                </div>
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <i className="fas fa-chart-pie text-secondary text-xl"></i>
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-lg mb-1">Detailed Analytics</h3>
                                                    <p className="opacity-60 dark:opacity-70 text-sm">Visualisasi lengkap dari asupan nutrisi harian, mingguan, dan bulanan dalam grafik yang mudah dipahami.</p>
                                                </div>
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <i className="fas fa-users text-accent text-xl"></i>
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-lg mb-1">Community Support</h3>
                                                    <p className="opacity-60 dark:opacity-70 text-sm">Bergabung dengan komunitas pengguna yang saling mendukung dalam perjalanan hidup sehat mereka.</p>
                                                </div>
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <i className="fas fa-shield-alt text-[#FFC107] text-xl"></i>
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-lg mb-1">Data Security</h3>
                                                    <p className="opacity-60 dark:opacity-70 text-sm">Data kesehatan Anda tersimpan aman dengan enkripsi tingkat tinggi dan privasi terjaga.</p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    <div className=" p-8 md:p-12 flex items-center justify-center">
                                        <div className="relative w-full max-w-sm">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl transition-transform duration-700 ease-in-out group-hover:scale-150 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl transition-transform duration-700 ease-in-out group-hover:scale-150 group-hover:-translate-x-4 group-hover:translate-y-4"></div>

                                            <div className="relative bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] rounded-2xl p-6 shadow-xl">
                                                <div className="text-center mb-6">
                                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                                                        <i className="fas fa-star text-white text-2xl"></i>
                                                    </div>
                                                    <h4 className="font-bold text-2xl mb-2">10,000+</h4>
                                                    <p className="opacity-80">Happy Users</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary p-3 rounded-xl">
                                                        <span className="text-sm">User Rating</span>
                                                        <div className="flex items-center gap-1">
                                                            <i className="fas fa-star text-[#FFC107] text-xs"></i>
                                                            <span className="font-semibold">4.8</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary p-3 rounded-xl">
                                                        <span className="text-sm">Meals Tracked</span>
                                                        <span className="font-semibold">500K+</span>
                                                    </div>

                                                    <div className="flex items-center justify-between bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary p-3 rounded-xl">
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
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">

                <section className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16"
                        >
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">See NutriTrack in Action</h2>
                                <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-xl">
                                    Dive into our core functionalities tailored for your goals.
                                </p>
                            </div>
                            <a href="#"
                                className="text-white px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary-dark transition-all hover:-translate-y-1 duration-300 hover:shadow-[0_10px_20px_rgba(61,204,199,0.3)]">
                                See more features
                            </a>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                        >
                            <motion.div variants={fadeInUp} className="rounded-lg shadow-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                                        <i className="fas fa-camera text-primary text-3xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Scan Makanan</h3>
                                    <p className="opacity-60 dark:opacity-70 text-sm mb-4">Foto makananmu dan AI kami akan mengidentifikasi serta menghitung nutrisinya secara otomatis.</p>
                                </div>
                                <div className="mt-auto">
                                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 rounded-lg p-4 bg-gradient-to-br from-primary/5 to-transparent">
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
                            </motion.div>

                            <motion.div variants={fadeInUp} className="rounded-lg shadow-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                                        <i className="fas fa-chart-line text-secondary text-3xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                                    <p className="opacity-60 dark:opacity-70 text-sm mb-4">Monitor perkembangan berat badan, kalori, dan nutrisi dengan grafik yang detail dan mudah dipahami.</p>
                                </div>
                                <div className="mt-auto">
                                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 rounded-lg p-4 bg-gradient-to-br from-secondary/5 to-transparent">
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
                            </motion.div>

                            <motion.div variants={fadeInUp} className="rounded-lg shadow-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                                        <i className="fas fa-book-open text-accent text-3xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Meal Planning</h3>
                                    <p className="opacity-60 dark:opacity-70 text-sm mb-4">Rencanakan menu makanan mingguan dengan rekomendasi resep sehat yang disesuaikan dengan kebutuhanmu.</p>
                                </div>
                                <div className="mt-auto">
                                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-colors duration-300 rounded-lg p-4 bg-gradient-to-br from-accent/5 to-transparent">
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
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Reviews</h2>
                            <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-xl mx-auto">
                                What are they saying about us?
                            </p>
                        </div>
                        <div className="relative mt-12 max-w-6xl mx-auto overflow-hidden rounded-lg h-[550px]">
                            <div className="absolute inset-x-0 top-0 h-16 pointer-events-none bg-gradient-to-b from-[#f5f5f5] dark:from-[#1c1c1c] to-transparent z-10"></div>
                            <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-[#f5f5f5] dark:from-[#1c1c1c] to-transparent z-10"></div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">
                                {[0, 1, 2, 3].map((colIndex) => (
                                    <div key={colIndex} className={`marquee-col h-full overflow-y-hidden ${colIndex > 1 ? 'hidden md:block' : ''}`}>
                                        <div className={`marquee-track ${colIndex % 2 === 0 ? 'reverse' : ''} px-2`}>
                                            {[...reviews, ...reviews].map((review, i) => (
                                                <div key={i} className="p-4 rounded-lg shadow-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 ease-in-out hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)]">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <img src={`https://placehold.co/40x40/${review.color}/ffffff?text=${review.name[0]}`} className="w-10 h-10 rounded-full" alt="Avatar" />
                                                        <div>
                                                            <div className="font-medium">{review.name}</div>
                                                            <div className="text-xs">{review.handle}</div>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm">{review.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </AppLayout >
    );
}
