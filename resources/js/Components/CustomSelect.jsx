import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomSelect({
    value,
    onChange,
    options = [],
    placeholder = "Pilih...",
    className = "",
    dropdownClassName = "w-full min-w-[150px]"
}) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative ${dropdownClassName}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full justify-between transition-colors text-black dark:text-white ${className}`}
            >
                <span className="flex items-center gap-2 overflow-hidden">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && (
                                <i className={`${selectedOption.icon} ${selectedOption.iconColor || 'text-primary'}`}></i>
                            )}
                            <span className="font-medium truncate">{selectedOption.label}</span>
                        </>
                    ) : (
                        <span className="opacity-70 font-medium truncate">{placeholder}</span>
                    )}
                </span>
                <i className={`fas fa-chevron-down text-[10px] opacity-50 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsOpen(false)}
                        ></div>
                        <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-2 left-0 w-full min-w-[180px] bg-[#ffffff] dark:bg-[#2a2a2a] border border-[#cccccc] dark:border-[#404040] rounded-xl shadow-xl z-50 overflow-hidden"
                            style={{ isolation: 'isolate' }}
                        >
                            <div className="p-1.5 space-y-0.5">
                                {options.map(opt => {
                                    const isSelected = value === opt.value;
                                    return (
                                        <button
                                            key={String(opt.value)}
                                            type="button"
                                            onClick={() => { onChange(opt.value); setIsOpen(false); }}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 ${isSelected ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-100 dark:hover:bg-[#333] text-gray-700 dark:text-gray-300 font-medium'}`}
                                        >
                                            {opt.icon ? (
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary/20' : 'bg-gray-100 dark:bg-[#1a1a1a]'}`}>
                                                    <i className={`${opt.icon} text-xs ${isSelected ? 'text-primary' : (opt.iconColor || 'opacity-70')}`}></i>
                                                </div>
                                            ) : null}
                                            <span className="truncate">{opt.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
