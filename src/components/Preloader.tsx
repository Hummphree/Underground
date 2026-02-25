import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
    onTransitionStart?: () => void;
    onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onTransitionStart, onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Streamlined frame sequence: 1-26 (skipping missing 5)
    const frames = React.useMemo(() => [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map(num =>
        `/assets/preloader/Frame${num}.PNG`
    ), []);
    const frameCount = frames.length;

    useEffect(() => {
        const preloadImages = async () => {
            const promises = frames.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(null);
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(promises);
                setIsLoaded(true);
            } catch (err) {
                console.error("Failed to preload animation frames", err);
                setIsLoaded(true);
            }
        };

        preloadImages();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => onComplete?.()
            });

            // 1. Play sequence at center
            const playhead = { frame: 0 };
            tl.to(playhead, {
                frame: frameCount - 1,
                snap: "frame",
                duration: 2.5, // Slowed down from frameCount/24 (~1s) to 2.5s
                ease: "none",
                onUpdate: () => {
                    if (imageRef.current) {
                        imageRef.current.src = frames[Math.floor(playhead.frame)];
                    }
                }
            });

            tl.add(() => onTransitionStart?.()); // Reveal site content behind

            // 2. Smoothly crossfade the solid background overlay
            tl.to(".preloader-bg", {
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut"
            }, "+=0.2");

            // 3. Keep the preloader image visible while fading out the container slightly later 
            // so we don't blink before the unmount
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
            }, "+=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, [isLoaded, onTransitionStart, onComplete, frames, frameCount]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
            <div className="absolute inset-0 bg-[#504B38] preloader-bg pointer-events-auto"></div>
            <div className="relative w-[95vw] max-w-7xl aspect-video flex items-center justify-center preloader-img-container pointer-events-auto">
                <img
                    ref={imageRef}
                    src={frames[0]}
                    alt="Loading..."
                    className="w-full h-full object-contain scale-110 md:scale-125 invert"
                />
            </div>
        </div>
    );
};

export default Preloader;
