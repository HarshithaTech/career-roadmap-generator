import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ className, title, children }) {
    return (
        <div className={twMerge(clsx("bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl rounded-xl p-6 transition-all hover:shadow-2xl", className))}>
            {title && <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-color)] pb-2">{title}</h3>}
            {children}
        </div>
    );
}
