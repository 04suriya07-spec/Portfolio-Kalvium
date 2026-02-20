import React from 'react';
import Hero from '../components/home/Hero';
import Roadmap from '../components/home/Roadmap';
import SquadDashboard from '../components/home/SquadDashboard';
import { LeadershipHub } from '../components/home/LeadershipSection';
import { motion } from 'framer-motion';

/* ── Kalvium Sticker ── fixed bottom-left, persists across all slides ── */
const KalviumSticker = () => (
    <motion.div
        initial={{ opacity: 0, y: 30, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'backOut' }}
        whileHover={{ rotate: 0, scale: 1.08 }}
        className="fixed bottom-8 left-8 z-[200] cursor-pointer select-none group"
    >
        {/* Sticker body */}
        <div className="relative flex flex-col items-center gap-2 bg-white/10 dark:bg-white/[0.06] backdrop-blur-2xl border-2 border-white/20 dark:border-white/10 rounded-[2.2rem] px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.3)] group-hover:shadow-neon transition-all duration-500">
            {/* Top neon accent line */}
            <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 shadow-[0_0_10px_rgba(0,242,254,0.7)] rounded-full" />

            {/* Logo */}
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 shadow-lg flex items-center justify-center bg-white/10">
                <img
                    src="/kalvium-logo/image.png"
                    alt="Kalvium Logo"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Attribution text */}
            <div className="text-center leading-tight">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 italic">Built by</p>
                <p className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-white drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]">
                    Suriya R V
                </p>
            </div>

            {/* Bottom neon accent line */}
            <div className="absolute inset-x-6 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40 rounded-full" />
        </div>

        {/* Shadow / glue effect */}
        <div className="absolute inset-x-4 -bottom-2 h-4 bg-black/20 dark:bg-black/40 blur-md rounded-full -z-10" />
    </motion.div>
);

const Home = () => {
    return (
        <>
            {/* Kalvium sticker – fixed, always visible across all slides */}
            <KalviumSticker />

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
                    <div className="w-full h-full pt-20 flex items-center justify-center px-4">
                        <LeadershipHub />
                    </div>
                </section>

                {/* 05. Metrics Dashboard Slide */}
                <section className="snap-section overflow-hidden">
                    <div className="w-full h-full pt-16 flex items-center justify-center">
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
                    <div className="w-full min-h-full pt-24 pb-16 flex flex-col items-center">
                        <div className="w-full max-w-5xl">
                            <Roadmap />
                        </div>
                    </div>
                </section>

                {/* 07. Collaboration Slide */}
                <section className="snap-section overflow-hidden bg-mesh/10">
                    <div className="w-full h-full pt-16 flex items-center justify-center px-4">
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
