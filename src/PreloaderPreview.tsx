import React, { useState } from 'react';
import Preloader from './components/Preloader';

const PreloaderPreview: React.FC = () => {
    const [key, setKey] = useState(0);
    const [showContent, setShowContent] = useState(false);

    const handleRestart = () => {
        setKey(prev => prev + 1);
        setShowContent(false);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-8">
            {/* The actual preloader */}
            <Preloader key={key} onComplete={() => setShowContent(true)} />

            {/* Test Content that appears after preloader */}
            {showContent && (
                <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-8 py-4 rotate-[-2deg] shadow-hard">
                        ANIMATION COMPLETE
                    </h1>
                    <button
                        onClick={handleRestart}
                        className="grunge-button text-2xl px-12 py-6 rotate-1 hover:rotate-0 transition-transform"
                    >
                        REPLAY SEQUENCE
                    </button>
                    <p className="mt-8 font-black uppercase italic text-foreground/50 tracking-widest">
                        ADJUST TIMINGS IN `Preloader.tsx`
                    </p>
                </div>
            )}

            {/* Background elements to check visibility */}
            <div className="absolute top-10 left-10 w-32 h-32 border-8 border-grunge-black opacity-10 rotate-12" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent-primary/20 -rotate-6 blur-3xl" />
        </div>
    );
};

export default PreloaderPreview;
