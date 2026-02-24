import React, { useState } from 'react';
import { Calendar, UserCheck, Music } from 'lucide-react';

const Scheduling: React.FC = () => {
    const [selectedArtist, setSelectedArtist] = useState<string>("");

    return (
        <div className="max-w-6xl mx-auto space-y-20 py-12 animate-in fade-in duration-1000">
            <div className="text-center space-y-8 relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10">
                    <Music className="w-64 h-64 text-grunge-black rotate-12" />
                </div>
                <h1 className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter text-grunge-black bg-foreground py-6 px-12 rotate-[-1deg] inline-block relative">
                    TOUR <span className="text-accent-primary">DATES</span>
                </h1>
                <p className="text-foreground font-black text-2xl uppercase tracking-[0.3em] italic">
                    RESERVE YOUR SLOT IN THE PIT.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-12">
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-4 text-2xl font-black uppercase italic text-accent-primary bg-grunge-black px-4 py-2 w-fit rotate-[-2deg]">
                            <UserCheck className="w-6 h-6" /> SELECT ARTIST
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            {["SHYA MORRIS", "MEGAN ROHR"].map(artist => (
                                <button
                                    key={artist}
                                    onClick={() => setSelectedArtist(artist)}
                                    type="button"
                                    className={`p-6 text-left border-4 border-grunge-black transition-all group relative overflow-hidden rotate-1 ${selectedArtist === artist ? 'bg-accent-primary text-grunge-black' : 'bg-accent-secondary/10'}`}
                                >
                                    <span className="text-2xl font-black italic tracking-tighter uppercase relative z-10">{artist}</span>
                                    <div className={`absolute inset-0 bg-accent-primary transform transition-transform origin-left duration-300 ${selectedArtist === artist ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-20'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="flex items-center gap-4 text-2xl font-black uppercase italic text-accent-primary bg-grunge-black px-4 py-2 w-fit rotate-[1deg]">
                            <Calendar className="w-6 h-6" /> DATA CYCLE
                        </h3>
                        <div className="aspect-[4/3] bg-grunge-black/10 border-8 border-grunge-black p-8 flex items-center justify-center text-grunge-black/20 font-black italic text-4xl uppercase text-center rotate-[-1deg]">
                            MARCH - APRIL <br /> SLOTS OPEN
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <form className="space-y-8 bg-grunge-black p-8 md:p-12 border-8 border-grunge-black relative rotate-1">
                        <div className="absolute top-0 left-0 w-full h-2 bg-accent-primary animate-pulse" />

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-accent-primary font-black uppercase italic tracking-widest text-sm">SELECTED ARTIST</label>
                                <span className="text-[10px] font-black uppercase italic text-accent-primary opacity-40">[ REQUIRED ]</span>
                            </div>
                            <div className="w-full bg-accent-primary/10 border-4 border-accent-primary/30 p-4 min-h-[64px] flex items-center">
                                <span className="text-2xl font-black uppercase italic text-accent-primary tracking-tighter">
                                    {selectedArtist || "NO ARTIST SELECTED [STAGE EMPTY]"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-accent-primary font-black uppercase italic tracking-widest text-sm">IDENTIFICATION / NAME</label>
                                <span className="text-[10px] font-black uppercase italic text-accent-primary opacity-40">[ REQUIRED ]</span>
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="WHO ARE YOU?"
                                className="w-full bg-foreground/5 border-4 border-accent-primary/20 p-4 text-foreground font-black uppercase italic focus:border-accent-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-accent-primary font-black uppercase italic tracking-widest text-sm">TRANSMISSION / EMAIL</label>
                                    <span className="text-[10px] font-black uppercase italic text-accent-primary opacity-40">[ REQUIRED ]</span>
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="CONTACT@VOID.COM"
                                    className="w-full bg-foreground/5 border-4 border-accent-primary/20 p-4 text-foreground font-black uppercase italic focus:border-accent-primary outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-accent-primary font-black uppercase italic tracking-widest text-sm">SIGNAL / PHONE</label>
                                    <span className="text-[10px] font-black uppercase italic text-accent-primary opacity-40">[ REQUIRED ]</span>
                                </div>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+1 555-VOID"
                                    className="w-full bg-foreground/5 border-4 border-accent-primary/20 p-4 text-foreground font-black uppercase italic focus:border-accent-primary outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-accent-primary font-black uppercase italic tracking-widest text-sm">THE VISION / DESCRIPTION</label>
                                <span className="text-[10px] font-black uppercase italic text-accent-primary opacity-40">[ REQUIRED ]</span>
                            </div>
                            <textarea
                                rows={6}
                                required
                                placeholder="DESCRIBE YOUR INK CONCEPT / STORY..."
                                className="w-full bg-foreground/5 border-4 border-accent-primary/20 p-4 text-foreground font-black uppercase italic focus:border-accent-primary outline-none transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-accent-primary font-black uppercase italic tracking-widest text-sm">ASSET UPLOAD / REFERENCE IMAGES</label>
                                <span className="text-[10px] font-black uppercase italic text-foreground opacity-20">[ OPTIONAL ]</span>
                            </div>
                            <div className="relative border-4 border-dashed border-accent-primary/20 p-8 text-center group hover:border-accent-primary transition-colors cursor-pointer">
                                <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                                <div className="space-y-2">
                                    <div className="font-black uppercase italic text-foreground opacity-40 group-hover:opacity-100 transition-opacity">DROP YOUR FILES HERE OR CLICK TO BROWSE</div>
                                    <div className="text-xs font-bold text-accent-primary/40 uppercase tracking-widest">[ PNG, JPG, PDF ]</div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-8 bg-accent-primary text-grunge-black font-black uppercase italic text-3xl tracking-tighter hover:scale-[1.02] active:scale-95 transition-all border-4 border-grunge-black shadow-[8px_8px_0px_0px_rgba(248,243,217,0.3)]">
                            SUBMIT SET REQUEST
                        </button>

                        <div className="pt-4 flex justify-between gap-4 font-black uppercase italic text-xs text-accent-primary/40 tracking-widest border-t border-accent-primary/10">
                            <span>*ALL REQUESTS ARE FINAL</span>
                            <span>[NO SELL OUTS]</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Scheduling;
