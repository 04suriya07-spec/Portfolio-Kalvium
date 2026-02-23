import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import client from '../../lib/sanityClient';

const ProfileCard = ({ item, isMain }) => {
    const imageUrl = item.image; // Assuming resolved asset url
    if (isMain) {
        return (
            <div className="bg-white/5 dark:bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center w-full overflow-hidden h-full group transition-all hover:bg-white/10">
                {/* Profile Image Section */}
                <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative shrink-0 overflow-hidden block cursor-pointer w-full md:w-[45%] h-64 md:h-full"
                >
                    <img
                        src={imageUrl}
                        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                        alt={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 backdrop-blur-[2px]">
                        <ExternalLink className="w-8 h-8 text-white drop-shadow-neon" />
                    </div>
                </a>

                {/* Data Section */}
                <div className="flex-1 flex flex-col justify-center p-10 md:p-16 text-left">
                    <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors cursor-pointer block group/name"
                    >
                        <h4 className="font-black uppercase text-white tracking-tighter leading-none mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/name:text-primary transition-colors text-3xl md:text-7xl">
                            {item.name}
                        </h4>
                    </a>

                    <p className={clsx(
                        "font-bold uppercase tracking-[0.4em] mb-4 text-[10px] md:text-sm",
                        colorClass(item.role),
                        "drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                    )}>
                        {item.role || 'Contributor'}
                    </p>

                    <p className="text-lg md:text-xl text-white/60 font-medium italic leading-relaxed mb-10 max-w-2xl border-l-4 border-primary pl-6 shadow-[inset_4px_0_10px_-4px_rgba(0,242,254,0.3)]">
                        "{item.completeInfo || item.bio || item.details}"
                    </p>

                    <div className="flex gap-4">
                        <a href={item.linkedin} target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-primary px-6 py-3 text-white hover:text-slate-950 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-neon">
                            <Linkedin className="w-4 h-4" />
                            Connect
                        </a>
                        <button className="p-3 bg-white/10 hover:bg-white/20 transition-all border border-white/5">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Non-main card — full-bleed image top, info bottom ── */
    return (
        <div className="relative flex flex-col overflow-hidden h-full w-full group border border-white/10 bg-white/5 hover:bg-white/8 transition-all shadow-xl">
            {/* Image — top portion, full bleed */}
            <a href={item.linkedin} target="_blank" rel="noopener noreferrer"
                className="relative block w-full flex-[1.4] overflow-hidden cursor-pointer min-h-0">
                <img
                    src={imageUrl}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    alt={item.name}
                />
                {/* gradient fading into card bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {/* hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                    <ExternalLink className="w-7 h-7 text-white" />
                </div>
            </a>

            {/* Info section — bottom, filled with content */}
            <div className="shrink-0 w-full px-5 py-4 bg-black/80 backdrop-blur-xl border-t border-white/10 flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center justify-between min-w-0 overflow-hidden">
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="group/n flex-1 min-w-0">
                        <h4 className="text-lg md:text-xl font-black uppercase text-white tracking-tight leading-none group-hover/n:text-primary transition-colors flex items-center gap-2 whitespace-nowrap truncate">
                            {item.name}
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-primary drop-shadow-neon-sm fill-primary/10" />
                        </h4>
                    </a>
                </div>

                <p className={clsx(
                    "text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] leading-none mb-1 whitespace-nowrap truncate",
                    colorClass(item.role)
                )}>
                    {item.role || 'Contributor'}
                </p>

                {/* 2-line info about them — increased text size */}
                <p className="text-[12px] md:text-[13px] text-white/60 font-medium leading-relaxed italic line-clamp-2 min-h-[2.6em] tracking-tight">
                    {item.bio || item.completeInfo || item.details || "Dedicated member contributing to the excellence of Squad 139."}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-primary px-4 py-2 text-white hover:text-slate-950 font-black text-[9px] uppercase tracking-widest transition-all">
                        <Linkedin className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </div>
    );
};

const colorClass = (role) => {
    if (!role) return "text-slate-400";
    if (role.toLowerCase().includes("manager")) return "text-primary";
    if (role.toLowerCase().includes("mentor")) return "text-secondary";
    return "text-slate-400";
};

const FaceContent = ({ title, subtitle, items, colorClass }) => {
    const itemList = Array.isArray(items) ? items : items ? [items] : [];
    const isSingle = itemList.length === 1;

    if (itemList.length === 0) return (
        <div className="w-full h-full flex items-center justify-center italic text-white/20 uppercase tracking-widest">
            Registry Empty
        </div>
    );

    const glowShadow =
        colorClass === "text-primary"
            ? "drop-shadow-[0_0_15px_rgba(0,242,254,0.8)]"
            : colorClass === "text-secondary"
                ? "drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]"
                : colorClass === "text-yellow-400"
                    ? "drop-shadow-[0_0_15px_rgba(255,220,0,0.9)]"
                    : "drop-shadow-[0_0_15px_rgba(255,50,50,0.9)]";

    const accentBg =
        colorClass === "text-primary"
            ? "from-primary/20 via-primary/5 to-transparent border-primary/30"
            : colorClass === "text-secondary"
                ? "from-secondary/20 via-secondary/5 to-transparent border-secondary/30"
                : colorClass === "text-yellow-400"
                    ? "from-yellow-400/20 via-yellow-400/5 to-transparent border-yellow-400/30"
                    : "from-red-500/20 via-red-500/5 to-transparent border-red-500/30";

    const accentLine =
        colorClass === "text-primary"
            ? "via-primary shadow-[0_0_20px_rgba(0,242,254,0.7)]"
            : colorClass === "text-secondary"
                ? "via-secondary shadow-[0_0_20px_rgba(255,0,255,0.7)]"
                : colorClass === "text-yellow-400"
                    ? "via-yellow-400 shadow-[0_0_20px_rgba(255,220,0,0.8)]"
                    : "via-red-500 shadow-[0_0_20px_rgba(255,50,50,0.8)]";

    return (
        <div className="w-full h-full flex flex-col antialiased font-outfit overflow-hidden">

            {/* ── Face Navbar ── occupies its own dedicated row, never overlaps content ── */}
            <div className={clsx(
                "relative shrink-0 w-full flex items-center gap-5 px-8 py-4",
                "bg-gradient-to-r border-b backdrop-blur-xl",
                accentBg
            )}>
                {/* left accent line */}
                <div className={clsx(
                    "h-10 w-1 bg-gradient-to-b from-transparent to-transparent",
                    colorClass === "text-primary" ? "via-primary" :
                        colorClass === "text-secondary" ? "via-secondary" :
                            colorClass === "text-yellow-400" ? "via-yellow-400" : "via-red-500"
                )} />

                <div className="flex flex-col leading-none gap-1">

                    <h3 className={clsx(
                        "text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none",
                        colorClass,
                        glowShadow
                    )}>
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* right decorative dots */}
                <div className="ml-auto flex items-center gap-2 opacity-40">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={clsx(
                            "",
                            i === 0 ? "w-2.5 h-2.5" : i === 1 ? "w-2 h-2" : "w-1.5 h-1.5",
                            colorClass === "text-primary" ? "bg-primary" :
                                colorClass === "text-secondary" ? "bg-secondary" :
                                    colorClass === "text-yellow-400" ? "bg-yellow-400" : "bg-red-500"
                        )} />
                    ))}
                </div>

                {/* Bottom accent line */}
                <div className={clsx(
                    "absolute inset-x-16 bottom-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-60",
                    accentLine
                )} />
            </div>

            {/* ── Profile Content — fills all remaining space below the navbar ── */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center p-3 md:p-5">
                {isSingle ? (
                    <ProfileCard item={itemList[0]} isMain={true} count={1} />
                ) : (
                    <div className={clsx(
                        "grid w-full h-full gap-3 md:gap-5",
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
    const [leadershipData, setLeadershipData] = useState(null);
    const [rotationIndex, setRotationIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const scrollLocked = useRef(false);

    useEffect(() => {
        const query = `*[_type == "leadership"][0] {
            campusManager { ..., "image": image.asset->url },
            mentors[] { ..., "image": image.asset->url },
            pastMentors[] { ..., "image": image.asset->url },
            honors[] { ..., "image": image.asset->url }
        }`;
        client.fetch(query).then(setLeadershipData);
    }, []);

    const faces = [
        { label: 'Executive', content: <FaceContent title="Director" subtitle="Strategic Architect" items={leadershipData?.campusManager} colorClass="text-primary" /> },
        { label: 'Mentors', content: <FaceContent title="Mentors" subtitle="Technical Growth" items={leadershipData?.mentors} colorClass="text-secondary" /> },
        { label: 'Legacy', content: <FaceContent title="Honors" subtitle="Hall of Fame" items={leadershipData?.honors} colorClass="text-yellow-400" /> },
        { label: 'Past Mentors', content: <FaceContent title="Past Mentors" subtitle="The Legacy" items={leadershipData?.pastMentors} colorClass="text-red-500" /> }
    ];

    const activeFaceIndex = ((rotationIndex % 4) + 4) % 4;
    const rotateX = rotationIndex * -90;

    const handleWheel = (e) => {
        if (Math.abs(e.deltaY) < 10) return;
        if (scrollLocked.current) return;
        scrollLocked.current = true;
        setTimeout(() => { scrollLocked.current = false; }, 1100);
        setRotationIndex(s => s + (e.deltaY > 0 ? 1 : -1));
    };

    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientY);
    const handleTouchMove = (e) => {
        if (!touchStart || scrollLocked.current) return;
        const touchEnd = e.touches[0].clientY;
        const diff = touchStart - touchEnd;
        if (Math.abs(diff) > 50) {
            scrollLocked.current = true;
            setTimeout(() => { scrollLocked.current = false; }, 1100);
            setRotationIndex(s => s + (diff > 0 ? 1 : -1));
            setTouchStart(null);
        }
    };

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-transparent md:px-4 pb-10 pt-20"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {/* Scaled Heading Overlay */}
            <div className="fixed top-[15%] z-0 text-center pointer-events-none opacity-[0.03] dark:opacity-[0.07] w-full select-none">
                <h1 className="text-[8rem] md:text-[18rem] font-black uppercase italic tracking-tighter leading-none text-slate-900 dark:text-white">
                    ARCHIVE
                </h1>
            </div>

            {/* Cuboid Playground — Responsive size and Z-depth */}
            <div className="relative w-full max-w-[1126px] aspect-[16/9] md:h-[521px] perspective-2000 z-10 transition-all">
                <div
                    className="w-full h-full relative preserve-3d transition-transform duration-[1s] ease-[cubic-bezier(0.16, 1, 0.3, 1)]"
                    style={{ transform: `rotateX(${rotateX}deg)` }}
                >
                    {[0, 90, 180, 270].map((rot, idx) => {
                        const neonBorder =
                            idx === 0
                                ? 'border-[rgba(0,242,254,0.55)] shadow-[0_0_22px_4px_rgba(0,242,254,0.35)]'
                                : idx === 1
                                    ? 'border-[rgba(255,0,255,0.55)] shadow-[0_0_22px_4px_rgba(255,0,255,0.35)]'
                                    : idx === 2
                                        ? 'border-[rgba(255,220,0,0.60)] shadow-[0_0_22px_4px_rgba(255,220,0,0.38)]'
                                        : 'border-[rgba(255,50,50,0.60)] shadow-[0_0_22px_4px_rgba(255,50,50,0.38)]';

                        return (
                            <div
                                key={idx}
                                className={`absolute inset-0 w-full h-full bg-white/5 dark:bg-dark-950/60 backdrop-blur-[40px] border-2 backface-hidden ${neonBorder}`}
                                style={{ transform: `rotateX(${rot}deg) translateZ(clamp(150px, 20vw, 241px))` }}
                            >
                                {faces[idx].content}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination Dots for Mobile */}
            <div className="flex gap-4 mt-12 md:hidden">
                {faces.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setRotationIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${activeFaceIndex === i ? 'bg-primary scale-125 shadow-neon' : 'bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
};
const LeadershipSection = () => null;
export default LeadershipSection;
