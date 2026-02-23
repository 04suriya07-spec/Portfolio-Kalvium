import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import client from '../../lib/sanityClient';

const Background = () => {
    const [driftImages, setDriftImages] = useState([]);

    // Mouse Tracking for Mirror Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        const handleMouseMove = (e) => {
            if (isTouch) return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);

        const fetchImages = async () => {
            try {
                // Fetching student photos for the organic drift
                const query = `*[_type == "student"][0..8] { "url": photo.asset->url }`;
                const data = await client.fetch(query);
                setDriftImages(data.map(d => d.url).filter(Boolean));
            } catch (error) {
                console.error("Error fetching background images:", error);
            }
        };
        fetchImages();

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate random drift speeds - Accelerated to 100% intensity
    const floatDurations = useMemo(() => driftImages.map(() => 15 + Math.random() * 25), [driftImages]);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-white dark:bg-[#01040f] transition-colors duration-1000">
            {/* Liquid Mesh Gradients - Base Layer (Amplified) */}
            <div className="absolute inset-0 opacity-60 dark:opacity-80 blur-[100px]">
                <motion.div
                    animate={{
                        x: [0, 150, -150, 0],
                        y: [0, -100, 100, 0],
                        scale: [1, 1.4, 0.8, 1],
                        rotate: [0, 90, -90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[80%] h-[80%] bg-primary/40 rounded-full"
                />
                <motion.div
                    animate={{
                        x: [0, -180, 180, 0],
                        y: [0, 150, -150, 0],
                        scale: [1, 0.7, 1.3, 1],
                        rotate: [0, -45, 45, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[70%] h-[70%] bg-secondary/30 rounded-full"
                />
                <motion.div
                    animate={{
                        x: [100, -100, 100],
                        y: [-100, 100, -100],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-[50%] h-[50%] bg-cyan-500/20 rounded-full"
                />
            </div>

            {/* Mouse Reactive Interactive Mirror Glow (Intensified) */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="absolute w-[1000px] h-[1000px] bg-primary/30 dark:bg-primary/50 rounded-full blur-[100px] pointer-events-none opacity-80 mix-blend-screen"
            />

            {/* Premium Fractal Grain Texture (More Visible) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.7] dark:opacity-[0.9] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.15" />
                </svg>
            </div>

            {/* Drifting Operative Memories (Floating Faces - High Density) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.2] dark:opacity-30">
                {driftImages.map((img, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            top: `${(i * 15) % 90}%`,
                            left: `${(i * 25) % 90}%`,
                            scale: 0.8 + Math.random() * 0.7,
                        }}
                        animate={{
                            y: [0, -200, 0],
                            x: [0, 120, 0],
                            rotate: [0, 360],
                            opacity: [0.3, 0.9, 0.3],
                        }}
                        transition={{
                            duration: floatDurations[i] || 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src={img}
                            alt=""
                            className="w-80 h-80 rounded-[3rem] object-cover grayscale blur-[2px] hover:blur-none transition-all duration-1000 contrast-150 brightness-125 -rotate-12 border border-white/10"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Peripheral Depth Vignette (More Pronounced) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
};

export default Background;
