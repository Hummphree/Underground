import React, { useState, useEffect } from 'react';
import { Calendar, UserCheck } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";

const artistLinks = {
    "SHYA MORRIS": "shyamorris/tattoo-session", // Placeholder link
    "MEGAN ROHR": "meganrohr/tattoo-session" // Placeholder link
};

const Scheduling: React.FC = () => {
    const [selectedArtist, setSelectedArtist] = useState<string>("");

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "styles": { "branding": { "brandColor": "#F8F3D9" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-20 py-12 animate-in fade-in duration-1000">

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
                                    className={`p-6 text-left border-4 border-grunge-black transition-all duration-300 group relative overflow-hidden rotate-1 hover:rotate-0 focus:rotate-0 ${selectedArtist === artist ? 'bg-accent-primary text-grunge-black' : 'bg-accent-secondary/10'}`}
                                >
                                    <span className="text-2xl font-black italic tracking-tighter uppercase relative z-10">{artist}</span>
                                    <div className={`absolute inset-0 bg-accent-primary transform transition-transform origin-left duration-300 ${selectedArtist === artist ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-20'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="flex items-center gap-4 text-2xl font-black uppercase italic text-accent-primary bg-grunge-black px-4 py-2 w-fit rotate-[1deg]">
                            <Calendar className="w-6 h-6" /> OPENINGS
                        </h3>
                        {!selectedArtist ? (
                            <div className="aspect-[4/3] bg-grunge-black/10 border-8 border-grunge-black p-8 flex flex-col items-center justify-center text-center rotate-[-1deg] hover:rotate-0 transition-all duration-300">
                                <span className="text-grunge-black/40 font-black italic text-2xl uppercase mb-2">
                                    [ AWAITING ARTIST ]
                                </span>
                                <span className="text-sm font-bold text-grunge-black/30 uppercase tracking-widest">
                                    SELECT FROM ROSTER
                                </span>
                            </div>
                        ) : (
                            <div className="aspect-[4/3] border-4 border-grunge-black bg-background/50 overflow-hidden relative rotate-[-1deg] hover:rotate-0 focus-within:rotate-0 transition-all duration-300">
                                <Cal
                                    calLink={artistLinks[selectedArtist as keyof typeof artistLinks]}
                                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                                    config={{ layout: 'month_view' }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <form className="space-y-8 bg-grunge-black p-8 md:p-12 border-8 border-grunge-black relative rotate-1 hover:rotate-0 focus-within:rotate-0 transition-all duration-300">
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

                        <div className="space-y-4 p-6 border-4 border-accent-primary/20 bg-accent-primary/5">
                            <div className="space-y-2">
                                <h4 className="text-accent-primary font-black uppercase italic tracking-widest text-sm">
                                    ALLERGY DISCLAIMER
                                </h4>
                                <p className="text-xs text-foreground/70 font-bold uppercase tracking-wide leading-relaxed">
                                    PLEASE BE ADVISED THAT TATTOO INKS AND SUPPLIES MAY CONTAIN INGREDIENTS THAT CAN CAUSE ALLERGIC REACTIONS. BY PROCEEDING, YOU CONFIRM YOU HAVE DISCLOSED ANY KNOWN ALLERGIES TO YOUR ARTIST.
                                </p>
                            </div>

                            <label className="flex items-start gap-4 cursor-pointer group pt-2 border-t border-accent-primary/10 w-full">
                                <div className="relative flex-shrink-0 mt-0.5">
                                    <input
                                        type="checkbox"
                                        required
                                        className="peer sr-only"
                                    />
                                    <div className="w-6 h-6 border-4 border-accent-primary/50 peer-checked:bg-accent-primary peer-checked:border-accent-primary transition-all flex items-center justify-center group-hover:border-accent-primary">
                                        <svg className="w-4 h-4 text-grunge-black opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm font-black uppercase italic text-foreground tracking-widest group-hover:text-accent-primary transition-colors mt-0.5 leading-snug">
                                    I HAVE READ AND <a href="#" className="text-accent-primary underline underline-offset-4 hover:text-white transition-colors">AGREE TO THE CONSENT FORM</a>
                                    <span className="ml-2 text-[10px] text-accent-primary opacity-40">[ REQUIRED ]</span>
                                </span>
                            </label>
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
