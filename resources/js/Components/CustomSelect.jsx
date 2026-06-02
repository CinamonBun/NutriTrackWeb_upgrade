import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const SEARCH_THRESHOLD = 8;
const DEFAULT_MAX_LIST_HEIGHT = 'max-h-60';
const Z_BACKDROP = 9998;
const Z_DROPDOWN = 9999;

function normalizeValue(val) {
    if (val === null || val === undefined) return '';
    return String(val);
}

export default function CustomSelect({
    value,
    onChange,
    options = [],
    placeholder = 'Pilih...',
    className = '',
    dropdownClassName = 'w-full min-w-[150px]',
    searchable,
    searchPlaceholder = 'Cari...',
    maxListHeight = DEFAULT_MAX_LIST_HEIGHT,
    emptyMessage = 'Tidak ada hasil.',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef(null);
    const searchInputRef = useRef(null);

    const normalizedValue = normalizeValue(value);
    const isSearchable = searchable ?? options.length > SEARCH_THRESHOLD;

    const selectedOption = useMemo(
        () => options.find((opt) => normalizeValue(opt.value) === normalizedValue),
        [options, normalizedValue]
    );

    const filteredOptions = useMemo(() => {
        if (!isSearchable || !searchQuery.trim()) {
            return options;
        }

        const q = searchQuery.trim().toLowerCase();
        return options.filter((opt) => opt.label.toLowerCase().includes(q));
    }, [options, searchQuery, isSearchable]);

    const updateMenuPosition = useCallback(() => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const gap = 8;
        const minWidth = 180;

        setMenuPosition({
            top: rect.bottom + gap,
            left: rect.left,
            width: Math.max(rect.width, minWidth),
        });
    }, []);

    const closeDropdown = () => {
        setIsOpen(false);
        setSearchQuery('');
    };

    const openDropdown = () => {
        updateMenuPosition();
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) return;

        updateMenuPosition();

        const handleReposition = () => updateMenuPosition();
        window.addEventListener('resize', handleReposition);
        window.addEventListener('scroll', handleReposition, true);

        return () => {
            window.removeEventListener('resize', handleReposition);
            window.removeEventListener('scroll', handleReposition, true);
        };
    }, [isOpen, updateMenuPosition]);

    useEffect(() => {
        if (isOpen && isSearchable) {
            const t = setTimeout(() => searchInputRef.current?.focus(), 50);
            return () => clearTimeout(t);
        }
    }, [isOpen, isSearchable]);

    const dropdownPortal = isOpen && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
                <>
                    <motion.div
                        key="custom-select-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0"
                        style={{ zIndex: Z_BACKDROP }}
                        onClick={closeDropdown}
                        aria-hidden="true"
                    />
                    <motion.div
                        key="custom-select-menu"
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="fixed flex flex-col overflow-hidden rounded-xl border border-[#cccccc] bg-[#ffffff] shadow-xl dark:border-[#404040] dark:bg-[#2a2a2a]"
                        style={{
                            zIndex: Z_DROPDOWN,
                            top: menuPosition.top,
                            left: menuPosition.left,
                            width: menuPosition.width,
                            minWidth: 180,
                        }}
                    >
                        {isSearchable && (
                            <div className="shrink-0 overflow-hidden border-b border-[#cccccc] p-2 dark:border-[#404040]">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder={searchPlaceholder}
                                        className="w-full rounded-lg border border-[#cccccc] bg-neutral-50 py-2 pl-9 pr-3 text-sm text-black placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#404040] dark:bg-[#1a1a1a] dark:text-white"
                                    />
                                </div>
                                {options.length > 0 && (
                                    <p className="mt-1.5 px-1 text-[11px] opacity-50">
                                        {filteredOptions.length} dari {options.length} item
                                    </p>
                                )}
                            </div>
                        )}

                        <div className={`overflow-x-hidden overflow-y-auto overscroll-contain p-1.5 ${maxListHeight}`}>
                            <div className="space-y-0.5">
                                {filteredOptions.length === 0 ? (
                                    <p className="px-3 py-4 text-center text-sm opacity-60">{emptyMessage}</p>
                                ) : (
                                    filteredOptions.map((opt) => {
                                        const isSelected = normalizeValue(opt.value) === normalizedValue;
                                        return (
                                            <button
                                                key={String(opt.value)}
                                                type="button"
                                                onClick={() => {
                                                    onChange(opt.value);
                                                    closeDropdown();
                                                }}
                                                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${isSelected ? 'bg-primary/10 font-bold text-primary' : 'font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#333]'}`}
                                            >
                                                {opt.icon ? (
                                                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-primary/20' : 'bg-gray-100 dark:bg-[#1a1a1a]'}`}>
                                                        <i className={`${opt.icon} text-xs ${isSelected ? 'text-primary' : (opt.iconColor || 'opacity-70')}`}></i>
                                                    </div>
                                                ) : null}
                                                <span className="truncate">{opt.label}</span>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            </AnimatePresence>,
            document.body
        )
        : null;

    return (
        <div className={`relative overflow-hidden ${dropdownClassName}`}>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => (isOpen ? closeDropdown() : openDropdown())}
                className={`flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#cccccc] bg-[#ffffff] px-4 py-2.5 text-sm text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#404040] dark:bg-[#2a2a2a] dark:text-white ${className}`}
            >
                <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && (
                                <i className={`${selectedOption.icon} ${selectedOption.iconColor || 'text-primary'} shrink-0`}></i>
                            )}
                            <span className="truncate font-medium">{selectedOption.label}</span>
                        </>
                    ) : (
                        <span className="truncate font-medium opacity-70">{placeholder}</span>
                    )}
                </span>
                <i className={`fas fa-chevron-down shrink-0 text-[10px] opacity-50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {dropdownPortal}
        </div>
    );
}
