import React, { useEffect } from 'react';
import { Radio } from 'lucide-react';
import { events } from './data/events';

const Events: React.FC = () => {
    useEffect(() => {
        document.title = 'Events & Pop-Ups | Below Ground Ink – Kane, PA';
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-32 flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-700">
            <div className="bg-grunge-black p-8 rotate-[-5deg] border-4 border-accent-primary group hover:rotate-0 transition-transform duration-500">
                <Radio className="w-24 h-24 text-accent-primary animate-pulse" />
            </div>


            {events.length === 0 ? (
                <div className="bg-grunge-black text-foreground border-8 border-grunge-black p-12 relative rotate-1 overflow-hidden max-w-2xl text-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary animate-pulse" />
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
                        NO UPCOMING EVENTS
                    </h2>
                    <p className="text-xl font-bold uppercase italic opacity-60 tracking-widest">
                        THE STAGE IS SILENT. <br /> STAY TUNED FOR THE NEXT RIOT.
                    </p>
                    <div className="mt-8 flex justify-center gap-4 text-xs font-black uppercase italic opacity-40">
                        <span>[STATIC]</span>
                        <span>[SILENCE]</span>
                        <span>[VOID]</span>
                    </div>
                </div>
            ) : (
                <div className="grid gap-12 w-full max-w-4xl">
                    {events.map((event) => (
                        <div key={event.id} className="bg-accent-secondary border-8 border-grunge-black p-8 relative rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="space-y-4">
                                    <div className="bg-grunge-black text-accent-primary px-4 py-1 font-black uppercase italic text-sm inline-block">
                                        {event.date}
                                    </div>
                                    <h3 className="text-4xl font-black uppercase italic text-grunge-black leading-none uppercase tracking-tighter">
                                        {event.title}
                                    </h3>
                                    <p className="text-lg font-bold uppercase italic text-grunge-black opacity-80 leading-tight">
                                        {event.location}
                                    </p>
                                    <p className="text-md font-medium italic text-grunge-black leading-tight border-l-4 border-grunge-black pl-4">
                                        "{event.description}"
                                    </p>
                                </div>
                                <div className="px-6 py-3 border-4 border-grunge-black text-grunge-black font-black uppercase italic hover:bg-grunge-black hover:text-foreground transition-all cursor-pointer whitespace-nowrap">
                                    SECURE ACCESS
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pt-12">
                <div className="inline-flex items-center gap-4 bg-accent-secondary border-4 border-grunge-black px-6 py-2 rotate-[-2deg]">
                    <span className="font-black uppercase italic text-sm tracking-widest text-grunge-black">BROADCAST INTERRUPTED</span>
                </div>
            </div>
        </div>
    );
};

export default Events;
