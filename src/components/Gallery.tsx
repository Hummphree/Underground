import React from 'react';
import GlassCard from './GlassCard';
import { Mic2, Star } from 'lucide-react';

interface GalleryProps {
    artistName: string;
}

const Gallery: React.FC<GalleryProps> = ({ artistName }) => {
    // Mock data for tattoos
    const tattoos = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `${artistName} TRACK #${i + 1}`,
    }));

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-6">
                <div className="p-4 bg-grunge-black rotate-[-2deg]">
                    <Mic2 className="w-8 h-8 text-accent-primary" />
                </div>
                <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-grunge-black leading-none py-2 px-6 bg-accent-primary rotate-1">
                    {artistName.split(' ')[0]}'S <span className="text-foreground">CUTS</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {tattoos.map((tattoo) => (
                    <GlassCard key={tattoo.id} className="p-0 border-8 overflow-hidden aspect-square group" withTape={tattoo.id % 2 === 0}>
                        <div className="relative w-full h-full bg-grunge-black flex items-center justify-center grayscale contrast-200 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500">
                            <span className="text-accent-primary/20 font-black text-4xl italic uppercase tracking-tighter rotate-12 group-hover:rotate-0 transition-transform">
                                RAW {tattoo.id}
                            </span>
                            <div className="absolute inset-0 bg-accent-primary/0 group-hover:bg-accent-primary/20 transition-colors" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-grunge-black text-foreground border-4 border-accent-primary translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center justify-between">
                                    <p className="font-black uppercase italic text-sm tracking-widest">
                                        {tattoo.title}
                                    </p>
                                    <Star className="w-4 h-4 fill-accent-primary text-accent-primary" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
