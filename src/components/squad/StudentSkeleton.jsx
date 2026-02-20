import React from 'react';
import { motion } from 'framer-motion';

const StudentSkeleton = ({ viewType }) => {
    const isGrid = viewType === 'grid';

    if (isGrid) {
        return (
            <div className="glass-card rounded-[2.5rem] p-6 animate-pulse">
                <div className="w-full aspect-square rounded-[2rem] bg-white/5 mb-6" />
                <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-32 bg-white/5 rounded-lg" />
                    <div className="h-6 w-20 bg-white/5 rounded-full" />
                </div>
                <div className="h-4 w-full bg-white/5 rounded mb-2" />
                <div className="h-4 w-2/3 bg-white/5 rounded mb-4" />
                <div className="flex gap-2 mb-6">
                    <div className="h-6 w-12 bg-white/5 rounded" />
                    <div className="h-6 w-12 bg-white/5 rounded" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-28 bg-white/5 rounded-full" />
                    <div className="h-10 w-10 bg-white/5 rounded-full" />
                    <div className="h-10 w-10 bg-white/5 rounded-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-6 animate-pulse">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[1.5rem] bg-white/5" />
            <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="h-8 w-40 bg-white/5 rounded-lg" />
                    <div className="h-6 w-24 bg-white/5 rounded-full" />
                </div>
                <div className="h-4 w-full max-w-md bg-white/5 rounded" />
                <div className="flex justify-center md:justify-start gap-2">
                    <div className="h-6 w-12 bg-white/5 rounded" />
                    <div className="h-6 w-12 bg-white/5 rounded" />
                </div>
                <div className="flex justify-center md:justify-start gap-4">
                    <div className="h-10 w-28 bg-white/5 rounded-full" />
                    <div className="h-10 w-10 bg-white/5 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default StudentSkeleton;
