import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArtistProfile from './components/ArtistProfile';
import { events } from './data/events';
import './HomeScroll.css';

gsap.registerPlugin(ScrollTrigger);

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

    const introRef = useRef<HTMLDivElement>(null);
    const textCenterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial page load animation for header (slide in from top)
        gsap.fromTo("#global-header",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, delay: 1, ease: "power3.out" }
        );

        // Pin the intro text section
        const st = ScrollTrigger.create({
            trigger: introRef.current,
            start: "top top",
            end: "bottom top",
            pin: textCenterRef.current,
            pinSpacing: false
        });

        // Hide header on scroll down, show on scroll up
        const headerScrollTrigger = ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Ignore early initial triggers to not override the intro load animation randomly
                if (window.scrollY < 50) {
                    gsap.to("#global-header", { y: 0, opacity: 1, duration: 0.3, overwrite: "auto" });
                } else if (self.direction === 1) {
                    // Scrolling down
                    gsap.to("#global-header", { y: -100, opacity: 0, duration: 0.3, overwrite: "auto" });
                } else if (self.direction === -1) {
                    // Scrolling up
                    gsap.to("#global-header", { y: 0, opacity: 1, duration: 0.3, overwrite: "auto" });
                }
            }
        });

        // Smoothly fade out ONLY the poster as user scrolls down the intro
        const fadeAnimation = gsap.to(textCenterRef.current, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
                trigger: introRef.current,
                start: "20% top", // start fading slightly later after scroll begins
                end: "80% top",   // finish fading before the new tabs overlap completely
                scrub: true,
            }
        });

        const handleScroll = () => {
            let scrollPosition = window.scrollY;
            let windowHeight = window.innerHeight + 550; // +550 = increasing the scroll distance before each class changes
            let sections = document.querySelectorAll('.tabs_let-content');
            let videos = document.querySelectorAll('.tabs_video');
            if (sections.length === 0 || videos.length === 0) return;

            let lastSectionIndex = sections.length - 1;

            sections.forEach((section, index) => {
                if (scrollPosition >= (index * windowHeight) && scrollPosition < ((index + 1) * windowHeight)) {
                    section.classList.add('is-1');
                    videos[index].classList.add('is-1');
                } else {
                    // Remove is-1 class from all sections except the last one
                    if (index !== lastSectionIndex) {
                        section.classList.remove('is-1');
                        videos[index].classList.remove('is-1');
                    }
                }
            });

            // Keep is-1 class on the last section until user scrolls past it
            if (scrollPosition > (lastSectionIndex * windowHeight)) {
                sections[lastSectionIndex].classList.add('is-1');
                videos[lastSectionIndex].classList.add('is-1');
            } else {
                sections[lastSectionIndex].classList.remove('is-1');
                videos[lastSectionIndex].classList.remove('is-1');
            }
        };

        window.addEventListener("scroll", handleScroll);
        // trigger once on mount
        handleScroll();

        return () => {
            st.kill();
            headerScrollTrigger.kill();
            fadeAnimation.kill();
            gsap.set("#global-header", { clearProps: "all" }); // ensure header reappears if navigating away
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="w-full">
            <div className="intro-wrapper" ref={introRef}>
                <div className="intro">
                    <div className="text-align-center" ref={textCenterRef}>
                        {/* The old Hero Poster content exactly as it was, but without max-w-6xl container directly framing it */}
                        <div className="max-w-6xl mx-auto py-12 px-4 h-full flex flex-col justify-center relative">
                            <section className="relative group w-full max-w-4xl mx-auto shadow-2xl">
                                <div className="absolute -inset-4 border-8 border-grunge-black -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                                <div className="relative bg-grunge-black p-12 md:p-24 space-y-12 text-center rotate-1 group-hover:rotate-0 transition-transform duration-500 overflow-hidden cursor-crosshair">
                                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

                                    <div className="w-80 h-80 mx-auto flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden shrink-0 relative">
                                        <img src="/Logo_White.png" alt="Below Ground Ink" className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 font-black uppercase italic text-xl md:text-2xl text-accent-primary">
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
                        </div>
                    </div>
                </div>
            </div>

            <section className="section_tabs pb-[500px]">
                <div className="padding-section-large">
                    <div className="tabs_container">
                        <div className="tabs_height">
                            <div className="tabs_sticky-wrapper">
                                <div className="tabs_component">
                                    <div className="tabs_left border-4 border-grunge-black bg-grunge-black relative shadow-hard">
                                        <div className="tabs_left-top">
                                            {/* Tab 1 Left */}
                                            <div className="tabs_let-content is-1">
                                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-1 inline-block mt-12 mb-8 shadow-hard-sm">
                                                    THE FRONT LINE
                                                </h2>
                                                <div className="tabs_line w-1/2 mx-auto"></div>
                                                <p className="tabs-p pt-8 text-foreground/80 italic font-bold">MEET THE ARTISTS</p>
                                            </div>
                                            {/* Tab 2 Left */}
                                            <div className="tabs_let-content">
                                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 -rotate-2 inline-block mt-12 mb-8 shadow-hard-sm">
                                                    LATEST CUTS
                                                </h2>
                                                <div className="tabs_line w-1/2 mx-auto"></div>
                                                <p className="tabs-p pt-8 text-foreground/80 italic font-bold">RECENT SESSIONS</p>
                                            </div>
                                            {/* Tab 3 Left */}
                                            <div className="tabs_let-content">
                                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-[-1deg] inline-block mt-12 mb-8 shadow-hard-sm">
                                                    GIG LIST
                                                </h2>
                                                <div className="tabs_line w-1/2 mx-auto"></div>
                                                <p className="tabs-p pt-8 text-foreground/80 italic font-bold">UPCOMING EVENTS</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tabs_right border-4 border-grunge-black overflow-hidden bg-background relative shadow-hard">
                                        <div className="w-full h-full p-4 md:p-12 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]">
                                            {/* Tab 1 Right - Artists */}
                                            <div className="tabs_video is-1 p-4 md:p-8 custom-scrollbar">
                                                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-12 max-w-5xl mx-auto">
                                                    {artists.map(artist => (
                                                        <ArtistProfile key={artist.id} {...artist} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tab 2 Right - Image Marquee */}
                                            <div className="tabs_video flex items-center justify-center p-4 custom-scrollbar">
                                                <div className="w-full overflow-hidden border-y-8 border-grunge-black bg-grunge-black py-12 relative shadow-2xl h-max -rotate-2 scale-105">
                                                    <div className="flex animate-marquee gap-8 px-4 h-full items-center">
                                                        {[...Array(6)].map((_, i) => (
                                                            <div key={i} className="w-72 h-80 bg-accent-secondary/10 shrink-0 border-4 border-grunge-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500 relative group overflow-hidden">
                                                                <div className="absolute inset-0 bg-accent-primary/5 group-hover:bg-transparent transition-colors z-10" />
                                                                <div className="w-full h-full flex items-center justify-center font-black text-4xl italic text-foreground/5 uppercase tracking-tighter">
                                                                    SESSION 0{i + 1}
                                                                </div>
                                                                <div className="absolute bottom-4 left-4 right-4 h-1 bg-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                                            </div>
                                                        ))}
                                                        {/* Duplicate for seamless loop */}
                                                        {[...Array(6)].map((_, i) => (
                                                            <div key={`dup-${i}`} className="w-72 h-80 bg-accent-secondary/10 shrink-0 border-4 border-grunge-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500 relative group overflow-hidden">
                                                                <div className="absolute inset-0 bg-accent-primary/5 group-hover:bg-transparent transition-colors z-10" />
                                                                <div className="w-full h-full flex items-center justify-center font-black text-4xl italic text-foreground/5 uppercase tracking-tighter">
                                                                    SESSION 0{i + 1}
                                                                </div>
                                                                <div className="absolute bottom-4 left-4 right-4 h-1 bg-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tab 3 Right - Events */}
                                            <div className="tabs_video p-4 md:p-8 custom-scrollbar">
                                                <div className="max-w-2xl mx-auto pt-12">
                                                    {upcomingEvents.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center p-12 border-4 border-grunge-black bg-grunge-black/5 rotate-1 cursor-not-allowed">
                                                            <h3 className="text-4xl md:text-5xl font-black uppercase italic text-grunge-black opacity-40 tracking-tighter text-center">
                                                                NO UPCOMING EVENTS
                                                            </h3>
                                                        </div>
                                                    ) : (
                                                        <div className="grid gap-12">
                                                            {upcomingEvents.map(event => (
                                                                <div key={event.id} className="bg-accent-secondary border-8 border-grunge-black p-10 relative rotate-[-1deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-center space-y-6">
                                                                    <div className="space-y-4 text-left">
                                                                        <div className="bg-grunge-black text-accent-primary px-4 py-1 font-black uppercase italic text-sm inline-block">
                                                                            {event.date}
                                                                        </div>
                                                                        <h3 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-grunge-black">
                                                                            {event.title}
                                                                        </h3>
                                                                        <p className="text-lg font-bold uppercase italic text-grunge-black opacity-80 leading-tight">
                                                                            {event.location}
                                                                        </p>
                                                                    </div>
                                                                    <div className="px-6 py-3 border-4 border-grunge-black text-grunge-black font-black uppercase italic hover:bg-grunge-black hover:text-foreground transition-all cursor-pointer text-center w-full md:w-max">
                                                                        SECURE ACCESS
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
