import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Calendar, Users, TrendingUp, Sparkles } from 'lucide-react';

export function AdminDashboard() {
    const [stats, setStats] = useState({ leaderboard: [], skill_stats: [] });
    const [loading, setLoading] = useState(true);
    const [generatedEvent, setGeneratedEvent] = useState(null);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/dashboard');
            setStats(response.data);
        } catch (error) {
            console.error("Failed to fetch admin stats", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateEvent = async () => {
        setGenerating(true);
        try {
            const response = await api.post('/admin/generate-event');
            setGeneratedEvent(response.data);
        } catch (error) {
            console.error("Failed to generate event", error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Intelligence Console</h1>
            </header>

            {/* Top Stats Row (Mock) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Users size={24} /></div>
                    <div>
                        <p className="text-sm text-[var(--text-secondary)]">Total Students</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.leaderboard?.length || 0}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-500"><TrendingUp size={24} /></div>
                    <div>
                        <p className="text-sm text-[var(--text-secondary)]">Avg Skill Score</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)]">68.5</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500"><Sparkles size={24} /></div>
                    <div>
                        <p className="text-sm text-[var(--text-secondary)]">Workshops Planned</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)]">3</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Table (New Requirement: Detailed Stats) */}
                <Card title="Student Performance Monitor" className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[var(--border-color)]">
                            <thead className="bg-[var(--bg-primary)]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Resume Score</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {stats.leaderboard.map((student, idx) => (
                                    <tr key={idx} className="hover:bg-[var(--bg-primary)] transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.score > 70 ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                                {Math.round(student.score)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">Active</td>
                                    </tr>
                                ))}
                                {stats.leaderboard.length === 0 && (
                                    <tr><td colSpan="3" className="px-6 py-4 text-center text-sm text-[var(--text-secondary)]">No students yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Skill Analytics */}
                <Card title="Skill Gap Landscape">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.skill_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="skill" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Bar dataKey="average" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        {stats.skill_stats.length === 0 && <p className="text-center text-sm text-[var(--text-secondary)]">No skill data available</p>}
                    </div>
                </Card>
            </div>

            {/* Event Planning Agent */}
            <Card title="AI Event Planner Agent" className="border-t-4 border-t-purple-500">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="max-w-xl">
                        <h4 className="text-lg font-medium text-[var(--text-primary)] flex items-center gap-2">
                            <Calendar size={20} className="text-purple-500" />
                            Interest-Based workshop Generator
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                            This agent analyzes student skill gaps to find the "Most Wanted" topic. It then generates a complete workshop plan to address this specific need.
                        </p>
                    </div>
                    <Button onClick={handleGenerateEvent} disabled={generating} className="bg-purple-600 hover:bg-purple-700">
                        {generating ? 'Analyzing Trends...' : 'Generate New Event'}
                    </Button>
                </div>

                {generatedEvent && (
                    <div className="mt-8 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles size={100} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/30 text-purple-300 border border-purple-800 uppercase tracking-widest">Recommended Event</span>
                                <span className="text-sm text-[var(--text-secondary)]">Based on high demand for: <strong className="text-white">{generatedEvent.skill_focus}</strong></span>
                            </div>

                            <h5 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{generatedEvent.title}</h5>
                            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl">{generatedEvent.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h6 className="font-semibold text-sm text-[var(--text-primary)] mb-3">Agenda</h6>
                                    <ul className="space-y-2">
                                        {generatedEvent.agenda?.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-sm text-[var(--text-primary)] mb-3">Expected Outcomes</h6>
                                    <ul className="space-y-2">
                                        {generatedEvent.expected_outcomes?.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                                <CheckCircle size={14} className="text-green-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
