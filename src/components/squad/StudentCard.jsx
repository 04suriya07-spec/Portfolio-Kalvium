import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const StudentCard = ({ student, viewType }) => {
    const isGrid = viewType === 'grid';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10 }}
            className={isGrid
                ? "glass-card rounded-[2.5rem] p-6 group cursor-pointer relative overflow-hidden"
                : "glass-card rounded-[2rem] p-4 group cursor-pointer flex flex-col md:flex-row items-center gap-6"
            }
        >
            <Link to={`/student/${student.id}`} className="absolute inset-0 z-20" />

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Profile Photo */}
            <div className={isGrid
                ? "relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6"
                : "relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-[1.5rem] overflow-hidden"
            }>
                <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Info */}
            <div className={twMerge(
                "flex-1 text-center md:text-left relative z-10",
                isGrid && "text-center md:text-center mt-4"
            )}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl md:text-2xl font-black font-outfit tracking-tight group-hover:text-primary transition-colors">
                        {student.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest italic w-fit mx-auto md:mx-0">
                        {student.role}
                    </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-6 line-clamp-2 leading-relaxed">
                    {student.summary}
                </p>

                {/* Skills Preview */}
                <div className={twMerge(
                    "flex flex-wrap gap-2 mb-8",
                    isGrid ? "justify-center" : "justify-center md:justify-start"
                )}>
                    {student.skills.slice(0, 3).map(skill => (
                        <span key={skill.name} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-600 dark:text-white/50 uppercase tracking-wider">
                            {skill.name}
                        </span>
                    ))}
                    {student.skills.length > 3 && (
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 dark:text-white/30">
                            +{student.skills.length - 3}
                        </span>
                    )}
                </div>

                <div className={twMerge(
                    "flex items-center gap-4",
                    isGrid ? "justify-center" : "justify-center md:justify-start"
                )}>
                    <Link
                        to={`/student/${student.id}`}
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-xl active:scale-95 z-20"
                    >
                        View System
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex gap-3 ml-2">
                        <a href={student.socials.github} target="_blank" className="p-3 glass rounded-xl text-slate-500 dark:text-white/40 hover:text-primary dark:hover:text-primary transition-all z-20 border border-slate-200 dark:border-white/5">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href={student.socials.linkedin} target="_blank" className="p-3 glass rounded-xl text-slate-500 dark:text-white/40 hover:text-primary dark:hover:text-primary transition-all z-20 border border-slate-200 dark:border-white/5">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StudentCard;
