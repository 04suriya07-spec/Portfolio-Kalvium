import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import client from '../../lib/sanityClient';

const CircularProgress = ({ percentage, label, color, delay }) => {
    const size = 160;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        className="stroke-slate-200 dark:stroke-white/5"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                        transition={{ duration: 2, delay, ease: "easeOut" }}
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]"
                        style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
                    />
                </svg>
                {/* Percentage Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: delay + 0.5 }}
                        className="text-3xl font-black font-outfit"
                    >
                        {percentage}%
                    </motion.span>
                </div>
            </div>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.3 }}
                className="text-slate-900 dark:text-white/50 font-black tracking-[0.2em] text-[10px] uppercase italic"
            >
                {label}
            </motion.span>
        </div>
    );
};

const SquadDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        client.fetch(`*[_type == "squadInfo"][0].stats`).then(setStats);
    }, []);

    const metrics = stats ? [
        { label: "Academic Avg", value: stats.academic, color: "#00f2fe", delay: 0.2 },
        { label: "Attendance", value: stats.attendance, color: "#f0abfc", delay: 0.4 },
        { label: "LU Completion", value: stats.luCompletion, color: "#4ade80", delay: 0.6 }
    ] : [];

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-32 -mt-32" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xs text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase italic text-slate-900 dark:text-white">Squad <span className="text-primary">Performance</span></h3>
                        <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed font-medium italic">
                            Real-time metrics tracking our collective progress, dedication, and technical excellence.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                        {metrics.map((m, i) => (
                            <CircularProgress
                                key={m.label}
                                percentage={m.value}
                                label={m.label}
                                color={m.color}
                                delay={m.delay}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SquadDashboard;
