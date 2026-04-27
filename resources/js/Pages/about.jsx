import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function About() {
    return (
        <AppLayout>
            <Head title="NutriTrack - About" />
            <section>
                <section className="relative w-full min-h-screen flex items-center overflow-hidden px-[5%] py-20">

                    <div className="absolute inset-0 
                bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
                bg-[size:24px_24px] 
                [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]">
                    </div>
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full card text-sm text-primary mb-6">
                                <i className="fas fa-leaf"></i>
                                <span>Our Philosophy</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3dccc7] to-green-400">Technology</span> <br /> with Biology.
                            </h1>

                            <p className="text-lg opacity-70 mb-8 leading-relaxed">
                                Kami adalah tim nutrisionis dan engineer yang percaya bahwa kesehatan tidak harus rumit. Misi kami adalah mendemokratisasi akses ke gizi personal melalui kecerdasan buatan.
                            </p>

                            <div className="flex items-center gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <h4 className="text-3xl font-bold">3+</h4>
                                    <p className="text-sm opacity-60">Years Journey</p>
                                </div>
                                <div className="w-px h-10 border-r border-white/10"></div>
                                <div>
                                    <h4 className="text-3xl font-bold">50+</h4>
                                    <p className="text-sm opacity-60">Team Members</p>
                                </div>
                                <div className="w-px h-10 border-l border-white/10"></div>
                                <div>
                                    <h4 className="text-3xl font-bold">1M+</h4>
                                    <p className="text-sm opacity-60">Meals Tracked</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl -z-10"></div>

                            <div className="space-y-4 mt-8">
                                <div className="h-40 bg-gray-800 rounded-2xl overflow-hidden border border-white/10 shadow-lg transform hover:scale-105 transition duration-500">
                                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                                </div>
                                <div className="h-56 bg-gray-800 rounded-2xl overflow-hidden border border-white/10 shadow-lg transform hover:scale-105 transition duration-500">
                                    <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-56 bg-gray-800 rounded-2xl overflow-hidden border border-white/10 shadow-lg transform hover:scale-105 transition duration-500">
                                    <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                                </div>
                                <div className="h-40 bg-gray-800 rounded-2xl overflow-hidden border border-white/10 shadow-lg transform hover:scale-105 transition duration-500">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section id="values" className="py-24 px-[5%] relative">
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3dccc7]/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-[#3dccc7] font-bold tracking-wide uppercase text-sm mb-3">Who We Are</h2>
                            <h1 className="text-3xl md:text-5xl font-bold mb-6">
                                We don't just track calories. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3dccc7] to-green-400">We decode lifestyle.</span>
                            </h1>
                            <p className="opacity-80 text-lg">
                                Menggabungkan ilmu gizi klinis dengan kecerdasan buatan untuk membantu Anda hidup lebih lama dan lebih baik.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="md:col-span-2 card rounded-3xl p-8 hover:border-[#3dccc7]/30 shadow-sm hover:shadow-lg transition duration-300 group">
                                <div className="w-12 h-12 bg-[#3dccc7]/10 dark:bg-[#3dccc7]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                    <i className="fas fa-bullseye text-[#3dccc7] text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="opacity-80 leading-relaxed">
                                    Misi kami adalah mendemokratisasi akses ke ahli gizi pribadi. Kami percaya bahwa setiap orang berhak mendapatkan panduan kesehatan yang akurat, terjangkau, dan dipersonalisasi—bukan sekadar saran umum dari internet.
                                </p>
                            </div>

                            <div className="card rounded-3xl p-8 hover:border-[#3dccc7]/30 shadow-sm hover:shadow-lg transition duration-300 group">
                                <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                    <i className="fas fa-flask text-purple-500 dark:text-purple-400 text-xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Backed by Science</h3>
                                <p className="opacity-80 text-sm">
                                    Setiap algoritma di NutriTrack divalidasi oleh jurnal medis terkemuka dan tim nutrisionis bersertifikat.
                                </p>
                            </div>

                            <div className="card rounded-3xl p-8 hover:border-[#3dccc7]/30 shadow-sm hover:shadow-lg transition duration-300 group">
                                <div className="w-12 h-12 bg-green-500/10 dark:bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                    <i className="fas fa-shield-alt text-green-500 dark:text-green-400 text-xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-4">Privacy First</h3>
                                <p className="opacity-80 text-sm">
                                    Data kesehatan Anda adalah milik Anda. Kami menggunakan enkripsi end-to-end dan tidak pernah menjual data ke pihak ketiga.
                                </p>
                            </div>

                            <div className="md:col-span-2 relative overflow-hidden bg-gradient card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3dccc7]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#3dccc7]/20 transition duration-500"></div>

                                <div className="relative z-10 text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-2">Built by Dreamers</h3>
                                    <p className="opacity-80 text-sm md:text-base max-w-md">
                                        Kenalan dengan tim "4Ever Young" dibalik baris kode NutriTrack. Lihat bagaimana kami membangun ini dari nol.
                                    </p>
                                </div>

                                <a href="4ever-young.php" className="relative z-10 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-[#3dccc7] hover:text-white transition duration-300 flex items-center gap-2 shadow-lg">
                                    Meet the Creators
                                    <i className="fas fa-arrow-right"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </section>
            </section>
        </AppLayout>
    );
}