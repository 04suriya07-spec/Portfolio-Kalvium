import React from 'react';
import { motion } from 'framer-motion';
import { squadInfo } from '../../data/students';

const StatCircle = ({ value, label, color }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-4 relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-slate-200 dark:stroke-white/10"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-2xl font-bold font-outfit"
                    >
                        {value}%
                    </motion.span>
                </div>
            </div>
            <span className="text-[10px] font-black text-slate-500 dark:text-white/60 uppercase tracking-[0.2em] text-center italic">{label}</span>

            {/* Glow Effect */}
            <div
                className="absolute w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};

const Stats = () => {
    return (
        <section className="py-10">
            <div className="glass-card rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32" />

                <div className="relative z-10 flex flex-col items-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tight"
                    >
                        Squad Performance <span className="text-glow text-primary">Metrics</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-24 w-full justify-items-center">
                        <StatCircle
                            value={squadInfo.stats.academic}
                            label="Academic Avg"
                            color="#00f2fe"
                        />
                        <StatCircle
                            value={squadInfo.stats.attendance}
                            label="Attendance"
                            color="#f093fb"
                        />
                        <StatCircle
                            value={squadInfo.stats.luCompletion}
                            label="LU Completion"
                            color="#00d2ff"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
