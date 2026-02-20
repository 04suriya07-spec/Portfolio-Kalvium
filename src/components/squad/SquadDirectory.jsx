import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, SearchX } from 'lucide-react';
import { students } from '../../data/students';
import StudentCard from './StudentCard';
import StudentSkeleton from './StudentSkeleton';
import { clsx } from 'clsx';

const SquadDirectory = () => {
    const [viewType, setViewType] = useState('grid'); // 'grid' | 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <section className="py-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-primary font-bold tracking-widest text-xs uppercase"
                            >
                                THE COLLECTIVE
                            </motion.div>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-600 dark:text-white/50">
                                {students.length} OPERATIVES
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">Meet the <span className="text-glow text-primary">Squad</span></h2>
                        <p className="text-slate-600 dark:text-white/60 font-medium">Search and explore our diverse team of creators and builders.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, role or skill..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 w-full sm:w-96 focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest placeholder:text-slate-500 text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* View Toggles */}
                        <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl relative">
                            {/* Sliding Background */}
                            <motion.div
                                className="absolute bg-slate-900 dark:bg-primary shadow-lg dark:shadow-neon rounded-xl"
                                initial={false}
                                animate={{
                                    x: viewType === 'grid' ? 0 : '100%',
                                }}
                                style={{
                                    top: 6,
                                    bottom: 6,
                                    left: 6,
                                    width: 'calc(50% - 6px)'
                                }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />

                            <button
                                onClick={() => setViewType('grid')}
                                aria-label="Grid View"
                                className={clsx(
                                    "flex-1 p-2.5 rounded-xl transition-colors relative z-10 flex justify-center",
                                    viewType === 'grid' ? "text-white dark:text-slate-950" : "text-slate-400 hover:text-primary"
                                )}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewType('list')}
                                aria-label="List View"
                                className={clsx(
                                    "flex-1 p-2.5 rounded-xl transition-colors relative z-10 flex justify-center",
                                    viewType === 'list' ? "text-white dark:text-slate-950" : "text-slate-400 hover:text-primary"
                                )}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredStudents.length > 0 ? (
                        <motion.div
                            layout
                            className={clsx(
                                "grid gap-8",
                                viewType === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                            )}
                        >
                            {loading ? (
                                Array(9).fill(0).map((_, i) => (
                                    <StudentSkeleton key={i} viewType={viewType} />
                                ))
                            ) : (
                                filteredStudents.map(student => (
                                    <StudentCard
                                        key={student.id}
                                        student={student}
                                        viewType={viewType}
                                    />
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-40 text-center"
                        >
                            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <SearchX className="text-slate-300 dark:text-white/20 w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 uppercase italic">No students found</h3>
                            <p className="text-slate-500 dark:text-white/40 font-medium italic">Try searching for a different name or role.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-6 text-primary font-bold hover:underline"
                            >
                                Clear Search
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SquadDirectory;
