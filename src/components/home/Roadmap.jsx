import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { squadInfo } from '../../data/students';
import { clsx } from 'clsx';

const Roadmap = () => {
    return (
        <section className="py-20" id="roadmap">
            <div className="flex flex-col items-center mb-16 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4"
                >
                    Our Journey
                </motion.div>

                <p className="text-slate-500 dark:text-white/60 text-center max-w-2xl mt-4 font-medium italic">
                    Squad 139 is on a mission to evolve. Follow our strategic milestones and upcoming initiatives.
                </p>
            </div>

            <div className="relative max-w-4xl mx-auto px-4">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block opacity-30" />

                <div className="space-y-12">
                    {squadInfo.roadmap.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={clsx(
                                "relative flex items-center gap-8 md:gap-0",
                                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                            )}
                        >
                            {/* Timeline Point */}
                            <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-slate-50 dark:bg-dark-900 border-2 border-primary rounded-full transform -translate-x-1/2 z-10 shadow-neon" />

                            {/* Content Card */}
                            <div className="w-full md:w-[45%]">
                                <div className="glass-card rounded-[2rem] p-8 hover:translate-y-[-5px] transition-transform group">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-black tracking-widest text-primary font-outfit px-3 py-1 bg-primary/10 rounded-lg uppercase italic">
                                            {item.date}
                                        </span>
                                        {item.status === 'completed' ? (
                                            <CheckCircle2 className="text-green-600 dark:text-green-500 w-5 h-5 shadow-[0_0_10px_rgba(22,163,74,0.3)]" />
                                        ) : item.status === 'current' ? (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="w-3 h-3 bg-primary rounded-full shadow-neon"
                                            />
                                        ) : (
                                            <Circle className="text-slate-400 dark:text-white/20 w-5 h-5" />
                                        )}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black mb-3 group-hover:text-primary transition-colors font-outfit tracking-tight uppercase italic text-slate-800 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed font-medium italic">{item.description}</p>

                                    {item.status === 'upcoming' && (
                                        <div className="mt-6 flex items-center gap-2 text-primary text-[10px] font-black tracking-[0.2em] group-hover:gap-4 transition-all cursor-pointer uppercase italic">
                                            VIEW COLLABORATION GOALS <ArrowRight className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
