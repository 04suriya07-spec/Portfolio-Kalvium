import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Users, Target, LayoutDashboard, Sun, Moon, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Squad', path: '/squad', icon: Users },
    { name: 'Roadmap', path: '/roadmap', icon: Target },
    { name: 'Universe', path: '/universe', icon: Sparkles },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={twMerge(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4",
                isScrolled ? "py-2" : "py-4"
            )}
        >
            <div className={twMerge(
                "max-w-7xl mx-auto rounded-[2.8rem] transition-all duration-700 px-6 md:px-10 py-3 flex items-center justify-between relative overflow-hidden group border",
                isScrolled
                    ? "bg-white/60 dark:bg-dark-950/20 backdrop-blur-[60px] backdrop-saturate-[250%] shadow-[0_20px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_100px_-20px_rgba(0,242,254,0.4)] border-slate-200 dark:border-white/20 ring-1 ring-slate-100 dark:ring-white/10"
                    : "bg-white/40 dark:bg-white/[0.01] backdrop-blur-[40px] border-slate-200/50 dark:border-white/10"
            )}>
                {/* Textured Glass Grain */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.12] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover mix-blend-overlay" />

                {/* Specular Edge & Refractions */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/10 dark:from-white/10 dark:to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

                {/* Top/Bottom Highlight Tracers */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-30" />
                {/* Left side: Kalvium logo + Squad 139 */}
                <div className="flex items-center gap-4">
                    {/* Kalvium Logo */}
                    <img
                        src="/kalvium-logo/image.png"
                        alt="Kalvium"
                        className="w-16 h-16 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                    />
                    {/* Divider */}
                    <div className="w-px h-6 bg-slate-300 dark:bg-white/20 hidden sm:block" />

                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
                            <Rocket className="text-slate-950 w-6 h-6" />
                        </div>
                        <span className="font-outfit font-bold text-xl tracking-tight hidden sm:block text-slate-950 dark:text-white">
                            SQUAD <span className="text-primary group-hover:text-glow transition-all">139</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={twMerge(
                                "relative font-bold text-xs uppercase tracking-widest transition-colors hover:text-primary flex items-center gap-2",
                                location.pathname === link.path
                                    ? "text-primary font-black scale-105"
                                    : "text-slate-900 dark:text-white/60"
                            )}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-[1.5rem] left-0 right-0 h-1 bg-primary shadow-neon"
                                />
                            )}
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 glass rounded-2xl hover:bg-primary/10 transition-colors group border border-slate-200 dark:border-white/5"
                    >
                        {isDark ? (
                            <Sun className="w-4 h-4 text-primary group-hover:rotate-45 transition-transform" />
                        ) : (
                            <Moon className="w-4 h-4 text-primary group-hover:-rotate-12 transition-transform" />
                        )}
                    </button>
                    <button className="btn-primary py-2.5 text-[10px] px-6 uppercase tracking-widest shadow-neon">Join Us</button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-700 dark:text-white/60 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute top-24 left-4 right-4 glass rounded-3xl p-6 md:hidden z-40 border-t border-slate-200 dark:border-white/10"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={twMerge(
                                        "flex items-center gap-4 p-4 rounded-2xl transition-all",
                                        location.pathname === link.path
                                            ? "bg-primary/10 text-primary shadow-inner font-black"
                                            : "hover:bg-primary/5 text-slate-700 dark:text-white/60"
                                    )}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-bold uppercase tracking-widest text-xs">{link.name}</span>
                                </Link>
                            ))}
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all text-slate-700 dark:text-white/60"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                <span className="font-bold uppercase tracking-widest text-xs">Switch Theme</span>
                            </button>
                            <button className="btn-primary w-full py-4 uppercase tracking-widest text-xs shadow-neon">Join Us</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
