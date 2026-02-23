import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github, Linkedin, Download, ArrowLeft,
    ExternalLink, Calendar, Briefcase, Award,
    Trophy, GraduationCap, Zap, Maximize2, X,
    ChevronDown, ChevronUp, Star, Medal,
    LayoutGrid, Code2, Rocket, Image as ImageIcon,
    Activity, Target, Heart, Share2, Shield, Globe, Cpu,
    Terminal, Database, Palette, Smartphone
} from 'lucide-react';
import client from '../lib/sanityClient';
import { clsx } from 'clsx';

const SkillIcon = ({ name }) => {
    const normalized = name.toLowerCase();
    const style = "p-2 rounded-xl border transition-all duration-300 group-hover:scale-110";

    if (normalized.includes('javascript')) return <div className={`${style} bg-yellow-500/10 border-yellow-500/20 text-yellow-400`}><Zap className="w-5 h-5 shadow-[0_0_10px_rgba(250,204,21,0.3)]" /></div>;
    if (normalized.includes('python')) return <div className={`${style} bg-blue-500/10 border-blue-500/20 text-blue-400`}><Terminal className="w-5 h-5 shadow-[0_0_10px_rgba(96,165,250,0.3)]" /></div>;
    if (normalized.includes('react') || normalized.includes('next')) return <div className={`${style} bg-cyan-500/10 border-cyan-500/20 text-cyan-400`}><Cpu className="w-5 h-5 shadow-[0_0_10px_rgba(34,211,238,0.3)]" /></div>;
    if (normalized.includes('dsa') || normalized.includes('logic')) return <div className={`${style} bg-green-500/10 border-green-500/20 text-green-400`}><Target className="w-5 h-5 shadow-[0_0_10px_rgba(74,222,128,0.3)]" /></div>;
    if (normalized.includes('figma') || normalized.includes('design')) return <div className={`${style} bg-pink-500/10 border-pink-500/20 text-pink-400`}><Palette className="w-5 h-5 shadow-[0_0_10px_rgba(244,114,182,0.3)]" /></div>;
    if (normalized.includes('node') || normalized.includes('database')) return <div className={`${style} bg-emerald-500/10 border-emerald-500/20 text-emerald-400`}><Database className="w-5 h-5 shadow-[0_0_10px_rgba(52,211,153,0.3)]" /></div>;

    return <div className={`${style} bg-primary/10 border-primary/20 text-primary`}><Zap className="w-5 h-5" /></div>;
};

