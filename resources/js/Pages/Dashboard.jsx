import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import { usePage } from '@inertiajs/react';

export default function Dashboard({ auditLogs = [] }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <section className="pt-28 pb-12 md:pt-36 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-lg opacity-60 dark:opacity-70">Welcome back, <span
                            className="font-semibold">{auth?.user?.name || 'Admin'}</span>.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-8 shadow-sm flex items-center justify-center min-h-[200px]">
                                <p className="opacity-60 text-lg">Dashboard content goes here.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold mb-6">Audit Logs</h3>
                                <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                                    {auditLogs.length > 0 ? (
                                        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-700 ml-2 space-y-6 pb-4">
                                            {auditLogs.map((log) => (
                                                <div key={log.id} className="relative pl-6">
                                                    <div className="absolute w-3.5 h-3.5 bg-[#3dccc7] rounded-full -left-[9px] top-1.5 border-2 border-[#ffffff] dark:border-[#2a2a2a] shadow-sm"></div>
                                                    <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800">
                                                        <p className="text-sm leading-relaxed">
                                                            <span className="font-semibold text-[#3dccc7]">{log.actor?.name}</span> {log.action} <span className="font-semibold">{log.target?.name}</span>'s profile.
                                                        </p>
                                                        <span className="text-xs opacity-50 mt-1.5 flex items-center gap-1.5">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {new Date(log.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 opacity-60">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-sm">No recent activity.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </AuthenticatedLayout>
    );
}
