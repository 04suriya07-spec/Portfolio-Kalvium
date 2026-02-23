import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import client from '../../lib/sanityClient';
import { clsx } from 'clsx';

const Roadmap = () => {
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "squadRoadmap"][0].milestones`).then(data => setMilestones(data || []));
    }, []);

    return (
        <section className="py-20" id="roadmap">
            <div className="flex flex-col items-center mb-24 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-6 italic"
                >
                    System Roadmap 2024-2025
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter text-slate-900 dark:text-white mb-6 italic">
                    The Journey
                </h2>
                <div className="w-24 h-1.5 bg-primary mb-8 -skew-x-[20deg]" />
                <p className="text-slate-500 dark:text-white/60 text-center max-w-2xl font-medium italic text-lg">
                    Squad 139 is on a mission to evolve. Follow our strategic milestones, real-time progress, and upcoming initiatives.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto px-4">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block opacity-20" />

                <div className="space-y-32">
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={clsx(
                                "relative flex items-center gap-12 md:gap-0",
                                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                            )}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-8 md:left-1/2 w-8 h-8 md:w-10 md:h-10 transform -translate-x-1/2 z-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                                <div className={clsx(
                                    "relative w-4 h-4 rounded-full border-4 border-slate-900 dark:border-dark-900 z-10 shadow-neon",
                                    item.status === 'completed' ? 'bg-green-500' : 'bg-primary'
                                )} />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-[45%] relative z-10">
                                <div className="glass-card rounded-[3rem] p-10 hover:shadow-2xl hover:shadow-primary/5 transition-all group border border-slate-200/50 dark:border-white/5 relative overflow-hidden">
                                    {/* Progress Background */}
                                    <div
                                        className="absolute top-0 left-0 h-1 bg-primary/20 transition-all duration-1000"
                                        style={{ width: `${item.progress}%` }}
                                    />

                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-black tracking-[0.4em] text-primary uppercase italic mb-1 drop-shadow-sm">
                                                {item.period}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${item.progress}%` }}
                                                        className="h-full bg-primary"
                                                    />
                                                </div>
                                                <span className="text-[11px] font-black text-slate-400 dark:text-white/40">{item.progress}%</span>
                                            </div>
                                        </div>
                                        {item.status === 'completed' && <CheckCircle2 className="text-green-500 w-6 h-6 " />}
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black mb-4 group-hover:text-primary transition-colors font-outfit tracking-tighter uppercase italic text-slate-800 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-white/60 leading-relaxed font-light italic mb-8 text-lg">
                                        {item.description}
                                    </p>

                                    <div className="space-y-3">
                                        {item.objectives?.map((obj, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
                                                <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0 shadow-neon-small" />
                                                {obj}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Quarter Side */}
                            <div className="absolute md:relative w-full md:w-[45%] inset-0 md:inset-auto flex items-center justify-center md:block pointer-events-none z-0">
                                <span
                                    className="text-[120px] md:text-[280px] font-black font-outfit pointer-events-none select-none tracking-tighter italic uppercase transition-all duration-700"
                                    style={{
                                        WebkitTextStroke: '2px rgba(0, 242, 254, 0.5)',
                                        WebkitTextFillColor: 'transparent',
                                        opacity: 0.4,
                                        filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.2))'
                                    }}
                                >
                                    Q{index + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