const TabButton = ({ active, icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 relative ${active ? 'text-primary' : 'text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/60'
            }`}
    >
        {active && (
            <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <Icon className={`w-5 h-5 relative z-10 ${active ? 'animate-pulse' : ''}`} />
        <span className="font-bold text-sm tracking-wide relative z-10">{label}</span>
    </button>
);

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="glass-card rounded-[2rem] p-6 flex items-center gap-6 group hover:scale-[1.02] transition-transform border border-slate-200/50 dark:border-white/5">
        <div className={`p-4 rounded-2xl bg-${color}/10 border border-${color}/20 text-${color} group-hover:rotate-12 transition-transform`} style={{ color }}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 mb-1">{label}</p>
            <p className="text-2xl font-black font-outfit text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const StudentProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // overview, tech, work, log
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchStudent = async () => {
            try {
                const query = `*[_type == "student" && _id == $id][0] {
                    "id": _id,
                    name,
                    role,
                    summary,
                    "image": photo.asset->url,
                    techDojo[] {
                        skill,
                        belt,
                        level
                    },
                    deployments[] {
                        title,
                        summary,
                        "image": image.asset->url,
                        github,
                        liveUrl,
                        status
                    },
                    internships[] {
                        company,
                        role,
                        startDate,
                        endDate,
                        description,
                        "certificate": certificate.asset->url
                    },
                    kalviumRecords,
                    squadMerits,
                    extracurricular,
                    linkedin,
                    github,
                    "resume": resume.asset->url,
                    memories[] {
                        "image": photo.asset->url,
                        caption
                    }
                }`;
                const data = await client.fetch(query, { id });
                setStudent(data);
                setIsInitializing(false);
            } catch (error) {
                console.error("Error fetching student:", error);
                setIsInitializing(false);
            }
        };

        fetchStudent();
    }, [id]);

    if (!student && !isInitializing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-dark-900 transition-colors">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <X className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-4xl font-black mb-6 font-outfit uppercase tracking-tighter">Profile Not Found</h1>
                    <p className="text-slate-500 dark:text-white/40 mb-10 max-w-xs mx-auto text-[10px] font-bold uppercase tracking-widest">The core signature you're looking for doesn't exist in our current deployment.</p>
                    <Link to="/squad" className="btn-primary py-4 px-10 text-[10px] uppercase tracking-widest">Return to Collective</Link>
                </motion.div>
            </div>
        );
    }

    if (isInitializing) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-dark-900 flex flex-col items-center justify-center overflow-hidden transition-colors">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative flex flex-col items-center"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-t-2 border-r-2 border-primary rounded-full mb-8 relative z-10"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center z-10"
                    >
                        <h2 className="text-xs font-black text-primary uppercase tracking-[0.6em] mb-2">Initializing</h2>
                        <span className="text-2xl font-black font-outfit uppercase tracking-tighter">{student?.name?.split(' ')[0] || 'System'} Portfolio</span>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutGrid },
        { id: 'tech', label: 'Tech Dojo', icon: Code2 },
        { id: 'work', label: 'Operations', icon: Rocket },
        { id: 'log', label: 'Visual Log', icon: ImageIcon },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden transition-colors"
        >
            {/* Dynamic Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* App Header Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 text-slate-400 dark:text-white/40 hover:text-primary transition-colors group px-6 py-3 glass rounded-2xl border border-slate-200 dark:border-white/5 shadow-xl shadow-black/5 dark:shadow-black/20"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase italic">System: Exit Portfolio</span>
                    </button>

                    <div className="flex p-1.5 glass rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white/5 dark:bg-white/5 backdrop-blur-3xl shadow-2xl">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                active={activeTab === tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link Signature Copied to Clipboard!");
                            }}
                            className="p-3 glass rounded-2xl border border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/40 hover:text-primary transition-all active:scale-95 group"
                        >
                            <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Sidebar: App Mini Profile */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card rounded-[3rem] p-1 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.4)] transition-all duration-700 hover:shadow-primary/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="bg-white dark:bg-dark-900 rounded-[2.8rem] p-8 relative z-10 border border-slate-200 dark:border-white/5">
                                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8 shadow-2xl ring-1 ring-slate-200 dark:ring-white/10">
                                    <motion.img
                                        layoutId={`student-image-${student.id}`}
                                        src={student.image}
                                        alt={student.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white dark:from-dark-900 via-transparent to-transparent opacity-60 dark:opacity-100" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h1 className="text-4xl font-black font-outfit mb-1 tracking-tighter text-slate-900 dark:text-white">{student.name}</h1>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-full">
                                                <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">{student.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/20 transition-colors group/focus">
                                        <div className="flex items-center justify-between mb-4 text-slate-500 dark:text-white/40">
                                            <span className="text-[10px] font-black uppercase tracking-widest italic">Core Status</span>
                                            <Target className="w-4 h-4 group-hover/focus:text-primary transition-colors" />
                                        </div>
                                        <p className="text-slate-900 dark:text-white font-black text-lg leading-snug font-outfit uppercase tracking-tight">Active Operative</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {student.linkedin && (
                                            <a href={student.linkedin} target="_blank" className="btn-secondary py-5 px-0 flex justify-center group rounded-3xl">
                                                <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
                                            </a>
                                        )}
                                        {student.github && (
                                            <a href={student.github} target="_blank" className="btn-secondary py-5 px-0 flex justify-center group rounded-3xl">
                                                <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
                                            </a>
                                        )}
                                    </div>
                                    <a href={student.resume} target="_blank" className="w-full btn-primary py-5 px-0 flex justify-center items-center gap-3 rounded-3xl shadow-[0_20px_40px_rgba(0,242,254,0.15)] group overflow-hidden relative">
                                        <motion.div
                                            animate={{ x: ['100%', '-100%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-white/10 skew-x-12"
                                        />
                                        <span className="font-black text-xs uppercase tracking-widest relative z-10">Download Resume</span>
                                        <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform relative z-10" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            <StatCard
                                label="Technical Power"
                                value={`${(() => {
                                    const totalPoints = student.techDojo?.reduce((acc, s) => acc + (s.level || 0), 0) || 0;
                                    // Calculate power out of 28 (Goal: 4 main languages mastered at Level 7)
                                    return Math.min(100, Math.round((totalPoints / 28) * 100));
                                })()}%`}
                                icon={Activity}
                                color="#00f2fe"
                            />
                            <StatCard label="Deployments" value={student.deployments?.length || 0} icon={Briefcase} color="#f0abfc" />
                        </div>
                    </div>

                    {/* Main Workspace Area */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="space-y-12"
                            >
                                {activeTab === 'overview' && (
                                    <div className="space-y-12">
                                        {/* Bio Section */}
                                        <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
                                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Zap className="w-32 h-32" />
                                            </div>
                                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-8 italic flex items-center gap-3">
                                                <div className="w-8 h-[2px] bg-primary" /> About me
                                            </h2>
                                            <p className="text-3xl md:text-4xl text-slate-800 dark:text-blue-50 leading-tight font-outfit font-light italic">
                                                "{student.summary}"
                                            </p>
                                        </div>

                                        {/* Experience Timeline Mini */}
                                        <div className="glass-card rounded-[3rem] p-10 shadow-2xl border border-slate-200/50 dark:border-white/5">
                                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-10 italic flex items-center gap-3">
                                                <div className="w-8 h-[2px] bg-primary" /> Honors & Recognition
                                            </h2>
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div className="space-y-4">
                                                    <span className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest flex items-center gap-2">
                                                        <Trophy className="w-3 h-3 text-primary shadow-sm shadow-primary/20" /> Kalvium Records
                                                    </span>
                                                    {student.kalviumRecords?.map(a => (
                                                        <div key={a} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center gap-4 group hover:bg-primary/5 transition-all hover:border-primary/20">
                                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                            <span className="text-sm font-bold text-slate-700 dark:text-white/70">{a}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="space-y-4">
                                                    <span className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest flex items-center gap-2">
                                                        <Medal className="w-3 h-3 text-accent shadow-sm shadow-accent/20" /> Squad Merits
                                                    </span>
                                                    {student.squadMerits?.map(a => (
                                                        <div key={a} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center gap-4 group hover:bg-accent/5 transition-all hover:border-accent/20">
                                                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                                            <span className="text-sm font-bold text-slate-700 dark:text-white/70">{a}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Extracurricular Section */}
                                        <div className="glass-card rounded-[3rem] p-10 shadow-2xl border border-slate-200/50 dark:border-white/5">
                                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-10 italic flex items-center gap-3">
                                                <div className="w-8 h-[2px] bg-primary" /> Extracurricular Activities
                                            </h2>
                                            <div className="flex flex-wrap gap-4">
                                                {student.extracurricular?.map(act => (
                                                    <div key={act} className="px-6 py-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3 group hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                                                        <Heart className="w-4 h-4 text-slate-400 dark:text-white/30 group-hover:text-primary transition-colors" />
                                                        <span className="font-bold text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white">{act}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'tech' && (
                                    <div className="space-y-12">
                                        {/* DOJO Section Header */}
                                        <div className="flex items-center justify-between border-b-2 border-slate-900/10 dark:border-white/10 pb-4">
                                            <h1 className="text-4xl font-black font-outfit uppercase tracking-tighter text-slate-900 dark:text-white">DOJO</h1>
                                            <div className="flex items-center gap-8 text-slate-900 dark:text-white">
                                                <div className="flex items-center gap-2 cursor-pointer hover:opacity-70">
                                                    <Activity className="w-5 h-5 rotate-90" />
                                                    <X className="w-3 h-3 -ml-2 mb-2" />
                                                </div>
                                                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                                                        <span className="text-[10px] font-bold">?</span>
                                                    </div>
                                                    <span className="text-sm font-bold uppercase tracking-tight">Workout</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Coding Workouts Title with Line */}
                                        <div className="flex items-center gap-4 py-8">
                                            <div className="p-2 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-sm italic">
                                                <Code2 className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-xl font-black font-outfit uppercase tracking-tight text-slate-800 dark:text-white flex-shrink-0">Coding Workouts</h2>
                                            <div className="h-[1px] w-full bg-slate-200 dark:bg-white/10" />
                                        </div>

                                        <div className="space-y-16">
                                            {student.techDojo?.map((item, idx) => {
                                                const segments = [1, 2, 3, 4, 5, 6, 7];
                                                const segmentColors = [
                                                    'bg-yellow-400', // LVL 1
                                                    'bg-orange-500', // LVL 2
                                                    'bg-green-500',  // LVL 3
                                                    'bg-blue-500',   // LVL 4
                                                    'bg-indigo-500', // LVL 5
                                                    'bg-purple-600', // LVL 6
                                                    'bg-slate-950'   // LVL 7 (Master)
                                                ];

                                                return (
                                                    <motion.div
                                                        key={item.skill}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-slate-100 dark:border-white/5 last:border-0"
                                                    >
                                                        <div className="space-y-6 flex-1">
                                                            <div className="flex items-center gap-8">
                                                                <h3 className="text-xl font-black font-outfit text-slate-800 dark:text-white w-24">{item.skill}</h3>
                                                                <div className="flex gap-2">
                                                                    {segments.map((seg) => (
                                                                        <div
                                                                            key={seg}
                                                                            className={clsx(
                                                                                "w-8 h-8 -skew-x-[20deg] rounded-sm transition-all duration-700",
                                                                                seg <= (item.level || 0)
                                                                                    ? segmentColors[seg - 1]
                                                                                    : "bg-slate-100 dark:bg-white/[0.03]"
                                                                            )}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <div className={clsx(
                                                                    "px-8 py-2.5 -skew-x-[20deg] rounded-sm relative overflow-hidden flex items-center gap-3",
                                                                    item.belt === 'white' && "bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10",
                                                                    item.belt === 'yellow' && "bg-yellow-400/10 border border-yellow-400/20",
                                                                    item.belt === 'orange' && "bg-orange-500/10 border border-orange-500/20",
                                                                    item.belt === 'green' && "bg-green-500/5 border border-green-500/20",
                                                                    item.belt === 'blue' && "bg-blue-500/10 border border-blue-500/20",
                                                                    item.belt === 'brown' && "bg-amber-900/10 border border-amber-900/20",
                                                                    item.belt === 'black' && "bg-slate-950 text-white border border-white/10"
                                                                )}>
                                                                    <div className="skew-x-[20deg] text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-white/70">
                                                                        {item.belt || 'White'} Belt
                                                                    </div>
                                                                    {item.level >= 3 && (
                                                                        <div className="skew-x-[20deg] flex items-center justify-center text-green-500">
                                                                            <Activity className="w-3.5 h-3.5" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <button className="px-12 py-5 bg-[#6b5b95]/10 dark:bg-[#6b5b95]/20 border border-[#6b5b95]/30 rounded-sm text-[#4a3a6b] dark:text-[#a294c4] font-black uppercase text-xs tracking-[0.2em] hover:bg-[#4a3a6b] hover:text-white transition-all shadow-xl shadow-purple-500/5">
                                                            Start Workout
                                                        </button>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'work' && (
                                    <div className="space-y-12">
                                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-10 italic flex items-center gap-3">
                                            <div className="w-8 h-[2px] bg-primary" /> Active Deployments
                                        </h2>
                                        {/* Deployments Section */}
                                        <div className="grid gap-8">
                                            {student.deployments?.map((project, idx) => (
                                                <div key={project.title} className="glass-card rounded-[3rem] overflow-hidden group flex flex-col md:flex-row shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-700">
                                                    <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden relative">
                                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                        <div className="absolute inset-0 bg-slate-900/10 dark:bg-dark-900/40" />
                                                        {project.status && (
                                                            <div className="absolute top-6 left-6 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full">
                                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">{project.status}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-10 md:w-3/5 flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="text-3xl font-black mb-4 font-outfit tracking-tighter uppercase italic text-slate-800 dark:text-white">{project.title}</h3>
                                                            <p className="text-slate-600 dark:text-white/60 leading-relaxed mb-8 text-lg font-light italic">{project.summary}</p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            {project.github && (
                                                                <a href={project.github} target="_blank" className="flex-1 px-6 py-4 border border-slate-200 dark:border-white/10 rounded-2xl flex justify-center items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                                                                    <Github className="w-4 h-4 text-slate-400" /> <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">Source</span>
                                                                </a>
                                                            )}
                                                            {project.liveUrl && (
                                                                <a href={project.liveUrl} target="_blank" className="flex-1 btn-primary py-4 rounded-2xl flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                                                    <ExternalLink className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">Live Ops</span>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mt-20 mb-10 italic flex items-center gap-3">
                                            <div className="w-8 h-[2px] bg-primary" /> Internships
                                        </h2>
                                        <div className="space-y-6">
                                            {student.internships?.map((intern, idx) => (
                                                <div key={intern.company} className="glass-card rounded-[2.5rem] p-10 border-l-8 border-l-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 shadow-2xl border border-slate-200/50 dark:border-white/5">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                                        <div>
                                                            <h3 className="text-2xl font-black font-outfit italic uppercase tracking-tight text-slate-800 dark:text-white">{intern.role}</h3>
                                                            <p className="text-primary font-black text-lg italic tracking-wide">{intern.company}</p>
                                                        </div>
                                                        <span className="text-slate-500 dark:text-white/40 text-[10px] font-black px-6 py-2 glass rounded-full h-fit uppercase tracking-[0.2em] italic border border-slate-200/50 dark:border-white/10">
                                                            Period: {intern.startDate || 'N/A'} - {intern.endDate || 'Present'}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-white/60 mb-8 leading-relaxed text-lg font-light italic">{intern.description}</p>
                                                    {intern.certificate && (
                                                        <a
                                                            href={intern.certificate}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            View Certificate
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'log' && (
                                    <div className="space-y-12">
                                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-10 italic flex items-center gap-3">
                                            <div className="w-8 h-[2px] bg-primary" /> Visual Archive
                                        </h2>
                                        <div className="columns-1 md:columns-2 gap-8 space-y-8">
                                            {student.memories?.map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="relative group cursor-pointer rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/5"
                                                    onClick={() => setSelectedImage(item.image)}
                                                >
                                                    <img src={item.image} alt={`Log ${idx}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" />
                                                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-md p-8">
                                                        <div className="bg-slate-900/80 dark:bg-dark-900/80 p-6 rounded-full ring-1 ring-white/20 mb-4">
                                                            <Maximize2 className="text-white w-8 h-8 animate-pulse" />
                                                        </div>
                                                        {item.caption && (
                                                            <p className="text-white font-bold text-center text-sm uppercase tracking-widest">{item.caption}</p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div >

            {/* Cinematic Modal */}
            < AnimatePresence >
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/98 dark:bg-dark-900/98 flex items-center justify-center p-4 md:p-12 backdrop-blur-[50px]"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="fixed top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] p-4 bg-white/10 rounded-full backdrop-blur-3xl hover:bg-white/20" onClick={() => setSelectedImage(null)}>
                            <X className="w-10 h-10" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 relative z-[105]"
                            alt="Archive Preview"
                        />
                    </motion.div>
                )}
            </AnimatePresence >
        </motion.div >
    );
};

export default StudentProfile;
