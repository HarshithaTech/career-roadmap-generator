import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import api from '../api/axios';
import { Trophy, Medal, Award } from 'lucide-react';

export function Leaderboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            // Reusing the admin dashboard endpoint for now as it contains the leaderboard logic
            // In a real app, we'd have a dedicated /leaderboard endpoint
            const response = await api.get('/admin/dashboard');
            setData(response.data.leaderboard);
        } catch (error) {
            console.error("Failed to fetch leaderboard", error);
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (index) => {
        switch (index) {
            case 0: return <Trophy className="text-yellow-400 w-6 h-6" />;
            case 1: return <Medal className="text-gray-400 w-6 h-6" />;
            case 2: return <Award className="text-orange-400 w-6 h-6" />;
            default: return <span className="text-[var(--text-secondary)] font-bold">#{index + 1}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent inline-block">
                    Top Performers
                </h1>
                <p className="text-[var(--text-secondary)] mt-2">Recognizing excellence in skill development.</p>
            </header>

            <div className="max-w-3xl mx-auto space-y-4">
                {data.map((student, idx) => (
                    <div key={idx} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                        <div className="relative bg-[var(--bg-secondary)] rounded-xl p-4 flex items-center justify-between border border-[var(--border-color)]">
                            <div className="flex items-center gap-6">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[var(--bg-primary)] rounded-full border border-[var(--border-color)]">
                                    {getRankIcon(idx)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{student.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Student</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-[var(--accent-primary)]">{Math.round(student.score)}</div>
                                <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Score</div>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && data.length === 0 && (
                    <div className="text-center py-10 text-[var(--text-secondary)]">
                        No rankings available yet. Be the first to upload a resume!
                    </div>
                )}
            </div>
        </div>
    );
}
