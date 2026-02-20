import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, SearchX, Filter, ArrowUpDown } from 'lucide-react';
import { students } from '../../data/students';
import StudentCard from './StudentCard';
import StudentSkeleton from './StudentSkeleton';
import { clsx } from 'clsx';

const SquadDirectory = () => {
    const [viewType, setViewType] = useState('grid'); // 'grid' | 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [sortBy, setSortBy] = useState('Name (A-Z)');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Get unique roles for filter dropdown
    const availableRoles = ['All Roles', ...new Set(students.map(s => s.role))].sort();

    const getProcessedStudents = () => {
        let result = students.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesRole = roleFilter === 'All Roles' || s.role === roleFilter;

            return matchesSearch && matchesRole;
        });

        // Apply Sorting
        result.sort((a, b) => {
            if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
            if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
            if (sortBy === 'Skill Level') {
                const avgA = a.skills.reduce((acc, s) => acc + s.level, 0) / a.skills.length;
                const avgB = b.skills.reduce((acc, s) => acc + s.level, 0) / b.skills.length;
                return avgB - avgA;
            }
            return 0;
        });

        return result;
    };

    const filteredStudents = getProcessedStudents();

    return (
        <section className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header & Controls - Elegant side-by-side layout */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-24">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase"
                            >
                                THE COLLECTIVE
                            </motion.div>
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-black text-slate-500 dark:text-white/40 tracking-widest">
                                {students.length} OPERATIVES
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black font-outfit mb-6 tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.85]">
                            Meet the <span className="text-glow text-primary">Squad</span>
                        </h2>
                        <p className="text-slate-500 dark:text-white/40 text-xl font-medium tracking-tight max-w-lg">
                            Discover the elite technical signatures of Squad 139.
                        </p>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 bg-white/5 dark:bg-white/[0.02] p-3 rounded-[3rem] border border-slate-200/50 dark:border-white/5 shadow-2xl backdrop-blur-3xl">
                        {/* Highly Expanded Search Bar */}
                        <div className="relative group w-full sm:w-[450px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by name, role or skill..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-100/50 dark:bg-white/5 border border-transparent focus:border-primary/30 rounded-2xl py-4 pl-12 pr-5 w-full focus:outline-none transition-all font-bold text-[10px] uppercase tracking-widest placeholder:text-slate-400 text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* Minimalist Role Filter - Icon Only */}
                        <div className="relative group h-[58px] w-[58px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-transparent group-hover:border-primary/30 transition-all" />
                            <Filter className="relative z-10 text-primary w-4 h-4 pointer-events-none" />
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                title="Filter by Role"
                            >
                                {availableRoles.map(role => (
                                    <option key={role} value={role} className="dark:bg-slate-900">{role}</option>
                                ))}
                            </select>
                        </div>

                        {/* Minimalist Sort - Icon Only */}
                        <div className="relative group h-[58px] w-[58px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-transparent group-hover:border-primary/30 transition-all" />
                            <ArrowUpDown className="relative z-10 text-primary w-4 h-4 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                title="Sort By"
                            >
                                <option value="Name (A-Z)" className="dark:bg-slate-900">Name (A-Z)</option>
                                <option value="Name (Z-A)" className="dark:bg-slate-900">Name (Z-A)</option>
                                <option value="Skill Level" className="dark:bg-slate-900">Top Skills</option>
                            </select>
                        </div>

                        <div className="h-10 w-px bg-slate-200 dark:bg-white/10 mx-2 hidden lg:block" />

                        {/* View Toggles - Compact */}
                        <div className="flex p-1 bg-slate-100/50 dark:bg-white/5 rounded-2xl relative h-[58px] w-[110px]">
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
                            <h3 className="text-2xl font-black mb-2 uppercase">No students found</h3>
                            <p className="text-slate-500 dark:text-white/40 font-medium">Try searching for a different name or role.</p>
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
