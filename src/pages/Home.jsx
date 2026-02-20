import React from 'react';
import Hero from '../components/home/Hero';
import Roadmap from '../components/home/Roadmap';
import SquadDashboard from '../components/home/SquadDashboard';
import { LeadershipHub } from '../components/home/LeadershipSection';
import { motion } from 'framer-motion';


/* ── Author Credit ── fixed bottom-right corner ── */
const AuthorCredit = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5, ease: 'backOut' }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-[200] cursor-default select-none group"
    >
        <div className="relative flex flex-col items-end gap-0.5 bg-white/8 dark:bg-white/[0.05] backdrop-blur-xl border border-white/15 dark:border-white/10 rounded-2xl px-5 py-3 shadow-[0_6px_30px_rgba(0,0,0,0.25)] group-hover:shadow-neon transition-all duration-500">
            {/* Top neon tracer */}
            <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 rounded-full shadow-[0_0_8px_rgba(255,0,255,0.5)]" />

            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-white/25 italic leading-none">
                Crafted by
            </p>
            <p className="text-base font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white leading-tight drop-shadow-[0_0_10px_rgba(0,242,254,0.5)]">
                Suriya R V
            </p>

            {/* Bottom neon tracer */}
            <div className="absolute inset-x-4 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 rounded-full" />
        </div>
        {/* Ground shadow */}
        <div className="absolute inset-x-3 -bottom-1.5 h-3 bg-black/20 dark:bg-black/40 blur-md rounded-full -z-10" />
    </motion.div>
);


const Home = () => {
    return (
        <>
            {/* Author credit — bottom-right */}
            <AuthorCredit />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="snap-container h-screen w-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth"
            >
                {/* 01. Hero Slide */}
                <section className="snap-section overflow-hidden">
                    <Hero />
                </section>

                {/* 02. Leadership Hub Slide (Vertical Scroll within Hub) */}
                <section className="snap-section overflow-hidden">
                    <div className="w-full h-full pt-32 flex items-center justify-center px-4">
                        <LeadershipHub />
                    </div>
                </section>

                {/* 05. Metrics Dashboard Slide */}
                <section className="snap-section overflow-hidden">
                    <div className="w-full h-full pt-28 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-6xl"
                        >
                            <SquadDashboard />
                        </motion.div>
                    </div>
                </section>

                {/* 06. Roadmap Slide (Vertical Scroll Enabled) */}
                <section className="snap-section overflow-y-auto no-scrollbar bg-mesh/5">
                    <div className="w-full min-h-full pt-32 pb-16 flex flex-col items-center">
                        <div className="w-full max-w-5xl">
                            <Roadmap />
                        </div>
                    </div>
                </section>

                {/* 07. Collaboration Slide */}
                <section className="snap-section overflow-hidden bg-mesh/10">
                    <div className="w-full h-full pt-28 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="glass-card rounded-[4rem] p-10 md:p-16 relative overflow-hidden text-center max-w-5xl shadow-2xl border-white/10"
                        >
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[80px]" />

                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                            <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter uppercase italic text-slate-900 dark:text-white">
                                Infinite <span className="text-secondary animate-pulse text-glow">Possibilities</span>
                            </h2>
                            <p className="text-slate-600 dark:text-white/50 max-w-2xl mx-auto mb-12 text-xl md:text-2xl font-light italic leading-relaxed">
                                Squad 139 is more than a collective. It's an engine for growth. Ready to fuel your vision?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary py-5 px-12 text-xs uppercase tracking-[0.2em] font-black italic shadow-neon"
                                >
                                    Initiate Contact
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-secondary py-5 px-12 text-xs uppercase tracking-[0.2em] font-black italic border border-slate-200 dark:border-white/10"
                                >
                                    Get Dossier
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </motion.main>
        </>
    );
};

export default Home;
