import React from 'react';
import Hero from '../components/home/Hero';
import Roadmap from '../components/home/Roadmap';
import { LeadershipHub } from '../components/home/LeadershipSection';
import { motion } from 'framer-motion';
import client from '../lib/sanityClient';


/* ── Author Credit ── fixed bottom-right corner ── */
const AuthorCredit = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5, ease: 'backOut' }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[200] cursor-default select-none group scale-75 md:scale-100 origin-bottom-right"
    >
        <div className="relative flex flex-col items-end gap-0.5 bg-white/10 dark:bg-white/[0.05] backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl px-5 py-3 shadow-2xl group-hover:shadow-neon transition-all duration-500">
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
                className="snap-container"
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
                                <motion.a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=karunakaran.h@kalvium.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary py-5 px-12 text-xs uppercase tracking-[0.2em] font-black italic shadow-neon inline-block"
                                >
                                    Initiate Contact
                                </motion.a>
                                <motion.button
                                    onClick={async () => {
                                        const toast = document.createElement('div');
                                        toast.className = "fixed top-10 left-1/2 -translate-x-1/2 bg-primary text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon z-[1000] animate-bounce";
                                        toast.innerText = "Generating Strategic Dossier...";
                                        document.body.appendChild(toast);

                                        try {
                                            const [squad, leadership, students, roadmapData] = await Promise.all([
                                                client.fetch(`*[_type == "squadInfo"][0]`).catch(() => ({})),
                                                client.fetch(`*[_type == "leadership"][0] {
                                                    campusManager { ..., "image": image.asset->url },
                                                    mentors[] { ..., "image": image.asset->url }
                                                }`).catch(() => ({})),
                                                client.fetch(`*[_type == "student"] {
                                                    ...,
                                                    "image": photo.asset->url,
                                                    "memories": memories[] { "image": photo.asset->url }
                                                }`).catch(() => []),
                                                client.fetch(`*[_type == "squadRoadmap"][0]`).catch(() => ({}))
                                            ]);

                                            toast.innerText = "Processing Archive Dossier...";

                                            const safeSquad = squad || { name: 'Squad 139', tagline: 'Excellence in Motion' };
                                            const safeLeadership = leadership || { mentors: [], campusManager: { name: 'Leadership Info' } };
                                            const safeStudents = Array.isArray(students) ? students : [];
                                            const safeRoadmap = roadmapData?.milestones || [];
                                            const safeImages = safeStudents.flatMap(s => s.memories || []).filter(img => img?.image);

                                            const { pdf } = await import('@react-pdf/renderer');
                                            const DossierPDF = (await import('../components/common/DossierPDF')).default;

                                            if (!DossierPDF) throw new Error("Component Load Failure");

                                            const blob = await pdf(<DossierPDF data={{
                                                squad: safeSquad,
                                                leadership: safeLeadership,
                                                students: safeStudents,
                                                roadmap: safeRoadmap,
                                                images: safeImages
                                            }} />).toBlob();

                                            const url = URL.createObjectURL(blob);
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.download = `Squad_139_Archive_Dossier.pdf`;
                                            link.click();

                                            toast.innerText = "Dossier Ready!";
                                            setTimeout(() => toast.remove(), 2000);
                                        } catch (err) {
                                            console.error("Dossier Critical Error:", err);
                                            toast.innerText = "Connectivity Alert: Try clicking again.";
                                            setTimeout(() => toast.remove(), 4000);
                                        }
                                    }}
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
