import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
};

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const TAGS = [
    { label: 'Semua', value: null, icon: 'fas fa-border-all', color: 'text-primary' },
    { label: 'Resep Sehat', value: 'ResepSehat', icon: 'fas fa-utensils', color: 'text-green-500' },
    { label: 'Tips Diet', value: 'TipsDiet', icon: 'fas fa-apple-alt', color: 'text-orange-500' },
    { label: 'Olahraga', value: 'Olahraga', icon: 'fas fa-running', color: 'text-blue-500' },
    { label: 'Progress', value: 'Progress', icon: 'fas fa-chart-line', color: 'text-purple-500' },
    { label: 'Tanya Ahli', value: 'TanyaAhli', icon: 'fas fa-user-md', color: 'text-teal-500' },
    { label: 'Motivasi', value: 'Motivasi', icon: 'fas fa-fire', color: 'text-red-500' },
];

const TAG_COLORS = {
    ResepSehat: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    TipsDiet:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Olahraga:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Progress:   'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    TanyaAhli:  'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    Motivasi:   'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const CHALLENGES = [
    { title: '30 Hari Tanpa Gula', members: 1420, progress: 60, days: 30, current: 18, icon: 'fas fa-candy-cane', color: 'from-orange-400 to-red-500' },
    { title: 'Minum 8 Gelas/Hari', members: 3210, progress: 40, days: 21, current: 8, icon: 'fas fa-tint', color: 'from-blue-400 to-cyan-500' },
    { title: 'Lari 5KM per Minggu', members: 872, progress: 75, days: 14, current: 10, icon: 'fas fa-shoe-prints', color: 'from-green-400 to-emerald-500' },
];

const EVENTS = [
    { title: 'Webinar: Nutrisi Seimbang untuk Pemula', date: '1 Jun 2026', time: '19:00 WIB', type: 'Online', speaker: 'dr. Anisa Fitri, Sp.GK', color: 'from-primary/20 to-primary/5' },
    { title: 'NutriMeet Jakarta – Komunitas Sehat', date: '15 Jun 2026', time: '09:00 WIB', type: 'Offline', speaker: 'Komunitas NutriTrack', color: 'from-purple-500/20 to-purple-500/5' },
    { title: 'Live Cooking: Meal Prep Hemat Kalori', date: '22 Jun 2026', time: '14:00 WIB', type: 'Online', speaker: 'Chef Rina Sari', color: 'from-orange-500/20 to-orange-500/5' },
];

