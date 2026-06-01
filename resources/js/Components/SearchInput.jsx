import React, { useState, useEffect, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';

export default function SearchInput({ initialValue = '', routeName, placeholder = "Search..." }) {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    // Native debounce implementation
    const debouncedSearch = useCallback(
        (query) => {
            const timeoutId = setTimeout(() => {
                router.get(
                    route(routeName),
                    { search: query },
                    { preserveState: true, preserveScroll: true, replace: true }
                );
            }, 300);
            return timeoutId;
        },
        [routeName]
    );

    const [timeoutId, setTimeoutId] = useState(null);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        const newTimeoutId = debouncedSearch(query);
        setTimeoutId(newTimeoutId);
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 opacity-50" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className="pl-10 pr-4 py-2 w-full sm:w-64 md:w-80 border border-[#cccccc] dark:border-[#404040] rounded-xl bg-[#ffffff] dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#3dccc7] focus:border-transparent transition-all text-sm"
            />
        </div>
    );
}
