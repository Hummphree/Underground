import React from 'react';
import GlassCard from './components/GlassCard';
import { Shield, Droplets, Sun, AlertTriangle } from 'lucide-react';

const Aftercare: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-20 animate-in fade-in duration-700">
            <div className="text-center space-y-6">
                <div className="inline-block bg-grunge-black p-4 rotate-[-3deg]">
                    <Shield className="w-12 h-12 text-accent-primary" />
                </div>
                <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary py-4 px-8 rotate-1 inline-block">
                    AFTER<span className="text-foreground">CARE</span>
                </h1>
                <p className="text-foreground font-black text-xl uppercase tracking-widest italic pt-4">
                    PROTECT YOUR INVESTMENT. FOLLOW THE RULES.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <GlassCard className="space-y-6 bg-grunge-black border-accent-primary" withTape>
                    <div className="flex items-center gap-4 border-b-4 border-accent-primary/20 pb-4">
                        <Droplets className="w-8 h-8 text-accent-primary" />
                        <h2 className="text-2xl font-black uppercase tracking-widest text-foreground">WASH & MOISTURIZE</h2>
                    </div>
                    <ul className="space-y-4 text-foreground/80 font-bold tracking-wide">
                        <li className="flex gap-4"><span className="text-accent-primary">1.</span> Wash gently with unscented, antibacterial soap 2-3 times a day.</li>
                        <li className="flex gap-4"><span className="text-accent-primary">2.</span> Pat dry with a clean paper towel. Do not rub.</li>
                        <li className="flex gap-4"><span className="text-accent-primary">3.</span> Apply a razor-thin layer of unscented lotion or recommended ointment.</li>
                    </ul>
                </GlassCard>

                <GlassCard className="space-y-6 bg-accent-secondary border-grunge-black" withTape>
                    <div className="flex items-center gap-4 border-b-4 border-grunge-black/20 pb-4">
                        <Sun className="w-8 h-8 text-grunge-black" />
                        <h2 className="text-2xl font-black uppercase tracking-widest text-grunge-black">SUN & WATER</h2>
                    </div>
                    <ul className="space-y-4 text-grunge-black/80 font-bold tracking-wide">
                        <li className="flex items-start gap-4"><span className="text-foreground bg-grunge-black px-2 py-1 rotate-[-2deg]">NO</span> Direct sunlight for at least 2-3 weeks.</li>
                        <li className="flex items-start gap-4"><span className="text-foreground bg-grunge-black px-2 py-1 rotate-1">NO</span> Submerging in water (baths, pools, oceans) until fully healed.</li>
                        <li className="flex items-start gap-4"><span className="text-foreground bg-grunge-black px-2 py-1 rotate-[-1deg]">YES</span> Quick lukewarm showers are fine.</li>
                    </ul>
                </GlassCard>

                <div className="md:col-span-2 relative mt-8">
                    <div className="absolute -inset-4 border-4 border-grunge-black rotate-1 pointer-events-none" />
                    <GlassCard className="h-full border-red-600/50">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="bg-red-600/10 p-6 rounded-full">
                                <AlertTriangle className="w-16 h-16 text-red-500" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black uppercase italic tracking-widest text-foreground">WHAT TO EXPECT</h3>
                                <p className="text-foreground/70 font-bold uppercase tracking-wide leading-relaxed">
                                    Peeling, flaking, and itching are normal. DO NOT PICK OR SCRATCH. If you experience excessive redness, swelling, or heat radiating from the tattoo, contact us or a medical professional immediately.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default Aftercare;
