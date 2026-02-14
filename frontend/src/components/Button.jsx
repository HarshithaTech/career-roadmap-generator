import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ className, variant = 'primary', ...props }) {
    const baseStyles = "px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] shadow-lg shadow-blue-500/30",
        secondary: "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        outline: "border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white"
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], className))}
            {...props}
        />
    );
}
