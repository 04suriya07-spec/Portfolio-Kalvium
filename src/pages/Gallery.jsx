import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Filter, Maximize2, X, Users, Calendar, Trophy } from 'lucide-react';
import client from '../lib/sanityClient';

const categories = [
    { id: 'all', name: 'All Access', icon: Filter },
    { id: 'squad', name: 'The Squad', icon: Users },
    { id: 'events', name: 'Mission Logs', icon: Calendar },
    { id: 'achievements', name: 'Hall of Fame', icon: Trophy },
];

const Gallery = () => {
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const query = `{
            "studentLogs": *[_type == "student" && defined(gallery)] {
                "studentName": name,
                gallery[] {
                    "id": asset->_id,
                    "image": asset->url,
                    "title": ^.name + "'s Archive",
                    "category": "squad",
                    "description": "Captured during the professional journey."
                }
            },
            "universeEntries": *[_type == "universe"] {
                "_id": _id,
                "title": title,
                "description": description,
                "category": category,
                "image": image.asset->url
            }
        }`;

        client.fetch(query).then(data => {
            const studentItems = data.studentLogs.flatMap(s => s.gallery || []);
            const universeItems = data.universeEntries.map(u => ({
                id: u._id,
                image: u.image || '/avatars/none.png',
                title: u.title,
                category: u.category === 'tech' ? 'achievements' :
                    u.category === 'milestone' ? 'events' : 'achievements',
                description: u.description
            }));

            setGalleryItems([...universeItems, ...studentItems].filter(item => item.image || item.id));
        });
    }, []);

    const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-primary mb-4"
                    >
                        <Camera className="w-5 h-5" />
                        <span className="font-black text-[10px] uppercase tracking-[0.4em] italic">Visual_Registry // Universe</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 text-slate-900 dark:text-white">
                        Explore Our <span className="text-glow text-primary">Universe</span>
                    </h2>
                    <p className="text-slate-600 dark:text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium italic">
                        A glimpse into the journey, the people, and the moments that define Squad 139.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={clsx(
                                "flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all italic border",
                                filter === cat.id
                                    ? "bg-primary text-slate-950 border-primary shadow-neon"
                                    : "glass border-slate-200 dark:border-white/10 hover:border-primary/50 text-slate-600 dark:text-white/60"
                            )}
                        >
                            <cat.icon className="w-4 h-4" />
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative glass-card rounded-[2.5rem] overflow-hidden border-2 border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all shadow-xl"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Action Buttons */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                        <button
                                            onClick={() => setSelectedImage(item)}
                                            className="p-4 glass rounded-full text-white hover:text-primary transition-colors"
                                        >
                                            <Maximize2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">{item.category}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    </div>
                                    <h4 className="text-xl font-black uppercase italic mb-2 text-slate-900 dark:text-white">{item.title}</h4>
                                    <p className="text-xs text-slate-600 dark:text-white/40 italic font-medium leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-dark-900/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-10 right-10 p-4 glass rounded-full text-white hover:rotate-90 transition-all duration-500">
                            <X className="w-8 h-8" />
                        </button>

                        <div className="w-full max-w-6xl relative flex flex-col md:flex-row gap-8 items-center" onClick={e => e.stopPropagation()}>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="flex-1 rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/10"
                            >
                                <img
                                    src={selectedImage.image}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />
                            </motion.div>
                            <div className="max-w-md">
                                <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block italic">{selectedImage.category} // Detailed_Log</span>
                                <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-6 leading-tight text-white tracking-tighter">{selectedImage.title}</h3>
                                <p className="text-white/60 text-lg font-medium italic leading-relaxed mb-8">
                                    {selectedImage.description}
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/30 italic">
                                    <div className="w-8 h-px bg-white/10" />
                                    Archive_Reference: #SQ139-GAL-{selectedImage.id}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Internal utility for clsx if needed
const clsx = (...classes) => classes.filter(Boolean).join(' ');

export default Gallery;
