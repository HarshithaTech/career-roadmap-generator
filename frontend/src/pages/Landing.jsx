import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircle, BarChart2, Calendar, Layout } from 'lucide-react';

export function Landing() {
    return (
        <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 text-center">
                    <div className="mb-8 flex justify-center">
                        <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-[var(--accent-primary)] ring-1 ring-[var(--border-color)] hover:ring-[var(--accent-primary)] bg-[var(--bg-secondary)]">
                            Now with AI Agent Workflow Planner
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
                        AI-Powered Resume Analysis & Career Planning
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                        Upload your resume, get instant scoring against industry standards, identify skill gaps, and receive a personalized 5-week learning roadmap. Bridge the gap between education and industry demand.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/register">
                            <Button className="px-8 py-3 text-lg shadow-blue-500/25">Get Started</Button>
                        </Link>
                        <Link to="/login" className="text-sm font-semibold leading-6 text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
                            Log in <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors group">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <CheckCircle size={28} />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">Instant Resume Scoring</h3>
                        <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
                            Our deterministic scoring engine evaluates your resume against top industry standards to give you an unbiased score.
                        </p>
                    </div>
                    <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors group">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <BarChart2 size={28} />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">Skill Gap Intelligence</h3>
                        <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
                            Identify missing skills compared to real-time market demand and industry trends using our AI analysis.
                        </p>
                    </div>
                    <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors group">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                            <Calendar size={28} />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)] group-hover:text-green-400 transition-colors">5-Week AI Roadmap</h3>
                        <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
                            Get a generated 5-week study plan tailored to fill your specific skill gaps and prepare you for your dream job.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
