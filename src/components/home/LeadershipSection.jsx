import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Users, Shield, Award, History, Linkedin, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { leadership } from '../../data/students';

const ProfileCard = ({ item, isMain, count }) => (
    <div className={clsx(
        "bg-white/5 dark:bg-white/[0.04] backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-2xl flex transition-all hover:bg-white/10 group overflow-hidden h-full",
        isMain ? "flex-col md:flex-row items-center w-full" : "flex-col items-center text-center p-6"
    )}>
        {/* Profile Image Section - Now Linked if link exists */}
        <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "relative shrink-0 overflow-hidden block cursor-pointer",
                isMain ? "w-full md:w-[45%] h-64 md:h-full" : "w-24 h-24 md:w-32 md:h-32 mb-6 rounded-2xl md:rounded-3xl"
            )}
        >
            <img
                src={item.image}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                alt={item.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 backdrop-blur-[2px]">
                <ExternalLink className="w-8 h-8 text-white drop-shadow-neon" />
            </div>

            {isMain && (
                <div className="absolute top-8 left-8 z-20">
                    <div className="bg-primary/20 backdrop-blur-md border border-primary/30 p-3 rounded-2xl shadow-neon-sm">
                        <Shield className="w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(0,242,254,0.8)]" />
                    </div>
                </div>
            )}
        </a>

        {/* Data Section */}
        <div className={clsx(
            "flex-1 flex flex-col justify-center",
            isMain ? "p-10 md:p-16 text-left" : "w-full"
        )}>
            {!isMain && (
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-2 opacity-70 drop-shadow-[0_0_5px_rgba(0,242,254,0.4)]">Verified_Personnel</span>
            )}

            <a
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors cursor-pointer block group/name"
            >
                <h4 className={clsx(
                    "font-black uppercase text-slate-900 dark:text-white tracking-tighter leading-none mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/name:text-primary transition-colors",
                    isMain ? "text-5xl md:text-7xl" : "text-xl md:text-2xl"
                )}>
                    {item.name}
                </h4>
            </a>

            <p className={clsx(
                "font-bold uppercase tracking-[0.4em] mb-6",
                isMain ? "text-xs md:text-sm" : "text-[10px]",
                colorClass(item.role),
                item.role?.includes("Manager") ? "drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" : "drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]"
            )}>
                {item.role || 'Contributor'}
            </p>

            {isMain && (
                <p className="text-lg md:text-xl text-slate-500 dark:text-white/60 font-medium italic leading-relaxed mb-10 max-w-2xl border-l-4 border-primary pl-6 shadow-[inset_4px_0_10px_-4px_rgba(0,242,254,0.3)]">
                    "{item.completeInfo || item.bio}"
                </p>
            )}

            <div className={clsx("flex gap-4", !isMain && "justify-center")}>
                <a href={item.linkedin} target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-primary px-6 py-3 rounded-2xl text-slate-900 dark:text-white hover:text-slate-950 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-neon">
                    <Linkedin className="w-4 h-4" />
                    {isMain && "Connect"}
                </a>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5">
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

const colorClass = (role) => {
    if (!role) return "text-slate-400";
    if (role.toLowerCase().includes("manager")) return "text-primary";
    if (role.toLowerCase().includes("mentor")) return "text-secondary";
    return "text-slate-400";
};

const FaceContent = ({ title, subtitle, items, colorClass }) => {
    const itemList = Array.isArray(items) ? items : [items];
    const isSingle = itemList.length === 1;

    return (
        <div className="w-full h-full flex flex-col antialiased font-outfit overflow-hidden p-4 md:p-6 relative">
            {/* Minimal Header Cues */}
            <div className="absolute top-10 left-10 z-30 pointer-events-none">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic mb-2">/Registry_Level_0{isSingle ? '1' : '2'}</p>
                <h3 className={clsx(
                    "text-3xl font-black uppercase italic tracking-tighter",
                    colorClass,
                    colorClass === "text-primary" ? "drop-shadow-[0_0_15px_rgba(0,242,254,0.8)]" :
                        colorClass === "text-secondary" ? "drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]" :
                            "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                )}>
                    {title}
                </h3>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full h-full flex items-center justify-center p-2 md:p-4">
                {isSingle ? (
                    <ProfileCard item={itemList[0]} isMain={true} count={1} />
                ) : (
                    <div className={clsx(
                        "grid w-full h-full gap-4 md:gap-6",
                        itemList.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-4"
                    )}>
                        {itemList.slice(0, 4).map((item, idx) => (
                            <ProfileCard key={idx} item={item} isMain={false} count={itemList.length} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const LeadershipHub = () => {
    const [rotationIndex, setRotationIndex] = useState(0);

    const faces = [
        { label: 'Executive', content: <FaceContent title="Director" subtitle="Strategic Architect" items={leadership.campusManager} colorClass="text-primary" /> },
        { label: 'Mentors', content: <FaceContent title="Mentors" subtitle="Technical Growth" items={leadership.mentors} colorClass="text-secondary" /> },
        { label: 'Legacy', content: <FaceContent title="Honors" subtitle="Hall of Fame" items={leadership.pastMentors} colorClass="text-slate-400" /> },
        { label: 'Past Mentors', content: <FaceContent title="Past Mentors" subtitle="The Legacy" items={leadership.pastMentors} colorClass="text-primary" /> }
    ];

    const activeFaceIndex = ((rotationIndex % 4) + 4) % 4;
    const rotateX = rotationIndex * -90;

    const handleWheel = (e) => {
        if (Math.abs(e.deltaY) < 40) return;
        if (e.deltaY > 0) {
            setRotationIndex(s => s + 1);
        } else {
            setRotationIndex(s => s - 1);
        }
    };

    const handleNavClick = (targetIndex) => {
        const diff = targetIndex - activeFaceIndex;
        let shortestDiff = diff;
        if (diff > 2) shortestDiff -= 4;
        if (diff < -2) shortestDiff += 4;
        setRotationIndex(rotationIndex + shortestDiff);
    };

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-transparent px-4 pb-10 pt-20"
            onWheel={handleWheel}
        >
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150" />

            {/* Scaled Heading Overlay */}
            <div className="fixed top-[15%] z-0 text-center pointer-events-none opacity-[0.03] dark:opacity-[0.07] w-full select-none">
                <h1 className="text-[12rem] md:text-[18rem] font-black uppercase italic tracking-tighter leading-none text-slate-900 dark:text-white">
                    ARCHIVE
                </h1>
            </div>

            {/* Full-Bleed Cuboid Playground */}
            <div className="relative w-full max-w-[1300px] h-[75vh] perspective-2000 z-10">
                <div
                    className="w-full h-full relative preserve-3d transition-transform duration-[1s] ease-[cubic-bezier(0.16, 1, 0.3, 1)]"
                    style={{ transform: `rotateX(${rotateX}deg)` }}
                >
                    {/* Face positions */}
                    {[0, 90, 180, 270].map((rot, idx) => (
                        <div
                            key={idx}
                            className="absolute inset-0 w-full h-full bg-white/5 dark:bg-dark-900/40 backdrop-blur-[40px] border-2 border-white/5 rounded-[4rem] md:rounded-[6rem] shadow-2xl backface-hidden"
                            style={{ transform: `rotateX(${rot}deg) translateZ(37.5vh)` }}
                        >
                            <div className={clsx(
                                "absolute inset-x-20 top-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-40 z-40",
                                idx === 0 || idx === 3 ? "via-primary shadow-[0_0_30px_rgba(0,242,254,0.7)]" :
                                    idx === 1 ? "via-secondary shadow-[0_0_30px_rgba(255,0,255,0.7)]" :
                                        "via-slate-400 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                            )} />
                            {faces[idx].content}
                        </div>
                    ))}
                </div>

                {/* Vertical Loop Nav */}
                <div className="absolute -right-20 md:-right-28 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 z-30">
                    <button onClick={() => setRotationIndex(s => s - 1)} className="p-5 glass rounded-[2rem] hover:text-primary transition-all shadow-xl bg-white/5 border-white/10 hover:shadow-neon">
                        <ChevronUp className="w-8 h-8 md:w-10 md:h-10" />
                    </button>
                    <div className="flex flex-col gap-6">
                        {faces.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleNavClick(i)}
                                className={clsx(
                                    "w-2 rounded-full transition-all duration-500",
                                    activeFaceIndex === i ? "h-20 bg-primary shadow-neon-lg scale-x-150" : "h-4 bg-slate-300 dark:bg-white/10 hover:h-8"
                                )}
                            />
                        ))}
                    </div>
                    <button onClick={() => setRotationIndex(s => s + 1)} className="p-5 glass rounded-[2rem] hover:text-primary transition-all shadow-xl bg-white/5 border-white/10 hover:shadow-neon">
                        <ChevronDown className="w-8 h-8 md:w-10 md:h-10" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const LeadershipSection = () => null;
export default LeadershipSection;
