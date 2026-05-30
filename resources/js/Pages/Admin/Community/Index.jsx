import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import CustomSelect from '@/Components/CustomSelect';

const STATUS_STYLES = {
    active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    hidden: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    removed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const STATUS_LABELS = {
    active: 'Aktif',
    hidden: 'Disembunyikan',
    removed: 'Dihapus',
};

export default function Index({ posts, reports, guidelines, stats, reasonLabels }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('posts');
    const [moderatingPost, setModeratingPost] = useState(null);
    const [resolvingReport, setResolvingReport] = useState(null);
    const [editingGuideline, setEditingGuideline] = useState(null);
    const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const postForm = useForm({
        status: 'active',
        moderation_note: '',
    });

    const reportForm = useForm({
        status: 'reviewed',
        admin_notes: '',
        hide_content: true,
    });

    const guidelineForm = useForm({
        icon: 'fas fa-info-circle',
        content: '',
        sort_order: 0,
        is_active: true,
    });

    const openModeratePost = (post) => {
        setModeratingPost(post);
        postForm.setData({
            status: post.status || 'active',
            moderation_note: post.moderation_note || '',
        });
        postForm.clearErrors();
    };

    const submitPostModeration = (e) => {
        e.preventDefault();
        postForm.patch(route('admin.community.posts.update', moderatingPost.id), {
            preserveScroll: true,
            onSuccess: () => setModeratingPost(null),
        });
    };

    const openResolveReport = (report) => {
        setResolvingReport(report);
        reportForm.setData({
            status: 'reviewed',
            admin_notes: '',
            hide_content: true,
        });
        reportForm.clearErrors();
    };

    const submitReportResolution = (e) => {
        e.preventDefault();
        reportForm.patch(route('admin.community.reports.resolve', resolvingReport.id), {
            preserveScroll: true,
            onSuccess: () => setResolvingReport(null),
        });
    };

    const openGuidelineModal = (guideline = null) => {
        guidelineForm.clearErrors();
        if (guideline) {
            setEditingGuideline(guideline);
            guidelineForm.setData({
                icon: guideline.icon || 'fas fa-info-circle',
                content: guideline.content,
                sort_order: guideline.sort_order,
                is_active: guideline.is_active,
            });
        } else {
            setEditingGuideline(null);
            guidelineForm.setData({
                icon: 'fas fa-info-circle',
                content: '',
                sort_order: (guidelines?.length || 0) + 1,
                is_active: true,
            });
        }
        setIsGuidelineModalOpen(true);
    };

    const submitGuideline = (e) => {
        e.preventDefault();
        if (editingGuideline) {
            guidelineForm.patch(route('admin.community.guidelines.update', editingGuideline.id), {
                preserveScroll: true,
                onSuccess: () => setIsGuidelineModalOpen(false),
            });
        } else {
            guidelineForm.post(route('admin.community.guidelines.store'), {
                preserveScroll: true,
                onSuccess: () => setIsGuidelineModalOpen(false),
            });
        }
    };

    const deleteGuideline = (id) => {
        if (!confirm('Hapus pedoman ini?')) return;
        router.delete(route('admin.community.guidelines.destroy', id), { preserveScroll: true });
    };

    const deletePost = () => {
        router.delete(route('admin.community.posts.destroy', postToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setPostToDelete(null),
        });
    };

    const tabs = [
        { id: 'posts', label: 'Postingan', count: stats.total_posts },
        { id: 'reports', label: 'Laporan', count: stats.pending_reports },
        { id: 'guidelines', label: 'Pedoman', count: guidelines.length },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Moderasi Komunitas" />

            <section className="pt-28 pb-12 md:pt-36 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight opacity-90">Moderasi Komunitas</h1>
                        <p className="mt-2 text-lg opacity-60 dark:opacity-70">
                            Kelola postingan, tangani laporan pengguna, dan atur pedoman komunitas.
                        </p>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 p-4 rounded-xl bg-[#3dccc7]/10 border border-[#3dccc7]/30 text-[#3dccc7] text-sm font-medium">
                            {flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Postingan', value: stats.total_posts },
                            { label: 'Disembunyikan', value: stats.hidden_posts },
                            { label: 'Dihapus (soft)', value: stats.removed_posts },
                            { label: 'Laporan Pending', value: stats.pending_reports },
                        ].map((s) => (
                            <div key={s.label} className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-4">
                                <p className="text-xs opacity-60 mb-1">{s.label}</p>
                                <p className="text-2xl font-bold">{s.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-[#3dccc7] text-white shadow-lg shadow-[#3dccc7]/20'
                                        : 'bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] opacity-70 hover:opacity-100'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-2 opacity-80">({tab.count})</span>
                            </button>
                        ))}
                    </div>

                    {activeTab === 'posts' && (
                        <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#cccccc] dark:border-[#404040] bg-neutral-50 dark:bg-neutral-900/50">
                                            <th className="text-left p-4 font-semibold">Penulis</th>
                                            <th className="text-left p-4 font-semibold">Konten</th>
                                            <th className="text-left p-4 font-semibold">Status</th>
                                            <th className="text-left p-4 font-semibold">Interaksi</th>
                                            <th className="text-right p-4 font-semibold">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <tr key={post.id} className="border-b border-[#cccccc] dark:border-[#404040] last:border-0">
                                                <td className="p-4">
                                                    <p className="font-medium">{post.user?.name}</p>
                                                    <p className="text-xs opacity-50">{post.user?.email}</p>
                                                </td>
                                                <td className="p-4 max-w-xs">
                                                    <p className="line-clamp-2 opacity-90">{post.content}</p>
                                                    {post.tag && (
                                                        <span className="text-xs text-[#3dccc7] mt-1 inline-block">#{post.tag}</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[post.status] || STATUS_STYLES.active}`}>
                                                        {STATUS_LABELS[post.status] || post.status}
                                                    </span>
                                                    {post.reports_count > 0 && (
                                                        <p className="text-xs text-red-500 mt-1">{post.reports_count} laporan</p>
                                                    )}
                                                </td>
                                                <td className="p-4 text-xs opacity-60">
                                                    {post.likes_count} suka · {post.comments_count} komentar
                                                </td>
                                                <td className="p-4 text-right space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openModeratePost(post)}
                                                        className="text-[#3dccc7] hover:underline text-xs font-semibold"
                                                    >
                                                        Moderasi
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setPostToDelete(post)}
                                                        className="text-red-500 hover:underline text-xs font-semibold"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {posts.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center opacity-60">Belum ada postingan.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="space-y-4">
                            {reports.length === 0 ? (
                                <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-8 text-center opacity-60">
                                    Tidak ada laporan yang menunggu peninjauan.
                                </div>
                            ) : (
                                reports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-5"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                        {reasonLabels[report.reason] || report.reason}
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800">
                                                        {report.reportable_type}
                                                    </span>
                                                </div>
                                                <p className="text-sm opacity-90 mb-2">{report.content_preview}</p>
                                                {report.details && (
                                                    <p className="text-xs opacity-60 mb-2">Detail: {report.details}</p>
                                                )}
                                                <p className="text-xs opacity-50">
                                                    Dilaporkan oleh {report.reporter?.name}
                                                    {report.author_name && ` · Konten milik ${report.author_name}`}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => openResolveReport(report)}
                                                className="shrink-0 px-4 py-2 bg-[#3dccc7] hover:bg-[#68d8d6] text-white rounded-xl text-sm font-semibold transition-colors"
                                            >
                                                Tinjau
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'guidelines' && (
                        <div>
                            <div className="flex justify-end mb-4">
                                <PrimaryButton type="button" onClick={() => openGuidelineModal()}>
                                    Tambah Pedoman
                                </PrimaryButton>
                            </div>
                            <div className="space-y-3">
                                {guidelines.map((g) => (
                                    <div
                                        key={g.id}
                                        className="flex items-start justify-between gap-4 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-4"
                                    >
                                        <div className="flex gap-3 flex-1">
                                            <i className={`${g.icon} text-[#3dccc7] mt-1`}></i>
                                            <div>
                                                <p className="text-sm opacity-90">{g.content}</p>
                                                <p className="text-xs opacity-50 mt-1">
                                                    Urutan {g.sort_order} · {g.is_active ? 'Aktif' : 'Nonaktif'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => openGuidelineModal(g)}
                                                className="text-[#3dccc7] text-xs font-semibold hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteGuideline(g.id)}
                                                className="text-red-500 text-xs font-semibold hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Modal show={!!moderatingPost} onClose={() => setModeratingPost(null)}>
                <div className="px-6 py-4 border-b border-[#cccccc] dark:border-[#404040] flex justify-between items-center text-black dark:text-white">
                    <h3 className="text-lg font-bold">Moderasi Postingan</h3>
                    <button onClick={() => setModeratingPost(null)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <form onSubmit={submitPostModeration} className="p-6 text-black dark:text-white">
                    <p className="text-sm opacity-70 mb-4 line-clamp-3">{moderatingPost?.content}</p>
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Status" className="text-black dark:text-white" />
                            <CustomSelect
                                value={postForm.data.status}
                                onChange={(val) => postForm.setData('status', val)}
                                options={[
                                    { value: 'active', label: 'Aktif (tampil)' },
                                    { value: 'hidden', label: 'Sembunyikan' },
                                    { value: 'removed', label: 'Tandai dihapus' }
                                ]}
                                className="mt-1"
                                dropdownClassName="w-full"
                            />
                            <InputError message={postForm.errors.status} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel value="Catatan moderasi (opsional)" className="text-black dark:text-white" />
                            <textarea
                                className="mt-1 w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200 text-black dark:text-white"
                                rows={3}
                                value={postForm.data.moderation_note}
                                onChange={(e) => postForm.setData('moderation_note', e.target.value)}
                            />
                            <InputError message={postForm.errors.moderation_note} className="mt-1" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={() => setModeratingPost(null)}>Batal</SecondaryButton>
                        <PrimaryButton disabled={postForm.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={!!resolvingReport} onClose={() => setResolvingReport(null)}>
                <div className="px-6 py-4 border-b border-[#cccccc] dark:border-[#404040] flex justify-between items-center text-black dark:text-white">
                    <h3 className="text-lg font-bold">Tinjau Laporan</h3>
                    <button onClick={() => setResolvingReport(null)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <form onSubmit={submitReportResolution} className="p-6 text-black dark:text-white">
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Keputusan" className="text-black dark:text-white" />
                            <CustomSelect
                                value={reportForm.data.status}
                                onChange={(val) => reportForm.setData('status', val)}
                                options={[
                                    { value: 'reviewed', label: 'Ditinjau & ditindak' },
                                    { value: 'dismissed', label: 'Abaikan laporan' }
                                ]}
                                className="mt-1"
                                dropdownClassName="w-full"
                            />
                        </div>
                        <div>
                            <InputLabel value="Catatan admin" className="text-black dark:text-white" />
                            <textarea
                                className="mt-1 w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200 text-black dark:text-white"
                                rows={3}
                                value={reportForm.data.admin_notes}
                                onChange={(e) => reportForm.setData('admin_notes', e.target.value)}
                            />
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={reportForm.data.hide_content}
                                onChange={(e) => reportForm.setData('hide_content', e.target.checked)}
                                className="rounded border-[#cccccc] dark:border-[#404040] bg-[#ffffff] dark:bg-[#2a2a2a] text-primary focus:ring-primary"
                            />
                            Sembunyikan konten yang dilaporkan
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={() => setResolvingReport(null)}>Batal</SecondaryButton>
                        <PrimaryButton disabled={reportForm.processing}>Selesai</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={isGuidelineModalOpen} onClose={() => setIsGuidelineModalOpen(false)}>
                <div className="px-6 py-4 border-b border-[#cccccc] dark:border-[#404040] flex justify-between items-center text-black dark:text-white">
                    <h3 className="text-lg font-bold">{editingGuideline ? 'Edit Pedoman' : 'Tambah Pedoman'}</h3>
                    <button onClick={() => setIsGuidelineModalOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <form onSubmit={submitGuideline} className="p-6 text-black dark:text-white">
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Icon (Font Awesome class)" className="text-black dark:text-white" />
                            <TextInput
                                className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200 text-black dark:text-white"
                                value={guidelineForm.data.icon}
                                onChange={(e) => guidelineForm.setData('icon', e.target.value)}
                            />
                        </div>
                        <div>
                            <InputLabel value="Isi pedoman" className="text-black dark:text-white" />
                            <textarea
                                className="mt-1 w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200 text-black dark:text-white"
                                rows={3}
                                value={guidelineForm.data.content}
                                onChange={(e) => guidelineForm.setData('content', e.target.value)}
                                required
                            />
                            <InputError message={guidelineForm.errors.content} className="mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Urutan" className="text-black dark:text-white" />
                                <TextInput
                                    type="number"
                                    className="mt-1 block w-full bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500 dark:placeholder-gray-300 transition duration-200 text-black dark:text-white"
                                    value={guidelineForm.data.sort_order}
                                    onChange={(e) => guidelineForm.setData('sort_order', parseInt(e.target.value, 10) || 0)}
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 text-sm pb-2">
                                    <input
                                        type="checkbox"
                                        checked={guidelineForm.data.is_active}
                                        onChange={(e) => guidelineForm.setData('is_active', e.target.checked)}
                                        className="rounded border-[#cccccc] dark:border-[#404040] bg-[#ffffff] dark:bg-[#2a2a2a] text-primary focus:ring-primary"
                                    />
                                    Aktif
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={() => setIsGuidelineModalOpen(false)}>Batal</SecondaryButton>
                        <PrimaryButton disabled={guidelineForm.processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={!!postToDelete} onClose={() => setPostToDelete(null)}>
                <div className="px-6 py-4 border-b border-[#cccccc] dark:border-[#404040] flex justify-between items-center text-black dark:text-white">
                    <h3 className="text-lg font-bold">Hapus postingan?</h3>
                    <button onClick={() => setPostToDelete(null)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
                </div>
                <div className="p-6 text-black dark:text-white">
                    <p className="text-sm opacity-70 mb-6">Postingan akan dihapus permanen beserta komentar dan interaksinya.</p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={() => setPostToDelete(null)}>Batal</SecondaryButton>
                        <DangerButton onClick={deletePost}>Hapus Permanen</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
