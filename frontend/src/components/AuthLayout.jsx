import React from 'react';
import { Link } from 'react-router-dom';

export function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)]">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                        ResuAgent
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}
