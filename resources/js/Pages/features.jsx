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

export default function Features() {
    return (
        <AppLayout>
            <Head title="NutriTrack - Features" />
            <section className="w-full min-h-screen flex items-center relative overflow-hidden">

                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="max-w-2xl"
                        >
                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
                            >
                                Powerful Features for Your <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Health Journey</span>
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-4 text-lg md:text-xl opacity-60 dark:opacity-70 leading-relaxed mb-8"
                            >
                                Everything you need to track, understand, and improve your diet. Discover tools that make healthy living effortless and enjoyable.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <a href="#features" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.3)]">
                                    Explore Features
                                </a>
                                <a href="#how" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] opacity-60 dark:opacity-70 px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 ease-in-out hover:opacity-100 hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.15)]">
                                    How It Works
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative flex justify-center lg:justify-end group perspective-1000"
                        >

                            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-75 z-0 animate-pulse"></div>

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] transition-transform duration-500 hover:scale-105"
                            >
                                <img
                                    src="assets/food.png"
                                    alt="Healthy Food Bowl"
                                    className="w-full h-full object-cover rounded-full shadow-2xl relative z-10" />
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-10 -left-4 md:top-16 md:-left-10 z-20 bg-white/40 dark:bg-[#2a2a2a]/10 backdrop-blur-md border border-white/40 dark:border-white/10 p-3 pr-5 rounded-2xl shadow-xl flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                                        <i className="fas fa-fire"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs opacity-60 dark:opacity-70 uppercase tracking-wider font-semibold">Calories</p>
                                        <p className="text-sm font-bold">320 Kcal</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute bottom-10 -right-4 md:bottom-16 md:-right-8 z-20 bg-white/40 dark:bg-[#2a2a2a]/10 backdrop-blur-md border border-white/40 dark:border-white/10 p-3 pr-5 rounded-2xl shadow-xl flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                        <i className="fas fa-drumstick-bite"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs opacity-60 dark:opacity-70 uppercase tracking-wider font-semibold">Protein</p>
                                        <p className="text-sm font-bold">24g High</p>
                                    </div>
                                </motion.div>
                                <div className="absolute top-0 right-10 z-20 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                                    <i className="fas fa-check text-xs"></i>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section id="features" className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                                Fitur Unggulan NutriTrack
                            </h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg opacity-60 dark:opacity-70">
                                Jelajahi kemampuan inti NutriTrack yang dirancang untuk membantu mencapai target kesehatan Anda dengan mudah dan efektif.
                            </p>
                        </div>

                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="feature-icon w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="fas fa-utensils text-primary text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Smart Food Tracking</h3>
                                <p className="opacity-60 dark:opacity-70 mb-4">Catat makanan, minuman, dan aktivitas dengan mudah. Database lengkap dengan ribuan makanan lokal dan internasional.</p>

                                <ul className="space-y-2 text-sm opacity-60 dark:opacity-70 mt-auto">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-primary"></i>
                                        <span>Barcode scanner</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-primary"></i>
                                        <span>Quick add favorites</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-primary"></i>
                                        <span>Meal photos</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="feature-icon w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="fas fa-chart-line text-secondary text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                                <p className="opacity-60 dark:opacity-70 mb-4">Pahami tren nutrisi dan capai tujuan dengan visualisasi data yang komprehensif dan mudah dipahami.</p>

                                <ul className="space-y-2 text-sm opacity-60 dark:opacity-70 mt-auto">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-secondary"></i>
                                        <span>Weekly/Monthly reports</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-secondary"></i>
                                        <span>Macro breakdown</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-secondary"></i>
                                        <span>Progress charts</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="feature-icon w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="fas fa-user-cog text-accent text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">AI Personalization</h3>
                                <p className="opacity-60 dark:opacity-70 mb-4">Dapatkan insight dan rekomendasi yang disesuaikan dengan kebutuhan, preferensi, dan tujuan kesehatan pribadi Anda.</p>

                                <ul className="space-y-2 text-sm opacity-60 dark:opacity-70 mt-auto">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-accent"></i>
                                        <span>Custom meal plans</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-accent"></i>
                                        <span>Goal recommendations</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-accent"></i>
                                        <span>Dietary preferences</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="feature-icon w-16 h-16 bg-[#FFC107]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="fas fa-book-open text-[#FFC107] text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Healthy Recipes</h3>
                                <p className="opacity-60 dark:opacity-70 mb-4">Temukan ribuan resep sehat dengan nutrisi yang sudah dihitung. Filter berdasarkan kalori, waktu masak, dan preferensi diet.</p>

                                <ul className="space-y-2 text-sm opacity-60 dark:opacity-70 mt-auto">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#FFC107]"></i>
                                        <span>5000+ recipes</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#FFC107]"></i>
                                        <span>Step-by-step guides</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#FFC107]"></i>
                                        <span>Save favorites</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="feature-icon w-16 h-16 bg-[#E91E63]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="fas fa-bell text-[#E91E63] text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Smart Reminders</h3>
                                <p className="opacity-60 dark:opacity-70 mb-4">Tetap on-track dengan pengingat cerdas untuk makan, minum air, dan olahraga yang disesuaikan dengan rutinitas harian Anda.</p>

                                <ul className="space-y-2 text-sm opacity-60 dark:opacity-70 mt-auto">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#E91E63]"></i>
                                        <span>Meal reminders</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#E91E63]"></i>
                                        <span>Water intake alerts</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#E91E63]"></i>
                                        <span>Custom schedules</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 hover:shadow-lg flex flex-col h-full">
                                <div className="feature-icon w-16 h-16 bg-[#9C27B0]/10 rounded-2xl flex items-center justify-center mb-6">
                                    <i className="fas fa-sync-alt text-[#9C27B0] text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Device Sync</h3>
                                <p className="opacity-60 dark:opacity-70 mb-4">Integrasikan dengan wearables dan aplikasi kesehatan favorit Anda untuk tracking yang lebih akurat dan komprehensif.</p>

                                <ul className="space-y-2 text-sm opacity-60 dark:opacity-70 mt-auto">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#9C27B0]"></i>
                                        <span>Fitness trackers</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#9C27B0]"></i>
                                        <span>Health apps</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-[#9C27B0]"></i>
                                        <span>Cloud backup</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section id="how" className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Bagaimana Cara Kerjanya?</h3>
                            <p className="mt-3 text-lg opacity-60 dark:opacity-70 max-w-2xl mx-auto">
                                Mulai perjalanan kesehatan Anda hanya dalam tiga langkah sederhana
                            </p>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-primary">1</span>
                                    </div>
                                    <h4 className="text-xl font-semibold">Set Your Goals</h4>
                                </div>
                                <div className="mb-6">
                                    <p className="opacity-60 dark:opacity-70 mb-4">
                                        Tentukan target kesehatan Anda - apakah ingin menurunkan berat badan, menambah massa otot, atau sekadar menjaga pola makan sehat.
                                    </p>
                                </div>
                                <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg p-4 bg-gradient-to-br from-primary/5 to-transparent mt-auto">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="opacity-60 dark:opacity-70">Target Weight</span>
                                            <span className="font-semibold text-primary">70 kg</span>
                                        </div>
                                        <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-3/4 rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="opacity-60 dark:opacity-70">Daily Calories</span>
                                            <span className="font-semibold text-primary">2000 kcal</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-secondary">2</span>
                                    </div>
                                    <h4 className="text-xl font-semibold">Track Daily Intake</h4>
                                </div>
                                <div className="mb-6">
                                    <p className="opacity-60 dark:opacity-70 mb-4">
                                        Catat semua makanan dan minuman yang Anda konsumsi. Gunakan barcode scanner atau foto makanan untuk tracking yang lebih cepat dan mudah.
                                    </p>
                                </div>
                                <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg p-4 bg-gradient-to-br from-secondary/5 to-transparent mt-auto">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-secondary/20 rounded-lg"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-secondary/30 rounded w-3/4 mb-1"></div>
                                                <div className="h-2 bg-secondary/20 rounded w-1/2"></div>
                                            </div>
                                            <span className="text-xs font-semibold text-secondary">450 kcal</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-secondary/20 rounded-lg"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-secondary/30 rounded w-3/4 mb-1"></div>
                                                <div className="h-2 bg-secondary/20 rounded w-1/2"></div>
                                            </div>
                                            <span className="text-xs font-semibold text-secondary">320 kcal</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-accent">3</span>
                                    </div>
                                    <h4 className="text-xl font-semibold">Achieve Your Goals</h4>
                                </div>
                                <div className="mb-6">
                                    <p className="opacity-60 dark:opacity-70 mb-4">
                                        Lihat progress Anda, dapatkan insight personal, dan ikuti rekomendasi untuk konsistensi. Rayakan setiap milestone yang dicapai!
                                    </p>
                                </div>
                                <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg p-4 bg-gradient-to-br from-accent/5 to-transparent mt-auto">
                                    <div className="text-center mb-3">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-2">
                                            <i className="fas fa-trophy text-accent text-2xl"></i>
                                        </div>
                                        <div className="font-bold text-xl mb-1">Week 4</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Progress Milestone</div>
                                    </div>
                                    <div className="flex justify-around text-center text-sm">
                                        <div>
                                            <div className="font-semibold text-accent">-3 kg</div>
                                            <div className="opacity-60 dark:opacity-70 text-xs">Weight</div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-accent">92%</div>
                                            <div className="opacity-60 dark:opacity-70 text-xs">Consistency</div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-accent">28</div>
                                            <div className="opacity-60 dark:opacity-70 text-xs">Days</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h3>
                        <p className="text-center opacity-60 dark:opacity-70 mb-12 max-w-2xl mx-auto">
                            Punya pertanyaan? Kami punya jawabannya! Temukan informasi yang Anda butuhkan di sini.
                        </p>
                        <div className="space-y-4">
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-6 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <i className="fas fa-question text-primary text-sm"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">Apakah NutriTrack gratis?</h4>
                                        <p className="opacity-60 dark:opacity-70">
                                            Ya! NutriTrack menawarkan versi gratis dengan fitur-fitur inti yang lengkap. Untuk fitur advanced seperti analisis mendalam, meal planning personalized, dan sinkronisasi dengan lebih banyak device, tersedia versi Pro dengan harga terjangkau.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-6 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <i className="fas fa-question text-secondary text-sm"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">Apakah data saya aman?</h4>
                                        <p className="opacity-60 dark:opacity-70">
                                            Keamanan dan privasi Anda adalah prioritas kami. Semua data kesehatan Anda dienkripsi dengan standar tinggi dan kami tidak pernah menjual data pengguna kepada pihak ketiga. Data Anda hanya milik Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-6 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <i className="fas fa-question text-accent text-sm"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">Apakah tersedia database makanan Indonesia?</h4>
                                        <p className="opacity-60 dark:opacity-70">
                                            Tentu saja! NutriTrack memiliki database lengkap makanan lokal Indonesia, mulai dari nasi goreng, rendang, gado-gado, hingga jajanan pasar. Kami terus menambah dan update database untuk memastikan akurasi informasi nutrisi.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-6 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-[#FFC107]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <i className="fas fa-question text-[#FFC107] text-sm"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">Bisakah saya menggunakan NutriTrack offline?</h4>
                                        <p className="opacity-60 dark:opacity-70">
                                            Ya, sebagian besar fitur NutriTrack dapat digunakan secara offline. Data akan otomatis tersinkronisasi saat Anda terhubung kembali dengan internet. Ini sangat berguna saat Anda bepergian atau berada di area dengan koneksi terbatas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-6 rounded-xl shadow-sm hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-[#E91E63]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <i className="fas fa-question text-[#E91E63] text-sm"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">Apakah cocok untuk semua jenis diet?</h4>
                                        <p className="opacity-60 dark:opacity-70">
                                            Absolutely! NutriTrack mendukung berbagai jenis diet seperti keto, vegetarian, vegan, paleo, Mediterranean, dan lainnya. Anda bisa customize preferensi diet dan mendapatkan rekomendasi yang sesuai dengan gaya hidup Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
