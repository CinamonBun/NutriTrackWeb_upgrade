import React from 'react';
import { Head, Link } from '@inertiajs/react';
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

export default function Riviews() {
    return (
        <AppLayout>
            <Head title="NutriTrack - Reviews" />
            <section className="relative w-full min-h-screen flex items-center overflow-hidden px-[5%] py-20">

                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-gray-200"
                        >
                            Loved by <span className="text-primary">10,000+</span> Healthy People.<br />
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-md"
                        >
                            Baca cerita inspiratif dari pengguna yang telah berhasil mencapai target kesehatan mereka bersama NutriTrack.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex items-center gap-4">
                            <button className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.3)]">
                                Read Success Stories
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] opacity-60 dark:opacity-70 px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 ease-in-out hover:opacity-100 hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(61,204,199,0.15)]">
                                Share Yours
                            </button>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-3">
                            <div className="flex text-yellow-400 text-xl">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            </div>
                            <span className="font-semibold">4.9/5</span>
                            <span className="opacity-60 dark:opacity-70 text-sm border-l border-gray-700 pl-3">Based on App Store & Play Store</span>
                        </motion.div>
                    </motion.div>

                    <div className="relative h-[500px] flex items-center justify-center">

                        <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-pulse"></div>
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-110 opacity-50"></div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative z-20 backdrop-blur-xl bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-8 rounded-3xl shadow-2xl max-w-md"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-12 h-12 rounded-full bg-gray-700" />
                                    <div>
                                        <h4 className="font-bold">Sarah Jenkins</h4>
                                        <p className="text-primary text-sm">Lost 15kg in 3 months</p>
                                    </div>
                                </div>
                                <i className="fas fa-quote-right text-4xl text-white/10"></i>
                            </div>
                            <p className="opacity-60 dark:opacity-70 leading-relaxed mb-4">
                                "Aplikasi ini benar-benar mengubah cara saya melihat makanan. Fitur AI-nya sangat akurat dan resepnya enak-enak!"
                            </p>
                            <div className="flex gap-1 text-yellow-400 text-sm">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [6, 8, 6] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 z-10 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-4 rounded-2xl shadow-xl w-64 transform rotate-6 opacity-60 hover:opacity-100 transition duration-300"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs font-bold">BJ</div>
                                <div className="flex text-yellow-400 text-xs"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
                            </div>
                            <p className="opacity-60 dark:opacity-70 text-xs">"Tracking makro jadi super gampang."</p>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0], rotate: [-6, -4, -6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-10 left-0 z-10 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] p-4 rounded-2xl shadow-xl w-64 transform -rotate-6 opacity-60 hover:opacity-100 transition duration-300"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">AD</div>
                                <div className="flex text-yellow-400 text-xs"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
                            </div>
                            <p className="opacity-60 dark:opacity-70 text-xs">"UI-nya sangat bersih and modern!"</p>
                        </motion.div>

                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section id="list" className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold">What Our Users Say</h2>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <motion.div variants={fadeInUp} className="p-8 rounded-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] flex flex-col">
                                <p className="text-base leading-relaxed mb-8 flex-grow">
                                    NutriTrack has completely transformed my life! I lost 15 kg in 3 months with easy tracking and clear insights. This app really helped me understand my eating patterns and make better decisions for my health.
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Sari Dewanti</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Fitness Enthusiast, Jakarta</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="p-8 rounded-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] flex flex-col">
                                <p className="text-base leading-relaxed mb-8 flex-grow">
                                    The best nutrition app I've ever used! The food tracking features are comprehensive, the nutrition database is accurate, and the interface is very user-friendly. It helps me reach my daily protein goals and manage calories effortlessly.
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Budi Santoso</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Personal Trainer, Bandung</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="p-8 rounded-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] flex flex-col">
                                <p className="text-base leading-relaxed mb-8 flex-grow">
                                    As a nutritionist, I'm very impressed with the accuracy of nutrition data in NutriTrack. The macro and micronutrient analysis features are extremely helpful in providing recommendations to clients. The Indonesian food database is also very comprehensive!
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Dr. Maya Kartika</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Certified Nutritionist, Surabaya</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="p-8 rounded-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] flex flex-col">
                                <p className="text-base leading-relaxed mb-8 flex-grow">
                                    NutriTrack helps me manage my diabetes much better. The carbohydrate and blood sugar tracking features are very helpful in maintaining a healthy diet. The daily graphs and reports are very informative for consultations with my doctor.
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Ahmad Rizki</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Business Owner, Medan</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="p-8 rounded-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] flex flex-col">
                                <div className="space-y-3 mb-8 flex-grow">
                                    <p className="text-base leading-relaxed">Such a practical app!</p>
                                    <p className="text-base leading-relaxed">Food tracking has become so much easier.</p>
                                    <p className="text-base leading-relaxed">The meal reminder feature is very helpful.</p>
                                    <p className="text-base leading-relaxed">Highly recommended!</p>
                                </div>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Rina Wijaya</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Content Creator, Yogyakarta</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="p-8 rounded-md bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)] flex flex-col">
                                <p className="text-base leading-relaxed mb-8 flex-grow">
                                    NutriTrack makes healthy living so much more enjoyable! The meal planning and healthy recipe features are very helpful in preparing nutritious meals. I can see my health progress over time and feel more motivated to maintain a good eating pattern.
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Dedi Prasetyo</div>
                                        <div className="text-sm opacity-60 dark:opacity-70">Software Engineer, Bali</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-2xl sm:text-3xl font-bold">Ready to start?</h3>
                        <p className="mt-3 opacity-60 dark:opacity-70">Download NutriTrack and start your healthy journey today.</p>
                        <div className="mt-6 flex justify-center gap-3">
                            <Link href="#" className="px-5 py-3 rounded-md text-sm font-medium text-white bg-[#3dccc7] hover:bg-[#68d8d6]">Download App</Link>
                            <Link href="/features" className="px-5 py-3 rounded-md text-sm font-medium bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040]">See Features</Link>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
