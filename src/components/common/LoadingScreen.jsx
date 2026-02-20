import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[200] bg-dark-900 flex flex-col items-center justify-center p-4"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.3)] mb-8"
                    >
                        <Rocket className="text-dark-900 w-12 h-12" />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 200 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="h-1 bg-white/10 rounded-full overflow-hidden mb-4"
                    >
                        <motion.div
                            animate={{ x: [-200, 200] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full bg-primary"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.5em] text-xs uppercase text-glow"
                    >
                        Initializing Squad
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
