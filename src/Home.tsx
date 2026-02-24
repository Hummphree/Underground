import React from 'react';
import ArtistProfile from './components/ArtistProfile';
import { Radio, Volume2 } from 'lucide-react';
import { events } from './data/events';

const Home: React.FC = () => {
    // Get the two soonest events
    const upcomingEvents = events.slice(0, 2);

    const artists = [
        {
            id: "1",
            name: "Shya Morris",
            role: "LEAD ARTIST",
            specialty: "RAW BLACKWORK",
            bio: "Master of shadows and fine line geometry. Shya explores the intersection of ancient mysticism and modern subculture.",
        },
        {
            id: "2",
            name: "Megan Rohr",
            role: "APPRENTICE",
            specialty: "BIOMECHANICAL SURREALISM",
            bio: "Crafting vivid nightmares and otherworldly organisms. Megan's work is a celebration of the strange and the beautiful.",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-32 py-12">
            {/* Hero Poster */}
            <section className="relative group">
                <div className="absolute -inset-4 border-8 border-grunge-black -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                <div className="relative bg-grunge-black p-12 md:p-24 space-y-12 text-center rotate-1 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-accent-primary text-grunge-black font-black uppercase italic text-sm tracking-widest -rotate-2">
                        <Radio className="w-5 h-5 animate-pulse" />
                        LIVE FROM BELOW GROUND
                    </div>

                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase italic text-foreground leading-[0.8] zine-text">
                        BELOW <br /><span className="text-accent-primary">GROUND</span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 font-black uppercase italic text-xl md:text-2xl text-accent-primary italic">
                        <span>EST. 1994</span>
                        <div className="w-4 h-4 rounded-full bg-foreground hidden md:block" />
                        <span>SUBTERRANEAN SESSIONS</span>
                        <div className="w-4 h-4 rounded-full bg-foreground hidden md:block" />
                        <span>NO REGRETS</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 pt-12">
                        <div className="px-6 py-3 border-4 border-accent-primary text-accent-primary font-black uppercase italic hover:bg-accent-primary hover:text-grunge-black transition-all rotate-[-1deg] cursor-pointer">
                            GET INKED
                        </div>
                        <div className="px-6 py-3 border-4 border-foreground text-foreground font-black uppercase italic hover:bg-foreground hover:text-grunge-black transition-all rotate-[2deg] cursor-pointer">
                            THE MANIFESTO
                        </div>
                    </div>
                </div>
            </section>

            {/* Artists / Band Members */}
            <section id="frontline" className="space-y-20 scroll-mt-24">
                <div className="flex items-center gap-6">
                    <div className="bg-grunge-black text-foreground p-4 -rotate-3">
                        <Volume2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-6xl font-black uppercase italic italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-1">
                        THE FRONT LINE
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                    {artists.map(artist => (
                        <ArtistProfile key={artist.id} {...artist} />
                    ))}
                </div>
            </section>

            {/* Image Marquee */}
            <section className="overflow-hidden border-y-8 border-grunge-black bg-grunge-black py-12 relative -mx-4 md:-mx-12 lg:-mx-[calc((100vw-100%)/2)] shadow-2xl">
                <div className="absolute top-4 left-6 z-20 bg-accent-primary text-grunge-black px-4 py-1 font-black uppercase italic text-sm -rotate-2">
                    LATEST CUTS
                </div>
                <div className="flex animate-marquee gap-8 px-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-80 h-96 bg-accent-secondary/10 shrink-0 border-4 border-grunge-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-accent-primary/5 group-hover:bg-transparent transition-colors z-10" />
                            <div className="w-full h-full flex items-center justify-center font-black text-4xl italic text-foreground/5 uppercase tracking-tighter">
                                SESSION 0{i + 1}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 h-1 bg-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[...Array(12)].map((_, i) => (
                        <div key={`dup-${i}`} className="w-80 h-96 bg-accent-secondary/10 shrink-0 border-4 border-grunge-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-accent-primary/5 group-hover:bg-transparent transition-colors z-10" />
                            <div className="w-full h-full flex items-center justify-center font-black text-4xl italic text-foreground/5 uppercase tracking-tighter">
                                SESSION 0{i + 1}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 h-1 bg-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Events Preview */}
            <section className="space-y-20 pb-24">
                <div className="flex items-center justify-end gap-6 text-right">
                    <h2 className="text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-[-1deg]">
                        GIG LIST
                    </h2>
                    <div className="bg-grunge-black text-foreground p-4 rotate-3">
                        <Radio className="w-8 h-8" />
                    </div>
                </div>

                {upcomingEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 border-4 border-grunge-black bg-grunge-black/5 rotate-1">
                        <h3 className="text-4xl md:text-5xl font-black uppercase italic text-grunge-black opacity-40 tracking-tighter">
                            NO UPCOMING EVENTS
                        </h3>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="bg-accent-secondary border-8 border-grunge-black p-10 relative rotate-[-2deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-center space-y-6">
                                <div className="space-y-4">
                                    <div className="bg-grunge-black text-accent-primary px-4 py-1 font-black uppercase italic text-sm inline-block">
                                        {event.date}
                                    </div>
                                    <h3 className="text-4xl font-black uppercase italic text-grunge-black leading-none tracking-tighter text-grunge-black">
                                        {event.title}
                                    </h3>
                                    <p className="text-lg font-bold uppercase italic text-grunge-black opacity-80 leading-tight">
                                        {event.location}
                                    </p>
                                </div>
                                <div className="px-6 py-3 border-4 border-grunge-black text-grunge-black font-black uppercase italic hover:bg-grunge-black hover:text-foreground transition-all cursor-pointer text-center">
                                    SECURE ACCESS
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
