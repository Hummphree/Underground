import React from 'react';

interface GalleryProps {
    artistName: string;
}

const Gallery: React.FC<GalleryProps> = ({ artistName }) => {
    /* swap src values for real photos when ready */
    const pieces = [
        { id: 1, seed: 'tat01', w: 600, h: 750 },   // portrait
        { id: 2, seed: 'tat02', w: 600, h: 600 },   // square
        { id: 3, seed: 'tat03', w: 600, h: 800 },   // tall portrait
        { id: 4, seed: 'tat04', w: 600, h: 600 },   // square
        { id: 5, seed: 'tat05', w: 600, h: 750 },   // portrait
        { id: 6, seed: 'tat06', w: 600, h: 700 },   // portrait
        { id: 7, seed: 'tat07', w: 600, h: 600 },   // square
        { id: 8, seed: 'tat08', w: 600, h: 800 },   // tall
        { id: 9, seed: 'tat09', w: 600, h: 650 },   // portrait
    ].map(p => ({
        ...p,
        src: `https://picsum.photos/seed/${artistName.replace(/\s+/g, '-').toLowerCase()}-${p.seed}/${p.w}/${p.h}`,
    }));

    // split into two columns for masonry feel
    const left = pieces.filter((_, i) => i % 2 === 0);
    const right = pieces.filter((_, i) => i % 2 !== 0);

    const Tile = ({ p }: { p: typeof pieces[0] }) => (
        <div className="relative group overflow-hidden w-full">
            <img
                src={p.src}
                alt={`${artistName} — piece ${p.id}`}
                className="portfolio-img"
                style={{ height: 'auto', aspectRatio: `${p.w}/${p.h}` }}
            />
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Minimal header */}
            <div className="flex items-center gap-4 mb-10 px-1">
                <span className="font-black uppercase italic tracking-widest text-accent-primary text-xs">Portfolio</span>
                <div className="h-px flex-1 bg-foreground/10" />
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-foreground leading-none">
                    {artistName}
                </h2>
            </div>

            {/* 2-col masonry */}
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    {left.map(p => <Tile key={p.id} p={p} />)}
                </div>
                <div className="flex flex-col gap-2 mt-10">
                    {/* right column offset down slightly for stagger */}
                    {right.map(p => <Tile key={p.id} p={p} />)}
                </div>
            </div>

            {/* Closing rule */}
            <div className="mt-10 pt-4 border-t-2 border-foreground/10 flex justify-between items-center">
                <span className="text-foreground/20 font-black uppercase italic tracking-widest text-xs">Below Ground Ink · Kane, PA</span>
                <span className="text-foreground/20 font-black uppercase italic tracking-widest text-xs">{pieces.length} Pieces</span>
            </div>
        </div>
    );
};

export default Gallery;
