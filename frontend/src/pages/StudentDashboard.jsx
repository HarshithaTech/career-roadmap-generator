import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import api from '../api/axios';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, Target, BookOpen, ExternalLink, Youtube, MonitorPlay, Sparkles } from 'lucide-react';

export function StudentDashboard() {
    const [step, setStep] = useState(1); // 1: Upload, 2: Target Role, 3: Results
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [scoreData, setScoreData] = useState(null);
    const [roadmap, setRoadmap] = useState(null);
    const [loadingRoadmap, setLoadingRoadmap] = useState(false);
    const [targetRole, setTargetRole] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    // --- File Handling ---
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const clickFileInput = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setScoreData(response.data);
            setStep(2); // Move to Target Role step
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload resume.");
        } finally {
            setUploading(false);
        }
    };

    // --- Roadmap Generation ---
    const handleGenerateRoadmap = async () => {
        if (!targetRole) {
            alert("Please enter a target role/dream job first.");
            return;
        }
        setLoadingRoadmap(true);
        try {
            const response = await api.get(`/resume/roadmap?target_role=${encodeURIComponent(targetRole)}`);
            setRoadmap(response.data);
            setStep(3); // Move to Results step
        } catch (error) {
            console.error("Roadmap failed", error);
        } finally {
            setLoadingRoadmap(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex flex-col items-start gap-2">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Career Hub</h1>
                <p className="text-[var(--text-secondary)]">Your AI-powered path to your dream job.</p>
            </header>

            {/* STEP 1: UPLOAD */}
            {step === 1 && (
                <div className="max-w-2xl mx-auto mt-12 animate-fade-in">
                    <Card title="Step 1: Upload Your Resume" className="border-t-4 border-t-blue-500">
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer
                                ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-[var(--border-color)] hover:border-[var(--accent-primary)]'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={clickFileInput}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.docx,.txt"
                                className="hidden"
                            />
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-[var(--bg-primary)] rounded-full border border-[var(--border-color)]">
                                    <Upload className="h-10 w-10 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-[var(--text-primary)]">
                                        {file ? file.name : "Drag & Drop or Click to Upload"}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                                        Support for PDF, DOCX (Max 5MB)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button onClick={handleUpload} disabled={!file || uploading} className="w-full md:w-auto px-8">
                                {uploading ? 'Analyzing Resume...' : 'Next: Identify Goals ->'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* STEP 2: DREAM JOB */}
            {step === 2 && (
                <div className="max-w-2xl mx-auto mt-12 animate-fade-in">
                    <Button variant="ghost" className="mb-4 text-sm" onClick={() => setStep(1)}>← Back to Upload</Button>
                    <Card className="border-t-4 border-t-purple-500 text-center py-12">
                        <div className="flex flex-col items-center gap-6">
                            <div className="p-4 bg-purple-500/10 rounded-full">
                                <Sparkles className="h-12 w-12 text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">What is your Dream Job?</h2>
                            <p className="text-[var(--text-secondary)] max-w-md">
                                Tell us the role you're aiming for (e.g., "Full Stack Developer", "Data Scientist").
                                We'll analyze the gap between your resume and this role.
                            </p>

                            <div className="w-full max-w-md space-y-4">
                                <div className="relative group">
                                    <Input
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        placeholder="e.g., Full Stack Developer, Data Scientist..."
                                        className="text-center text-xl font-semibold h-14 tracking-wide
                                            bg-gradient-to-br from-purple-950/50 to-blue-950/50
                                            border-purple-500/30 
                                            hover:border-purple-400/50
                                            placeholder:text-purple-300/40 placeholder:font-normal"
                                        autoFocus
                                    />
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                </div>
                                <Button
                                    onClick={handleGenerateRoadmap}
                                    disabled={!targetRole || loadingRoadmap}
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 border-none hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] transition-transform shadow-xl shadow-purple-900/30"
                                >
                                    {loadingRoadmap ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Designing Your Career Path...
                                        </span>
                                    ) : (
                                        'Generate Roadmap ✨'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* STEP 3: RESULTS DASHBOARD */}
            {step === 3 && scoreData && roadmap && (
                <div className="space-y-8 animate-fade-in">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your Detailed Analysis</h2>
                        <Button variant="outline" onClick={() => setStep(2)}>Change Target Role</Button>
                    </div>

                    {/* TOP ROW: SCORE & GAPS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Score Card */}
                        <Card className="flex flex-col items-center justify-center p-8 border-l-4 border-l-blue-500">
                            <h4 className="text-[var(--text-secondary)] uppercase tracking-wider text-xs font-bold mb-4">Resume Fit Score</h4>
                            <div className="relative">
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-[var(--bg-secondary)]" />
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * scoreData.score) / 100} className="text-blue-500" />
                                </svg>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[var(--text-primary)]">{Math.round(scoreData.score)}</span>
                            </div>
                            <p className="mt-4 text-sm text-[var(--text-secondary)]">for {targetRole}</p>
                        </Card>

                        {/* Gap Analysis */}
                        <Card title="Skill Gap Analysis" className="md:col-span-2 border-l-4 border-l-red-500">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold text-green-400 mb-2">
                                        <CheckCircle className="w-4 h-4" /> Skills You Have
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {scoreData.skills.map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-px bg-[var(--border-color)]"></div>
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold text-red-400 mb-2">
                                        <AlertCircle className="w-4 h-4" /> Missing Skills for {targetRole}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Extract missing skills from roadmap tasks/topics broadly or assume prompt returned them. 
                                            For now, we'll infer from the first few roadmap topics since we don't have a direct 'missing_skills' array in this response yet, 
                                            but let's use the topics from the roadmap as a proxy for what needs to be learned. */}
                                        {roadmap.weeks.flatMap(w => w.topics).slice(0, 8).map((topic, idx) => (
                                            <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* EXECUTION PLAN */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Timeline */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Target className="w-6 h-6 text-purple-500" />
                                5-Week Mastery Roadmap
                            </h3>

                            <div className="relative border-l-2 border-[var(--border-color)] ml-3 space-y-8 pl-8 pb-4">
                                {roadmap.weeks.map((week, idx) => (
                                    <div key={idx} className="relative animate-slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
                                        {/* Dot */}
                                        <span className="absolute -left-[41px] top-6 w-5 h-5 rounded-full bg-[var(--bg-primary)] border-4 border-purple-500"></span>

                                        <Card className="hover:border-purple-500/50 transition-all cursor-default group">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                                <h4 className="text-lg font-bold text-[var(--accent-primary)]">Week {week.week_number}: {week.topics.join(' & ')}</h4>
                                                <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded">
                                                    Step {idx + 1}/5
                                                </span>
                                            </div>
                                            <ul className="space-y-3 mb-4">
                                                {week.tasks.map((task, tIdx) => (
                                                    <li key={tIdx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="bg-purple-900/10 p-3 rounded-lg border border-purple-500/10">
                                                <p className="text-sm text-purple-300 font-medium">🎯 Outcome: {week.outcome}</p>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resources Column */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-teal-500" />
                                Curated Resources
                            </h3>
                            <Card className="bg-[var(--bg-secondary)] border-teal-500/20 sticky top-4">
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Use these free resources to bridge your gaps.
                                </p>
                                <div className="space-y-4">
                                    {roadmap.top_resources.map((res, idx) => (
                                        <a
                                            key={idx}
                                            href={res.url.startsWith('http') ? res.url : `https://www.google.com/search?q=${encodeURIComponent(res.name + ' ' + res.type)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-teal-500 hover:shadow-lg hover:shadow-teal-900/10 transition-all group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <span className="text-xs font-bold text-teal-400 px-2 py-0.5 bg-teal-950 rounded mb-2 inline-block">
                                                    {res.type}
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-teal-400" />
                                            </div>
                                            <h5 className="font-bold text-[var(--text-primary)] group-hover:text-teal-300 mb-1 leading-snug">
                                                {res.name}
                                            </h5>
                                            <p className="text-xs text-[var(--text-secondary)] truncate">
                                                {res.url}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

