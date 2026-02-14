import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { LogOut, LayoutDashboard, User, Trophy } from 'lucide-react';

export function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
            <nav className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                ResuAgent
                            </Link>
                            {user && (
                                <div className="hidden md:flex ml-10 items-center space-x-1">
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                                        <Button variant={isActive(user.role === 'admin' ? '/admin' : '/dashboard') ? 'primary' : 'secondary'} className="flex items-center gap-2 text-sm bg-transparent border-0 shadow-none">
                                            <LayoutDashboard size={18} /> Dashboard
                                        </Button>
                                    </Link>
                                    {user.role === 'student' && (
                                        <Link to="/leaderboard">
                                            <Button variant={isActive('/leaderboard') ? 'primary' : 'secondary'} className="flex items-center gap-2 text-sm bg-transparent border-0 shadow-none">
                                                <Trophy size={18} /> Leaderboard
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2 hidden sm:flex">
                                        <User size={18} /> {user.email}
                                    </span>
                                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white hover:border-red-500 hover:bg-red-500/10">
                                        <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link to="/login" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium">Login</Link>
                                    <Link to="/register">
                                        <Button>Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
