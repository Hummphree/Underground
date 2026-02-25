import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Gallery from './components/Gallery';
import { ChevronLeft, Disc } from 'lucide-react';

const ArtistGallery: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const artists: Record<string, { name: string }> = {
        "1": { name: "Shya Morris" },
        "2": { name: "Megan Rohr" }
    };

    const artist = id ? artists[id] : null;

    useEffect(() => {
        if (artist) {
            document.title = `${artist.name} | Tattoo Gallery – Below Ground Ink Kane, PA`;
        }
    }, [artist]);

    if (!artist) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
                <h2 className="text-6xl font-black uppercase italic italic text-grunge-black bg-accent-primary px-8 py-4 -rotate-2">LOST TAPE</h2>
                <Link to="/" className="grunge-button">BACK TO THE STAGE</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-16 py-12">
            <div className="flex items-center justify-between">
                <Link to="/" className="inline-flex items-center gap-2 bg-grunge-black text-foreground px-4 py-1 font-black uppercase italic text-xs tracking-widest rotate-[-1deg] hover:rotate-0 transition-transform">
                    <ChevronLeft className="w-4 h-4" /> BACKSTAGE
                </Link>
                <div className="flex items-center gap-4">
                    <Disc className="w-8 h-8 text-accent-primary animate-spin-slow" />
                    <span className="font-black uppercase italic text-sm tracking-tighter opacity-40">NOW PLAYING: {artist.name.toUpperCase()}</span>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -top-12 -left-4 text-[10rem] font-black uppercase italic text-grunge-black/10 pointer-events-none select-none">
                    VOL. 0{id}
                </div>
                <Gallery artistName={artist.name} />
            </div>
        </div>
    );
};

export default ArtistGallery;