const BADGES = [
    { icon: 'fas fa-crown', label: 'Top Kontributor', color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' },
    { icon: 'fas fa-seedling', label: 'Pemula Sehat', color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
    { icon: 'fas fa-medal', label: 'Veteran 30 Hari', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
    { icon: 'fas fa-star', label: 'Ahli Nutrisi', color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' },
    { icon: 'fas fa-comments', label: 'Diskutor Aktif', color: 'text-teal-500 bg-teal-100 dark:bg-teal-900/30' },
    { icon: 'fas fa-heart', label: 'Inspirator', color: 'text-red-500 bg-red-100 dark:bg-red-900/30' },
];

const LEADERBOARD = [
    { name: 'Sarah K.', pts: '2.4k', badge: 'Top Kontributor', color: '34d399' },
    { name: 'Mike T.', pts: '1.8k', badge: 'Ahli Nutrisi', color: '60a5fa' },
    { name: 'Lina R.', pts: '1.2k', badge: 'Diskutor Aktif', color: 'a78bfa' },
    { name: 'Budi P.', pts: '950', badge: 'Veteran', color: 'f87171' },
    { name: 'Anna S.', pts: '820', badge: 'Inspirator', color: 'fbbf24' },
];

const GUIDELINES = [
    { icon: 'fas fa-hand-holding-heart', text: 'Saling menghargai dan mendukung sesama anggota.' },
    { icon: 'fas fa-shield-alt', text: 'Dilarang membagikan informasi kesehatan yang menyesatkan.' },
    { icon: 'fas fa-ban', text: 'Tidak ada konten yang bersifat promosi atau spam.' },
    { icon: 'fas fa-user-check', text: 'Gunakan bahasa yang sopan dan inklusif.' },
    { icon: 'fas fa-flag', text: 'Laporkan konten yang melanggar kepada moderator.' },
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function UserMiniCard({ user }) {
    if (!user) return null;
    return (
        <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary border-2 border-primary/40 shrink-0">
                {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
                <p className="font-bold truncate">{user.name}</p>
                <p className="text-xs opacity-60">{user.email}</p>
                <div className="flex gap-3 mt-2">
                    <span className="text-xs bg-white dark:bg-[#1c1c1c] border border-[#cccccc] dark:border-[#404040] px-2 py-0.5 rounded-full font-semibold text-primary">Anggota Aktif</span>
                </div>
            </div>
        </div>
    );
}

function PostCard({ post, onLike, onSave, onReport, activeComment, onToggleComment, commentContent, onCommentChange, onCommentSubmit }) {
    const tagStyle = TAG_COLORS[post.tag] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    const tagMeta  = TAGS.find(t => t.value === post.tag);

    return (
        <motion.div variants={fadeInUp} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-6 transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.15)]">
            {/* Author Row */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold text-primary border-2 border-primary/20 shrink-0 text-sm">
                        {post.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">{post.user?.name}</h3>
                        <p className="text-xs opacity-50">
                            {new Date(post.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {post.tag && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${tagStyle}`}>
                            {tagMeta && <i className={`${tagMeta.icon} mr-1`}></i>}
                            #{post.tag}
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => onReport(post.id, 'post')}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#333]"
                        title="Laporkan postingan"
                    >
                        <i className="fas fa-flag text-xs"></i>
                    </button>
                </div>
            </div>

            {/* Content */}
            <p className="mb-4 text-sm leading-relaxed whitespace-pre-wrap opacity-90">{post.content}</p>

            {/* Action Bar */}
            <div className="flex items-center gap-4 pt-3 border-t border-[#cccccc] dark:border-[#404040]">
                <button
                    onClick={() => onLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all hover:scale-110 ${post.is_liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                    <i className={`${post.is_liked ? 'fas' : 'far'} fa-heart`}></i>
                    <span>{post.likes_count}</span>
                </button>
                <button
                    onClick={() => onToggleComment(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all hover:scale-110 ${activeComment === post.id ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                >
                    <i className={`${activeComment === post.id ? 'fas' : 'far'} fa-comment-dots`}></i>
                    <span>{post.comments?.length || 0}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-blue-500 transition-all hover:scale-110">
                    <i className="fas fa-share-alt"></i>
                </button>
                <button
                    onClick={() => onSave(post.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all hover:scale-110 ml-auto ${post.is_saved ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                >
                    <i className={`${post.is_saved ? 'fas' : 'far'} fa-bookmark`}></i>
                </button>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
                {activeComment === post.id && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 pt-4 border-t border-[#cccccc] dark:border-[#404040] space-y-3 overflow-hidden"
                    >
                        {post.comments?.length > 0 ? post.comments.map((c) => (
                            <div key={c.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                    {c.user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="flex-1 bg-gray-50 dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#333] rounded-xl px-4 py-2.5">
                                    <span className="font-bold text-xs mr-2">{c.user?.name}</span>
                                    <span className="text-sm opacity-90">{c.content}</span>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-center opacity-50 py-2">Belum ada komentar. Jadilah yang pertama!</p>
                        )}
                        <div className="flex gap-2 mt-2">
                            <input
                                type="text"
                                className="flex-1 bg-gray-50 dark:bg-[#1a1a1a] border border-[#cccccc] dark:border-[#404040] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                placeholder="Tulis komentar..."
                                value={commentContent}
                                onChange={onCommentChange}
                                onKeyDown={e => e.key === 'Enter' && onCommentSubmit(post.id)}
                            />
                            <button
                                onClick={() => onCommentSubmit(post.id)}
                                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors hover:scale-105"
                            >
                                <i className="fas fa-paper-plane text-xs"></i>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const REPORT_REASONS = [
    { value: 'spam', label: 'Spam' },
    { value: 'harassment', label: 'Pelecehan' },
    { value: 'misinformation', label: 'Informasi menyesatkan' },
    { value: 'inappropriate', label: 'Konten tidak pantas' },
    { value: 'other', label: 'Lainnya' },
];

export default function Community({ posts = [], activeTag = null, searchQuery = '', guidelines: serverGuidelines = [] }) {
    const { auth } = usePage().props;
    const displayGuidelines = serverGuidelines.length > 0
        ? serverGuidelines.map((g) => ({ icon: g.icon, text: g.content }))
        : GUIDELINES;

    const [content, setContent]               = useState('');
    const [tag, setTag]                       = useState('');
    const [search, setSearch]                 = useState(searchQuery || '');
    const [activeComment, setActiveComment]   = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [joinedChallenges, setJoinedChallenges] = useState({});
    const [reportTarget, setReportTarget]     = useState(null);
    const [reportReason, setReportReason]       = useState('spam');
    const [reportDetails, setReportDetails]     = useState('');

    // ── Auth-gated action ──────────────────────
    const requireAuth = (fn) => {
        if (!auth.user) { router.visit(route('login')); return; }
        fn();
    };

    // ── Post submission ─────────────────────────
    const handleSubmit = () => requireAuth(() => {
        if (!content.trim()) return;
        router.post(route('community.posts.store'), { content, tag }, {
            onSuccess: () => { setContent(''); setTag(''); },
            preserveScroll: true,
        });
    });

    // ── Like / Save ─────────────────────────────
    const handleLike = (postId) => requireAuth(() =>
        router.post(route('community.posts.like', postId), {}, { preserveScroll: true })
    );
    const handleSave = (postId) => requireAuth(() =>
        router.post(route('community.posts.save', postId), {}, { preserveScroll: true })
    );

    // ── Comment ─────────────────────────────────
    const handleCommentSubmit = (postId) => requireAuth(() => {
        if (!commentContent.trim()) return;
        router.post(route('community.posts.comment', postId), { content: commentContent }, {
            onSuccess: () => setCommentContent(''),
            preserveScroll: true,
        });
    });

    // ── Search ──────────────────────────────────
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('community.index'), { search, tag: activeTag }, { preserveScroll: true, replace: true });
    };

    // ── Tag filter ──────────────────────────────
    const handleTagFilter = (tagValue) => {
        router.get(route('community.index'), { tag: tagValue, search }, { preserveScroll: true, replace: true });
    };

    const openReport = (id, type) => requireAuth(() => {
        setReportTarget({ id, type });
        setReportReason('spam');
        setReportDetails('');
    });

    const submitReport = () => {
        if (!reportTarget) return;
        router.post(route('community.report'), {
            reportable_type: reportTarget.type,
            reportable_id: reportTarget.id,
            reason: reportReason,
            details: reportDetails || null,
        }, {
            preserveScroll: true,
            onSuccess: () => setReportTarget(null),
        });
    };

    return (
        <AppLayout>
            <Head title="Community - NutriTrack" />

            <section className="relative pt-32 lg:pt-40 pb-20 px-[5%] overflow-hidden min-h-screen">
                {/* BG Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

                {/* ── Hero ───────────────────────────────── */}
                <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">
                    <motion.div variants={stagger} initial="initial" animate="animate">
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] text-sm text-primary mb-5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Community Hub
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-gray-100">
                            NutriTrack <span className="gradient-text">Community</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Bergabung dengan ribuan anggota. Berbagi resep, tips diet, progres, dan saling mendukung dalam perjalanan hidup sehat!
                        </motion.p>

                        {/* Quick Stats */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mt-8">
                            {[
                                { icon: 'fas fa-users', label: '12,400+ Anggota', color: 'text-primary' },
                                { icon: 'fas fa-fire', label: '3 Tantangan Aktif', color: 'text-orange-500' },
                                { icon: 'fas fa-calendar-alt', label: '3 Event Bulan Ini', color: 'text-purple-500' },
                                { icon: 'fas fa-comments', label: `${posts.length} Post Hari Ini`, color: 'text-blue-500' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-2 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] px-4 py-2 rounded-full text-sm font-semibold">
                                    <i className={`${s.icon} ${s.color}`}></i> {s.label}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Search Bar ─────────────────────────── */}
                <div className="max-w-2xl mx-auto mb-10 relative z-10">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1 relative">
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                className="w-full pl-11 pr-4 py-3 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                placeholder="Cari postingan, tips, atau resep..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
                            Cari
                        </button>
                    </form>
                </div>

                {/* ── Tag Filter Bar ─────────────────────── */}
                <div className="max-w-7xl mx-auto mb-8 relative z-10 overflow-x-auto">
                    <div className="flex gap-2 pb-1 min-w-max mx-auto justify-center flex-wrap">
                        {TAGS.map(t => (
                            <button
                                key={t.value ?? 'all'}
                                onClick={() => handleTagFilter(t.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                                    activeTag === t.value
                                        ? 'bg-primary text-white border-primary shadow-[0_4px_15px_rgba(61,204,199,0.3)]'
                                        : 'bg-[#ffffff] dark:bg-[#2a2a2a] border-[#cccccc] dark:border-[#404040] hover:border-primary hover:text-primary'
                                }`}
                            >
                                <i className={`${t.icon} text-xs ${activeTag === t.value ? 'text-white' : t.color}`}></i>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Main 3-Column Grid ─────────────────── */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                    {/* ── CENTER COLUMN (Feed) ────────────── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Create Post Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-6 hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.12)] transition-all duration-300">
                            <div className="flex gap-4">
                                <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 shrink-0">
                                    {auth.user ? (
                                        <span className="font-bold text-primary text-sm">{auth.user.name?.[0]?.toUpperCase()}</span>
                                    ) : (
                                        <i className="fas fa-user text-primary text-sm"></i>
                                    )}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <textarea
                                        className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-[#cccccc] dark:border-[#404040] rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-colors"
                                        rows="3"
                                        placeholder={auth.user ? "Bagikan resep, tips, atau progress-mu hari ini..." : "Login untuk mulai berbagi dengan komunitas..."}
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        onClick={() => !auth.user && router.visit(route('login'))}
                                        readOnly={!auth.user}
                                    />
                                    <div className="flex items-center justify-between">
                                        <select
                                            value={tag}
                                            onChange={e => setTag(e.target.value)}
                                            className="bg-gray-50 dark:bg-[#1a1a1a] border border-[#cccccc] dark:border-[#404040] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                                        >
                                            <option value="">Pilih Topik...</option>
                                            {TAGS.filter(t => t.value).map(t => (
                                                <option key={t.value} value={t.value}>#{t.label}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={handleSubmit}
                                            className="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(61,204,199,0.3)] transition-all duration-300"
                                        >
                                            <i className="fas fa-paper-plane mr-2"></i>Posting
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Active Filter Indicator */}
                        {(activeTag || searchQuery) && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <i className="fas fa-filter text-primary"></i>
                                Menampilkan:
                                {activeTag && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">#{activeTag}</span>}
                                {searchQuery && <span className="bg-gray-100 dark:bg-[#333] px-2 py-0.5 rounded-full">"{searchQuery}"</span>}
                                <button onClick={() => router.get(route('community.index'))} className="text-red-400 hover:text-red-600 ml-auto">
                                    <i className="fas fa-times"></i> Reset
                                </button>
                            </div>
                        )}

                        {/* Posts Feed */}
                        <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5">
                            {posts.length > 0 ? posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onReport={openReport}
                                    onLike={handleLike}
                                    onSave={handleSave}
                                    activeComment={activeComment}
                                    onToggleComment={id => setActiveComment(activeComment === id ? null : id)}
                                    commentContent={commentContent}
                                    onCommentChange={e => setCommentContent(e.target.value)}
                                    onCommentSubmit={handleCommentSubmit}
                                />
                            )) : (
                                <motion.div variants={fadeInUp} className="text-center py-20 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl">
                                    <i className="fas fa-comments text-5xl text-primary/30 mb-4"></i>
                                    <h3 className="font-bold text-lg mb-2">Belum Ada Post</h3>
                                    <p className="text-sm opacity-60">{activeTag || searchQuery ? 'Tidak ada post yang cocok. Coba filter lain.' : 'Jadilah yang pertama berbagi di komunitas!'}</p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* ── EVENTS SECTION ──────────────────── */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <i className="fas fa-calendar-star text-purple-500"></i> Event & Acara Mendatang
                            </h2>
                            <div className="space-y-4">
                                {EVENTS.map((ev, i) => (
                                    <div key={i} className={`bg-gradient-to-r ${ev.color} border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary transition-all duration-300`}>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ev.type === 'Online' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'}`}>
                                                    <i className={`fas ${ev.type === 'Online' ? 'fa-video' : 'fa-map-marker-alt'} mr-1`}></i>{ev.type}
                                                </span>
                                                <span className="text-xs opacity-60 font-semibold">{ev.date} · {ev.time}</span>
                                            </div>
                                            <h3 className="font-bold text-sm mb-1">{ev.title}</h3>
                                            <p className="text-xs opacity-60"><i className="fas fa-microphone mr-1"></i>{ev.speaker}</p>
                                        </div>
                                        <button className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(61,204,199,0.3)]">
                                            Daftar Sekarang
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT SIDEBAR ────────────────────── */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">

                        {/* User Mini-Card */}
                        {auth.user && <UserMiniCard user={auth.user} />}

                        {/* Challenges Tracker */}
                        <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.12)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-orange-400/10 rounded-full blur-2xl pointer-events-none"></div>
                            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                                <i className="fas fa-fire text-orange-500"></i> Tantangan Aktif
                            </h3>
                            <div className="space-y-4">
                                {CHALLENGES.map((ch, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ch.color} flex items-center justify-center text-white text-xs shrink-0`}>
                                                <i className={ch.icon}></i>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-xs truncate">{ch.title}</p>
                                                <p className="text-xs opacity-50">{ch.members.toLocaleString()} peserta</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                                <div className={`bg-gradient-to-r ${ch.color} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${ch.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs opacity-50 shrink-0">Hari {ch.current}/{ch.days}</span>
                                        </div>
                                        <button
                                            onClick={() => requireAuth(() => setJoinedChallenges(p => ({ ...p, [i]: !p[i] })))}
                                            className={`w-full text-xs font-bold py-1.5 rounded-lg transition-all duration-300 ${joinedChallenges[i] ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}
                                        >
                                            {joinedChallenges[i] ? <><i className="fas fa-check mr-1"></i>Bergabung!</> : 'Ikut Tantangan'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.12)]">
                            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                                <i className="fas fa-crown text-yellow-500"></i> Top Kontributor
                            </h3>
                            {/* Podium – top 3 */}
                            <div className="flex items-end justify-center gap-3 mb-5 px-2">
                                {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((u, i) => {
                                    const [rank, h, medal, ringColor] = i === 1
                                        ? [1, 'h-20', 'fas fa-crown text-yellow-500', 'ring-yellow-400']
                                        : i === 0
                                            ? [2, 'h-14', 'fas fa-medal text-gray-400', 'ring-gray-300']
                                            : [3, 'h-12', 'fas fa-medal text-orange-400', 'ring-orange-300'];
                                    return (
                                        <div key={u.name} className="flex flex-col items-center gap-1">
                                            <i className={`${medal} text-base`}></i>
                                            <img src={`https://placehold.co/40x40/${u.color}/ffffff?text=${u.name[0]}`} className={`w-10 h-10 rounded-full ring-2 ${ringColor}`} alt={u.name} />
                                            <p className="text-xs font-bold truncate max-w-[60px] text-center">{u.name.split(' ')[0]}</p>
                                            <div className={`w-14 ${h} bg-gradient-to-t from-primary/20 to-transparent rounded-t-lg flex items-start justify-center pt-1`}>
                                                <span className="text-xs font-mono font-bold text-primary">{u.pts}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Rank 4-5 */}
                            <div className="space-y-2">
                                {LEADERBOARD.slice(3).map((u, i) => (
                                    <div key={u.name} className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors">
                                        <span className="text-xs font-bold opacity-40 w-4">{i + 4}</span>
                                        <img src={`https://placehold.co/28x28/${u.color}/ffffff?text=${u.name[0]}`} className="w-7 h-7 rounded-full" alt={u.name} />
                                        <span className="flex-1 text-xs font-semibold">{u.name}</span>
                                        <span className="text-xs font-mono bg-gray-100 dark:bg-[#1c1c1c] border border-[#cccccc] dark:border-[#404040] px-2 py-0.5 rounded">{u.pts}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Badge/Lencana Widget */}
                        <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.12)]">
                            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                                <i className="fas fa-shield-halved text-primary"></i> Lencana Komunitas
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {BADGES.map((b, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-[#cccccc] dark:border-[#404040] hover:border-primary transition-colors cursor-default group">
                                        <div className={`w-9 h-9 rounded-full ${b.color} flex items-center justify-center text-base group-hover:scale-110 transition-transform`}>
                                            <i className={b.icon}></i>
                                        </div>
                                        <span className="text-[10px] font-semibold text-center leading-tight opacity-80">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Topik Populer */}
                        <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.12)]">
                            <h3 className="text-base font-bold mb-3">Topik Populer</h3>
                            <div className="flex flex-wrap gap-2">
                                {TAGS.filter(t => t.value).map(t => (
                                    <button key={t.value} onClick={() => handleTagFilter(t.value)}
                                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition-colors ${activeTag === t.value ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-[#1c1c1c] border-[#cccccc] dark:border-[#404040] hover:border-primary hover:text-primary'}`}>
                                        <i className={`${t.icon} text-xs ${t.color}`}></i> #{t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Community Guidelines */}
                        <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(61,204,199,0.12)]">
                            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                <i className="fas fa-book-open text-primary"></i> Aturan Komunitas
                            </h3>
                            <ul className="space-y-2.5">
                                {displayGuidelines.map((g, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs opacity-80 leading-relaxed">
                                        <i className={`${g.icon} text-primary mt-0.5 shrink-0`}></i>
                                        {g.text}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-4 w-full text-xs font-semibold text-primary border border-primary/30 rounded-lg py-2 hover:bg-primary/10 transition-colors">
                                Baca Panduan Lengkap
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {reportTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={() => setReportTarget(null)}>
                    <div
                        className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-6 max-w-md w-full shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold mb-4">Laporkan Konten</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium opacity-80">Alasan</label>
                                <select
                                    className="mt-1 w-full rounded-xl border border-[#cccccc] dark:border-[#404040] bg-transparent px-4 py-2.5 text-sm"
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                >
                                    {REPORT_REASONS.map((r) => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium opacity-80">Detail (opsional)</label>
                                <textarea
                                    className="mt-1 w-full rounded-xl border border-[#cccccc] dark:border-[#404040] bg-transparent px-4 py-2.5 text-sm"
                                    rows={3}
                                    value={reportDetails}
                                    onChange={(e) => setReportDetails(e.target.value)}
                                    placeholder="Jelaskan masalah..."
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" onClick={() => setReportTarget(null)} className="px-4 py-2 text-sm font-medium opacity-70 hover:opacity-100">Batal</button>
                            <button type="button" onClick={submitReport} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark">Kirim Laporan</button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
