import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null; // Jika hanya 1 halaman (Prev, 1, Next), sembunyikan

    return (
        <div className="flex flex-wrap items-center justify-center gap-1 mt-6">
            {links.map((link, index) => {
                const isActive = link.active;
                const isUrlNull = link.url === null;

                // Membersihkan teks &laquo; dan &raquo; bawaan Laravel
                let label = link.label;
                if (label.includes('&laquo;')) label = '«';
                if (label.includes('&raquo;')) label = '»';

                if (isUrlNull) {
                    return (
                        <span
                            key={index}
                            className="px-3 py-1.5 text-sm font-medium text-neutral-400 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-500 rounded-md cursor-not-allowed border border-transparent"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveState
                        preserveScroll
                        className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-colors ${
                            isActive
                                ? 'bg-[#3dccc7] text-white border-[#3dccc7] shadow-sm'
                                : 'bg-white dark:bg-[#2a2a2a] text-neutral-600 dark:text-neutral-300 border-[#cccccc] dark:border-[#404040] hover:bg-neutral-50 dark:hover:bg-neutral-700'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}
