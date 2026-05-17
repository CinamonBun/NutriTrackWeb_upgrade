import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';
import {
    User,
    Lock,
    Bell,
    Palette,
    Shield,
    Globe,
    Save,
    ChevronRight,
    Smartphone,
    ChevronDown
} from 'lucide-react';

const SettingSection = ({ title, description, icon: Icon, children }) => (
    <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-3xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-[#3dccc7]/10 text-[#3dccc7]">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold opacity-90">{title}</h3>
                <p className="text-sm opacity-60">{description}</p>
            </div>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const SettingItem = ({ label, description, children }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-t border-neutral-100 dark:border-neutral-800 first:border-0">
        <div className="max-w-md">
            <h4 className="text-sm font-semibold mb-1">{label}</h4>
            <p className="text-xs opacity-60 leading-relaxed">{description}</p>
        </div>
        <div className="flex-shrink-0">
            {children}
        </div>
    </div>
);

export default function Settings() {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');
    const [language, setLanguage] = useState('English (United States)');
    const [isLangOpen, setIsLangOpen] = useState(false);
    const languages = ['English (United States)', 'Bahasa Indonesia'];

    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const photoInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
            router.post('/profile/avatar', {
                avatar: e.target.files[0],
            }, {
                preserveScroll: true,
                forceFormData: true,
            });
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch('/profile', {
            preserveScroll: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put('/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    const { theme, changeTheme } = useTheme();

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'security', name: 'Security', icon: Lock },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'appearance', name: 'Appearance', icon: Palette },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Settings" />

            <section className="pt-28 pb-12 md:pt-36 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight opacity-90">Settings</h1>
                        <p className="mt-2 text-lg opacity-60 dark:opacity-70">
                            Manage your account preferences and system configuration.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-3xl p-4 shadow-sm sticky top-36">
                                <nav className="space-y-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                                ? 'bg-[#3dccc7] text-white shadow-lg shadow-[#3dccc7]/20'
                                                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <tab.icon className="h-5 w-5" />
                                            {tab.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-3">
                            {activeTab === 'profile' && (
                                <div className="space-y-6 fade-in">
                                    <SettingSection
                                        title="Profile Information"
                                        description="Update your account's profile information and email address."
                                        icon={User}
                                    >
                                        <form onSubmit={submitProfile} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium opacity-80">Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={profileForm.data.name}
                                                        onChange={e => profileForm.setData('name', e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                                        required
                                                    />
                                                    {profileForm.errors.name && <p className="text-red-500 text-xs mt-1">{profileForm.errors.name}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium opacity-80">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={profileForm.data.email}
                                                        onChange={e => profileForm.setData('email', e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                                        required
                                                    />
                                                    {profileForm.errors.email && <p className="text-red-500 text-xs mt-1">{profileForm.errors.email}</p>}
                                                </div>
                                            </div>
                                            <div className="pt-4 flex items-center justify-end gap-4">
                                                {profileForm.recentlySuccessful && <span className="text-sm text-[#3dccc7]">Saved.</span>}
                                                <button
                                                    type="submit"
                                                    disabled={profileForm.processing}
                                                    className="flex items-center gap-2 bg-[#3dccc7] hover:bg-[#68d8d6] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-50"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </SettingSection>

                                    <SettingSection
                                        title="Profile Avatar"
                                        description="Customizing your profile picture helps others identify you."
                                        icon={Smartphone}
                                    >
                                        <div className="flex items-center gap-6">
                                            {auth.user.avatar_url ? (
                                                <img
                                                    src={auth.user.avatar_url}
                                                    alt={auth.user.name}
                                                    className="w-20 h-20 rounded-full object-cover shadow-sm border border-neutral-200 dark:border-neutral-700"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                                                    {auth.user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <input
                                                    type="file"
                                                    ref={photoInputRef}
                                                    onChange={handlePhotoChange}
                                                    className="hidden"
                                                    accept="image/jpeg, image/png, image/jpg, image/gif"
                                                />
                                                <button
                                                    onClick={() => photoInputRef.current?.click()}
                                                    className="text-sm font-semibold text-[#3dccc7] hover:underline"
                                                >
                                                    Change Photo
                                                </button>
                                                <p className="text-xs opacity-50">JPG, GIF or PNG. Max size of 2MB.</p>
                                            </div>
                                        </div>
                                    </SettingSection>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6 fade-in">
                                    <SettingSection
                                        title="Update Password"
                                        description="Ensure your account is using a long, random password to stay secure."
                                        icon={Lock}
                                    >
                                        <form onSubmit={submitPassword} className="space-y-4 max-w-md">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Current Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordForm.data.current_password}
                                                    onChange={e => passwordForm.setData('current_password', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                                    required
                                                />
                                                {passwordForm.errors.current_password && <p className="text-red-500 text-xs mt-1">{passwordForm.errors.current_password}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">New Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordForm.data.password}
                                                    onChange={e => passwordForm.setData('password', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                                    required
                                                />
                                                {passwordForm.errors.password && <p className="text-red-500 text-xs mt-1">{passwordForm.errors.password}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium opacity-80">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordForm.data.password_confirmation}
                                                    onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all"
                                                    required
                                                />
                                                {passwordForm.errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{passwordForm.errors.password_confirmation}</p>}
                                            </div>
                                            <div className="pt-4 flex items-center justify-end gap-4 w-full">
                                                {passwordForm.recentlySuccessful && <span className="text-sm text-[#3dccc7]">Password updated.</span>}
                                                <button
                                                    type="submit"
                                                    disabled={passwordForm.processing}
                                                    className="bg-[#3dccc7] hover:bg-[#68d8d6] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-50"
                                                >
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </SettingSection>

                                    <SettingSection
                                        title="Two-Factor Authentication"
                                        description="Add an extra layer of security to your account."
                                        icon={Shield}
                                    >
                                        <SettingItem
                                            label="Authenticator App"
                                            description="Use an authenticator app to generate a one-time code for login."
                                        >
                                            <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                                Enable
                                            </button>
                                        </SettingItem>
                                    </SettingSection>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6 fade-in">
                                    <SettingSection
                                        title="Email Notifications"
                                        description="Choose what you want to be notified about via email."
                                        icon={Bell}
                                    >
                                        <SettingItem
                                            label="System Alerts"
                                            description="Critical system alerts and security updates."
                                        >
                                            <div className="w-12 h-6 bg-[#3dccc7] rounded-full relative cursor-pointer shadow-inner">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                            </div>
                                        </SettingItem>
                                        <SettingItem
                                            label="Weekly Insights"
                                            description="A summary of platform growth and user engagement."
                                        >
                                            <div className="w-12 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full relative cursor-pointer">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                            </div>
                                        </SettingItem>
                                    </SettingSection>
                                </div>
                            )}

                            {activeTab === 'appearance' && (
                                <div className="space-y-6 fade-in">
                                    <SettingSection
                                        title="Interface Theme"
                                        description="Customize how the application looks for you."
                                        icon={Palette}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {['Light', 'Dark', 'System'].map((mode) => {
                                                const modeKey = mode.toLowerCase();
                                                const isActive = theme === modeKey;
                                                return (
                                                    <div
                                                        key={mode}
                                                        onClick={() => changeTheme(modeKey)}
                                                        className={`border rounded-2xl p-4 cursor-pointer transition-colors ${isActive
                                                            ? 'border-[#3dccc7] bg-[#3dccc7]/5'
                                                            : 'bg-white dark:bg-[#262626] border-neutral-200 dark:border-neutral-700 hover:border-[#3dccc7]/50'
                                                            }`}
                                                    >
                                                        <div className={`h-24 rounded-xl mb-3 ${mode === 'Light' ? 'bg-[#f7f7f7] shadow-inner border border-neutral-100' :
                                                            mode === 'Dark' ? 'bg-[#1c1c1c] border border-neutral-800' :
                                                                'bg-gradient-to-br from-white to-[#1c1c1c] border border-neutral-200 dark:border-neutral-800'
                                                            }`}></div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-semibold">{mode}</span>
                                                            {isActive && <div className="w-2 h-2 rounded-full bg-[#3dccc7]"></div>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </SettingSection>

                                    <SettingSection
                                        title="Language & Region"
                                        description="Set your preferred language and time zone."
                                        icon={Globe}
                                    >
                                        <div className="space-y-4">
                                            <div className="space-y-2 relative">
                                                <label className="text-sm font-medium opacity-80">Default Language</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                                    className="w-full sm:w-64 px-4 py-2.5 bg-white dark:bg-[#262626] hover:bg-neutral-50 dark:hover:bg-[#333333] border border-neutral-200 dark:border-[#404040] rounded-xl focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent outline-none transition-all flex justify-between items-center shadow-sm"
                                                >
                                                    <span className="font-medium text-sm">{language}</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isLangOpen && (
                                                    <div className="absolute z-50 top-[calc(100%+0.5rem)] mt-0 w-full sm:w-64 bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#404040] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden fade-in">
                                                        <div className="p-1.5 flex flex-col gap-1">
                                                            {languages.map((lang) => (
                                                                <button
                                                                    key={lang}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setLanguage(lang);
                                                                        setIsLangOpen(false);
                                                                    }}
                                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${language === lang
                                                                        ? 'bg-neutral-100 dark:bg-[#333333] font-medium'
                                                                        : 'hover:bg-neutral-50 dark:hover:bg-[#2a2a2a]'
                                                                        }`}
                                                                >
                                                                    {lang}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SettingSection>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
