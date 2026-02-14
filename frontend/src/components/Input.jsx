import React from 'react';

export function Input({ className = '', ...props }) {
    return (
        <input
            className={`w-full px-4 py-2 rounded-lg border-2 border-[var(--border-color)] 
                bg-[var(--input-bg)] 
                text-white
                focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20
                focus:shadow-lg focus:shadow-purple-500/10
                placeholder:text-[var(--text-tertiary)]
                transition-all duration-200
                ${className}`}
            {...props}
        />
    );
}
