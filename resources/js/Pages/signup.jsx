import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useTheme } from '@/Contexts/ThemeContext';

export default function Signup() {
    const { theme, changeTheme } = useTheme();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/signup', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout showHeader={false} showFooter={false}>
            <Head title="NutriTrack - Signup" />
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">

                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-[#3dccc7] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm opacity-60">
                            Join us today! Fill in your details to get started.
                        </p>
                    </div>

                    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-xl shadow-xl p-8">
                        <form className="space-y-4" onSubmit={submit}>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <input id="name" name="name" type="text" required onChange={(e) => setData('name', e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                        placeholder="Enter your full name" value={data.name} />
                                </div>
                                {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <input id="email" name="email" type="email" required onChange={(e) => setData('email', e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                        placeholder="Enter your email address" value={data.email} />
                                </div>
                                {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                            </path>
                                        </svg>
                                    </div>
                                    <input id="password" name="password" type="password" required onChange={(e) => setData('password', e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                        placeholder="Create a password" value={data.password} />
                                </div>
                                {errors.password && <div className="mt-1 text-sm text-red-600">{errors.password}</div>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <input id="password_confirmation" name="password_confirmation" type="password" required onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200"
                                        placeholder="Confirm your password" value={data.password_confirmation} />
                                </div>
                                {errors.password_confirmation && <div className="mt-1 text-sm text-red-600">{errors.password_confirmation}</div>}
                            </div>

                            <div className="flex items-start mt-6">
                                <div className="flex items-center h-5">
                                    <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary focus:ring-1 focus:ring-offset-0 focus:ring-primary bg-[#ffffff] dark:bg-[#404040] border border-[#cccccc] dark:border-[#404040] rounded" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="">
                                        I agree to the{' '}
                                        <Link href="/terms-and-conditions" className="font-medium hover:text-primary">
                                            Terms and Conditions
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy-policy" className="font-medium hover:text-primary">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button type="submit" disabled={processing}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#3dccc7] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition duration-200 transform hover:scale-105 disabled:opacity-50">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-white" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                    Create Account
                                </button>
                            </div>



                            <div className="text-center">
                                <span className="text-sm">
                                    Already have an account?{' '}
                                    <Link href="/signin" className="font-medium hover:text-primary transition-all duration-300">
                                        Sign in here
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            © 2025 NutriTrack. All rights reserved.
                        </p>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <div id="theme-switcher" className="fixed bottom-6 left-6 z-50 flex flex-col p-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] shadow-sm">
                        <button id="system-btn" onClick={() => changeTheme('system')}
                            className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'system' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                            </svg>
                        </button>

                        <button id="light-btn" onClick={() => changeTheme('light')}
                            className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'bg-black/10 dark:bg-white/10 opacity-100' : 'opacity-50 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-6 h-6">
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
        </AppLayout>
    );
}