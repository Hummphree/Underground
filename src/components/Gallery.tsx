import React from 'react';
import GlassCard from './GlassCard';

interface GalleryProps {
    artistName: string;
}

const Gallery: React.FC<GalleryProps> = ({ artistName }) => {
    // Placeholder images — swap these for real portfolio photos
    const PLACEHOLDER_SEEDS = [
        'tat01', 'tat02', 'tat03', 'tat04', 'tat05',
        'tat06', 'tat07', 'tat08', 'tat09'
    ];
    const tattoos = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `${artistName} TRACK #${i + 1}`,
        imgSeed: `${artistName.replace(/\s+/g, '-').toLowerCase()}-${PLACEHOLDER_SEEDS[i]}`,
    }));

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 px-6">
            <div className="flex items-center gap-6">
                <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-grunge-black leading-none py-2 px-6 bg-accent-primary rotate-1">
                    {artistName.split(' ')[0]}'S <span className="text-foreground">CUTS</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tattoos.map((tattoo) => (
                    <GlassCard key={tattoo.id} className="p-0 border-0 aspect-square group portfolio-card">
                        <div className="relative w-full h-full">
                            <img
                                src={`https://picsum.photos/seed/${tattoo.imgSeed}/500/500`}
                                alt={tattoo.title}
                                className="portfolio-img"
                            />
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
