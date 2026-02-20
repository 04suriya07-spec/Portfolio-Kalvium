import React from 'react';
import { motion } from 'framer-motion';
import { students } from '../../data/students';

const Background = () => {
    // Get some images for the background drift
    const driftImages = students.flatMap(s => s.gallery).slice(0, 10);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-50 dark:bg-dark-900 transition-colors duration-700">
            {/* Animated Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 dark:bg-primary/20 rounded-full blur-[150px] animate-gradient-xy" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[150px] animate-gradient-xy" />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 contrast-150 brightness-100" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Memory Flow Images */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                {driftImages.map((img, i) => (
                    <motion.img
                        key={i}
                        src={img}
                        alt=""
                        className="absolute rounded-full object-cover blur-2xl grayscale opacity-20"
                        style={{
                            width: 300 + (i * 50),
                            height: 300 + (i * 50),
                            top: `${(i * 30) % 100}%`,
                            left: `${(i * 45) % 100}%`,
                        }}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            rotate: [0, 360],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 30 + (i * 5),
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Background;
