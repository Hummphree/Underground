import React from 'react';
import GlassCard from './components/GlassCard';
import { Skull, Zap, Send } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-20 py-12 animate-in fade-in duration-700">
            <div className="text-center space-y-6">
                <div className="inline-block bg-grunge-black p-4 rotate-[-3deg]">
                    <Skull className="w-12 h-12 text-accent-primary" />
                </div>
                <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary py-4 px-8 rotate-1 inline-block">
                    THE <span className="text-foreground">RIDER</span>
                </h1>
                <p className="text-foreground font-black text-xl uppercase tracking-widest italic pt-4">
                    SUBMIT YOUR DEMANDS. NO FLUFF.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-8">
                    <GlassCard className="space-y-6 bg-grunge-black border-accent-primary" withTape>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-accent-primary">ENCRYPTED LINE</h4>
                            <p className="text-2xl font-black italic text-foreground leading-none">555-RIOR-INK</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="space-y-6 bg-accent-secondary border-grunge-black" withTape>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-grunge-black/60">THE DROPBOX</h4>
                            <p className="text-xl font-black italic text-grunge-black break-all leading-none">DEMOS@UNDERGROUND.VOID</p>
                        </div>
                    </GlassCard>
                </div>

                <div className="md:col-span-2 relative">
                    <div className="absolute -inset-4 border-4 border-grunge-black rotate-1 pointer-events-none" />
                    <GlassCard className="h-full">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-grunge-black/40 ml-1">CODENAME</label>
                                    <input type="text" className="w-full bg-grunge-black/5 border-b-8 border-grunge-black px-4 py-4 text-xl font-black italic uppercase outline-none focus:border-accent-primary transition-colors" placeholder="WHO ARE YOU?" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-grunge-black/40 ml-1">COMM LINK</label>
                                    <input type="email" className="w-full bg-grunge-black/5 border-b-8 border-grunge-black px-4 py-4 text-xl font-black italic uppercase outline-none focus:border-accent-primary transition-colors" placeholder="EMAIL/PHONE" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-grunge-black/40 ml-1">THE VISION (KEEP IT RAW)</label>
                                <textarea rows={6} className="w-full bg-grunge-black/5 border-b-8 border-grunge-black px-4 py-4 text-xl font-black italic uppercase outline-none focus:border-accent-primary transition-colors resize-none" placeholder="WHAT'S THE GIG?" />
                            </div>
                            <button className="grunge-button w-full py-6 text-2xl flex items-center justify-center gap-4 group">
                                SEND THE SIGNAL <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>
                    </GlassCard>
                </div>
            </div>

            <div className="pt-20 text-center">
                <div className="inline-flex items-center gap-4 bg-grunge-black p-4 rotate-1">
                    <Zap className="w-6 h-6 text-accent-primary fill-current" />
                    <span className="font-black uppercase italic tracking-widest text-xs">Response time varies by intensity</span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
