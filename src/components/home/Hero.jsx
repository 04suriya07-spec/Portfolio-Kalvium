import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { squadInfo } from '../../data/students';

const Hero = () => {
    return (
        <section className="snap-section bg-mesh relative overflow-hidden flex flex-col items-center justify-center">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [90, 0, 90],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="z-10 text-center px-4 max-w-6xl relative mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                            Squad 139
                        </span>
                        <span className="block text-4xl md:text-6xl mt-4 opacity-90 text-slate-900 dark:text-white">
                            The future of Engineering
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light italic">
                        {squadInfo.tagline}. A high-performance student collective from Kalvium Academy specializing in modern web technologies and AI.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/universe">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                            >
                                Explore Our Universe
                            </motion.button>
                        </Link>
                        <Link to="/roadmap">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary flex items-center gap-2 group"
                            >
                                The Roadmap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
