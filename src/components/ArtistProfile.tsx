import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import { Play } from 'lucide-react';

interface ArtistProfileProps {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    role?: string;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({ id, name, specialty, bio, role = "LEAD ARTIST" }) => {
    return (
        <GlassCard className="flex flex-col h-full items-stretch p-0 overflow-hidden" withTape>
            <div className="w-full h-80 bg-grunge-black flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 grayscale contrast-150 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 opacity-40">
                    {/* Image placeholder */}
                    <div className="w-full h-full bg-accent-primary/20 flex items-center justify-center font-black text-4xl italic text-foreground/20 uppercase">
                        {name}
                    </div>
                </div>
                <div className="absolute top-4 left-4 bg-accent-primary text-grunge-black px-3 py-1 font-black uppercase italic text-xs rotate-[-5deg]">
                    {role}
                </div>
            </div>
            <div className="flex-1 p-8 space-y-6 flex flex-col">
                <div className="space-y-2">
                    <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-grunge-black leading-none bg-accent-primary inline-block px-4 py-2 rotate-[-1deg]">
                        {name}
                    </h2>
                    <p className="text-accent-primary font-black uppercase italic tracking-widest text-xs ml-2 pt-2">
                        STYLING: {specialty}
                    </p>
                </div>
                <p className="flex-1 text-foreground font-medium italic text-lg leading-tight border-l-4 border-accent-primary pl-6">
                    "{bio}"
                </p>
                <Link
                    to={`/artist/${id}`}
                    className="grunge-button w-full flex items-center justify-center gap-3"
                >
                    Explore my Work <Play className="w-4 h-4 fill-current" />
                </Link>
            </div>
        </GlassCard>
    );
};

export default ArtistProfile;
