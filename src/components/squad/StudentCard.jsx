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
                ? "glass-card rounded-[2.5rem] p-4 sm:p-6 group cursor-pointer relative overflow-hidden"
                : "glass-card rounded-[2rem] p-4 group cursor-pointer flex flex-col md:flex-row items-center gap-6"
            }
        >
            <Link to={`/student/${student.id}`} className="absolute inset-0 z-20" />

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Profile Photo */}
            <div className={isGrid
                ? "relative w-full aspect-square rounded-[2rem] overflow-hidden mb-4 sm:mb-6"
                : "relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-[1.5rem] overflow-hidden"
            }>
                <img
                    src={student.image || '/avatars/none.png'}
                    alt={student.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = '/avatars/none.png'; }}
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Info */}
            <div className={twMerge(
                "flex-1 flex flex-col items-center justify-center relative z-10",
                isGrid ? "text-center" : "text-center md:text-left md:items-start"
            )}>
                {/* Role - Top Line */}
                <div className="mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                        {student.role}
                    </span>
                </div>

                {/* Name - Second Line */}
                <h3 className="text-xl md:text-2xl font-black font-outfit tracking-tight group-hover:text-primary transition-colors mb-3">
                    {student.name}
                </h3>

                {/* Summary - 2 to 3 Lines */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mb-6 line-clamp-3 leading-relaxed min-h-[4.5em]">
                    {student.summary}
                </p>

                {/* Skills Preview - Single Line per skill (Name + Matrix) */}
                <div className={twMerge(
                    "flex flex-col gap-3 mb-8 w-full",
                    isGrid ? "items-center" : "items-center md:items-start"
                )}>
                    {student.techDojo?.slice(0, 3).map(item => {
                        const segmentColors = [
                            'bg-yellow-400', 'bg-orange-500', 'bg-green-500',
                            'bg-blue-500', 'bg-indigo-500', 'bg-purple-600',
                            'bg-slate-950'
                        ];
                        return (
                            <div key={item.skill} className="flex items-center gap-3 w-full max-w-[200px]">
                                <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest min-w-[70px] text-right">
                                    {item.skill}
                                </span>
                                <div className="flex gap-0.5 mt-0.5">
                                    {[1, 2, 3, 4, 5, 6, 7].map(seg => (
                                        <div
                                            key={seg}
                                            className={clsx(
                                                "w-2.5 h-1.5 -skew-x-[20deg] rounded-[1px]",
                                                seg <= (item.level || 0)
                                                    ? segmentColors[seg - 1]
                                                    : "bg-slate-200 dark:bg-white/10"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action Row - One line at bottom */}
                <div className={twMerge(
                    "flex items-center gap-3 w-full",
                    isGrid ? "justify-center" : "justify-center md:justify-start"
                )}>
                    <Link
                        to={`/student/${student.id}`}
                        className="group/btn flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-xl active:scale-95 z-20"
                    >
                        View System
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex gap-2">
                        {student.github && (
                            <a href={student.github} target="_blank" className="p-3 glass rounded-xl text-slate-500 dark:text-white/40 hover:text-primary dark:hover:text-primary transition-all z-20 border border-slate-200 dark:border-white/5">
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {student.linkedin && (
                            <a href={student.linkedin} target="_blank" className="p-3 glass rounded-xl text-slate-500 dark:text-white/40 hover:text-primary dark:hover:text-primary transition-all z-20 border border-slate-200 dark:border-white/5">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StudentCard;
