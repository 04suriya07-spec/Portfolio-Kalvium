import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Book, Briefcase, GraduationCap, ArrowRight, Shield, Zap, Target } from 'lucide-react';

const years = [
    {
        year: 'Year 01',
        title: 'The Ignition',
        period: '2024 - 2025',
        theme: 'Foundations & Logic',
        description: 'The journey began with mastering the basics of computer science, algorithmic thinking, and the core of the Kalvium philosophy.',
        milestones: [
            { icon: Book, text: 'Mastering DSA & Problem Solving' },
            { icon: Zap, text: 'First Portfolio Deployment' },
            { icon: Target, text: 'Kalvium Orientation & Squad Formation' },
        ],
        status: 'completed',
        color: '#00f2fe'
    },
    {
        year: 'Year 02',
        title: 'Atmospheric Ascent',
        period: '2025 - 2026',
        theme: 'Web Master & Scalability',
        description: 'Currently deep-diving into full-stack engineering, building production-grade web applications, and contributing to open source.',
        milestones: [
            { icon: Briefcase, text: 'Internship Residency Initiated' },
            { icon: Rocket, text: 'React & Node.js Mastery' },
            { icon: Shield, text: 'System Security Foundations' },
        ],
        status: 'current',
        color: '#f0abfc'
    },
    {
        year: 'Year 03',
        title: 'Neural Expansion',
        period: '2026 - 2027',
        theme: 'AI & Specialized Systems',
        description: 'Future focuses include deep learning, neural networks, and integrating artificial intelligence into autonomous digital environments.',
        milestones: [
            { icon: Zap, text: 'AI Agent Development' },
            { icon: Target, text: 'Advanced Machine Learning' },
            { icon: Shield, text: 'Cloud Infrastructure Specialization' },
        ],
        status: 'upcoming',
        color: '#4ade80'
    },
    {
        year: 'Year 04',
        title: 'Celestial Orbit',
        period: '2027 - 2028',
        theme: 'Industry Capstone',
        description: 'The final phase involves global industry placement, building enterprise-scale systems, and graduating as a Kalvium elite engineer.',
        milestones: [
            { icon: GraduationCap, text: 'Capstome Project Deployment' },
            { icon: Briefcase, text: 'Global Industry Placement' },
            { icon: Rocket, text: 'Graduation & Legacy Establishment' },
        ],
        status: 'upcoming',
        color: '#fbbf24'
    }
];

const Journey = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-[400px] -mt-[400px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -ml-[400px] -mb-[400px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-secondary mb-4"
                    >
                        <GraduationCap className="w-5 h-5" />
                        <span className="font-black text-[10px] uppercase tracking-[0.4em] italic">B.Tech_Registry // Kalvium_Mission_48</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 text-slate-900 dark:text-white">
                        The 4-Year <span className="text-glow text-secondary">Journey</span>
                    </h2>
                    <p className="text-slate-600 dark:text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium italic">
                        Mapping the evolution of Squad 139 from recruits to elite engineering operatives.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-24">
                        {years.map((y, idx) => (
                            <motion.div
                                key={y.year}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Year Display */}
                                <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 group">
                                    <div
                                        className="relative p-10 glass-card rounded-[3.5rem] border-2 border-slate-200 dark:border-white/5 hover:border-secondary/30 transition-all text-center md:text-right"
                                        style={{ '--accent': y.color }}
                                    >
                                        <span className="text-5xl md:text-7xl font-black italic tracking-tighter mb-2 block" style={{ color: y.color }}>
                                            {y.year}
                                        </span>
                                        <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.5em] mb-6 block italic">{y.period}</span>
                                        <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-4 text-slate-900 dark:text-white">{y.title}</h3>
                                        <p className="text-sm text-slate-600 dark:text-white/40 italic font-medium leading-relaxed max-w-sm ml-auto">
                                            {y.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Center Icon */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-dark-900 border-2 border-slate-200 dark:border-white/10 flex items-center justify-center z-20 shadow-xl hidden md:flex">
                                    <div className={`w-3 h-3 rounded-full ${y.status === 'current' ? 'bg-secondary animate-pulse shadow-secondary/50 shadow-lg' : y.status === 'completed' ? 'bg-primary' : 'bg-slate-700'}`} />
                                </div>

                                {/* Milestone Content */}
                                <div className="md:w-1/2 md:pl-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 text-secondary">
                                            <div className="w-10 h-px bg-secondary/30" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">{y.theme}</span>
                                        </div>
                                        <div className="grid gap-4">
                                            {y.milestones.map((m, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ x: 10 }}
                                                    className="flex items-center gap-6 p-4 glass rounded-2xl border border-slate-200 dark:border-white/5 hover:border-secondary/20 transition-all group"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center border border-secondary/10 group-hover:bg-secondary/20 transition-colors">
                                                        <m.icon className="w-5 h-5 text-secondary" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 dark:text-white/70 italic uppercase tracking-wider">{m.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Destination Hook */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-40 p-12 md:p-20 glass-card rounded-[4rem] text-center border-2 border-secondary/20 relative overflow-hidden"
                >
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 blur-[80px]" />
                    <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter text-slate-900 dark:text-white">
                        Destination: <span className="text-secondary text-glow">Excellence</span>
                    </h3>
                    <p className="text-slate-600 dark:text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium italic">
                        By 2028, Squad 139 will have transitioned from students to industry-defining engineers. The journey is already written.
                    </p>
                    <div className="flex justify-center">
                        <div className="px-10 py-5 bg-secondary text-slate-950 font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-neon italic self-center">
                            Mission Protocol Active
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Journey;
