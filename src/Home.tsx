import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
            photo: "https://picsum.photos/seed/shya-morris-artist/600/400",
        },
        {
            id: "2",
            name: "Megan Rohr",
            role: "APPRENTICE",
            specialty: "BIOMECHANICAL SURREALISM",
            bio: "Crafting vivid nightmares and otherworldly organisms. Megan's work is a celebration of the strange and the beautiful.",
            photo: "https://picsum.photos/seed/megan-rohr-artist/600/400",
        }
    ];

    const PORTFOLIO_SEEDS = ['tat01', 'tat02', 'tat03', 'tat04', 'tat05', 'tat06', 'tat07', 'tat08', 'tat09'];

    const shuffledPortfolio = useMemo(() => {
        const all = [
            ...PORTFOLIO_SEEDS.map(seed => ({ seed: `shya-morris-${seed}`, artist: 'SHYA MORRIS' })),
            ...PORTFOLIO_SEEDS.map(seed => ({ seed: `megan-rohr-${seed}`, artist: 'MEGAN ROHR' })),
        ];
        // Fisher-Yates shuffle
        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }
        return all;
    }, []);

    const introRef = useRef<HTMLDivElement>(null);
    const textCenterRef = useRef<HTMLDivElement>(null);
    const marginVideoRef = useRef<HTMLVideoElement>(null);
    const marginGifRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        document.title = 'Below Ground Ink | Custom Tattoo Studio in Kane, PA';

        // Initial page load animation for header (slide in from top)
        gsap.fromTo("#global-header",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, delay: 1, ease: "power3.out" }
        );

        // Removed old intro pinning since it's now fixed
        const st = { kill: () => { } }; // Dummy to avoid breaking cleanup

        // Hide header on scroll down, show on scroll up
        const headerScrollTrigger = ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Ignore early initial triggers to not override the intro load animation randomly
                if (window.scrollY < 50) {
                    gsap.to("#global-header", { opacity: 1, y: 0, duration: 0.3, overwrite: "auto", pointerEvents: 'auto' });
                } else if (self.direction === 1) {
                    // Scrolling down (fade out)
                    gsap.to("#global-header", { opacity: 0, duration: 0.3, overwrite: "auto", pointerEvents: 'none' });
                } else if (self.direction === -1) {
                    // Scrolling up (fade in)
                    gsap.to("#global-header", { opacity: 1, duration: 0.3, overwrite: "auto", pointerEvents: 'auto' });
                }
            }
        });

        // Smoothly fade out the poster AND the margin media as user scrolls down the intro
        const fadeTargets = [
            textCenterRef.current,
            marginVideoRef.current,
            marginGifRef.current,
        ].filter(Boolean);
        const fadeAnimation = gsap.to(fadeTargets, {
            autoAlpha: 0,
            y: -50,
            scale: 0.95,
            scrollTrigger: {
                trigger: "body",
                start: "0% top",
                end: "500px top",
                scrub: true,
            }
        });

        const handleScroll = () => {
            let scrollPosition = window.scrollY;
            let windowHeight = window.innerHeight + 150; // slightly shorter interval so tabs feel faster
            let sections = document.querySelectorAll('.tabs_let-content');
            let videos = document.querySelectorAll('.tabs_video');
            if (sections.length === 0 || videos.length === 0) return;

            let lastSectionIndex = sections.length - 1;

            sections.forEach((section, index) => {
                // First tab comes up when scrollPosition crosses 50px
                let start = index === 0 ? 50 : index * windowHeight;
                let end = (index + 1) * windowHeight;

                if (scrollPosition >= start && scrollPosition < end) {
                    section.classList.add('is-1');
                    videos[index].classList.add('is-1');
                } else {
                    if (index !== lastSectionIndex) {
                        section.classList.remove('is-1');
                        videos[index].classList.remove('is-1');
                    }
                }
            });

            // Keep is-1 class on the last section until user scrolls past it
            let lastStart = lastSectionIndex * windowHeight;
            if (scrollPosition >= lastStart) {
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
        <div className="w-full flex flex-col">
            <div className="relative lg:fixed left-0 right-0 z-0 pointer-events-none flex items-center justify-center min-h-[90vh] lg:min-h-0 lg:top-[98px] lg:bottom-1" ref={introRef}>
                {/* Left margin video */}
                <video
                    ref={marginVideoRef}
                    src="/tattoo2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute left-0 top-0 h-full w-auto object-cover opacity-60 mix-blend-luminosity"
                    style={{ maxWidth: 'calc((100vw - 56rem) / 2)', minWidth: 80 }}
                />
                {/* Right margin gif */}
                <img
                    ref={marginGifRef}
                    src="/tattoo1.gif"
                    alt=""
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-full w-auto object-cover opacity-60 mix-blend-luminosity"
                    style={{ maxWidth: 'calc((100vw - 56rem) / 2)', minWidth: 80 }}
                />
                <div className="w-full h-full">
                    <div className="text-align-center" ref={textCenterRef}>
                        {/* The old Hero Poster content exactly as it was, but without max-w-6xl container directly framing it */}
                        <div className="max-w-6xl mx-auto py-12 px-4 h-full flex flex-col justify-center relative pointer-events-auto">
                            <section className="relative group w-full max-w-4xl mx-auto shadow-2xl -translate-y-12">
                                <div className="absolute -inset-4 border-8 border-grunge-black -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                                <div className="relative bg-grunge-black py-24 md:py-28 px-10 md:px-20 space-y-8 text-center rotate-1 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

                                    <div className="w-72 h-72 mx-auto flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden shrink-0 relative">
                                        <img src="/Logo_White.png" alt="Below Ground Ink" className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-2 font-black uppercase italic text-lg md:text-xl text-accent-primary">
                                        <span>EST. 1994</span>
                                        <div className="w-4 h-4 rounded-full bg-foreground hidden md:block" />
                                        <span>SUBTERRANEAN SESSIONS</span>
                                        <div className="w-4 h-4 rounded-full bg-foreground hidden md:block" />
                                        <span>NO REGRETS</span>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                                        <Link to="/scheduling" className="px-6 py-2 border-4 border-accent-primary text-accent-primary font-black uppercase italic hover:bg-accent-primary hover:text-grunge-black transition-all rotate-[-1deg]">
                                            GET INKED
                                        </Link>
                                        <Link to="/contact" className="px-6 py-2 border-4 border-foreground text-foreground font-black uppercase italic hover:bg-foreground hover:text-grunge-black transition-all rotate-[2deg]">
                                            CONTACT US
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <section id="frontline" className="section_tabs">
                <div className="hidden lg:block padding-section-large">
                    <div className="tabs_container">
                        <div className="tabs_height">
                            <div className="tabs_sticky-wrapper">
                                <div className="tabs_component">
                                    <div className="tabs_left relative h-full rounded-[var(--border-radius--medium)]">
                                        <div className="tabs_left-top w-full h-full relative">
                                            {/* Tab 1 Left */}
                                            <div className="tabs_let-content border-4 border-grunge-black bg-grunge-black shadow-hard rounded-[var(--border-radius--medium)] p-6 gap-0">
                                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-1 inline-block mt-8 mb-6 shadow-hard-sm">
                                                    THE FRONT LINE
                                                </h2>

                                                {/* Studio stats */}
                                                <div className="grid grid-cols-3 gap-3 mb-6 w-full">
                                                    {[
                                                        { num: '10+', label: 'YRS RUNNING' },
                                                        { num: '2', label: 'ARTISTS' },
                                                        { num: '100%', label: 'CUSTOM' },
                                                    ].map(({ num, label }) => (
                                                        <div key={label} className="border-2 border-accent-primary/40 bg-background/10 py-3 text-center">
                                                            <p className="text-accent-primary font-black text-2xl italic leading-none">{num}</p>
                                                            <p className="text-foreground/50 font-bold uppercase text-[0.6rem] tracking-widest mt-1">{label}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="tabs_line w-1/2 mx-auto mb-6"></div>

                                                {/* Tagline */}
                                                <p className="text-foreground/70 italic font-semibold text-sm leading-relaxed mb-6 px-2">
                                                    No flash racks. No cookie-cutter work.<br />
                                                    Every piece drawn from scratch — built around <span className="text-accent-primary not-italic font-black">you</span>.
                                                </p>

                                                {/* Artist chips */}
                                                <div className="flex flex-col gap-2 w-full px-2 mb-6">
                                                    {artists.map(a => (
                                                        <div key={a.id} className="flex items-center gap-3 border-l-4 border-accent-primary pl-3 py-1">
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-black uppercase italic text-foreground text-sm leading-none">{a.name}</span>
                                                                <span className="text-accent-primary font-bold uppercase text-[0.6rem] tracking-widest">{a.specialty}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <a href="#about" className="text-foreground/40 italic font-bold text-xs tracking-[0.2em] uppercase hover:text-accent-primary transition-colors cursor-pointer w-max mx-auto md:mx-0">MEET THE ARTISTS →</a>
                                            </div>
                                            {/* Tab 2 Left */}
                                            <div className="tabs_let-content border-4 border-grunge-black bg-grunge-black bg-accent-primary shadow-hard rounded-[var(--border-radius--medium)] p-6">
                                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 -rotate-2 inline-block mt-12 mb-8 shadow-hard-sm">
                                                    LATEST CUTS
                                                </h2>
                                                <div className="tabs_line w-1/2 mx-auto"></div>
                                                <p className="tabs-p pt-8 text-foreground/80 italic font-bold">RECENT SESSIONS</p>
                                            </div>
                                            {/* Tab 3 Left */}
                                            <div className="tabs_let-content border-4 border-grunge-black bg-grunge-black shadow-hard rounded-[var(--border-radius--medium)] p-6">
                                                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-[-1deg] inline-block mt-12 mb-8 shadow-hard-sm">
                                                    GIG LIST
                                                </h2>
                                                <div className="tabs_line w-1/2 mx-auto"></div>
                                                <p className="tabs-p pt-8 text-foreground/80 italic font-bold">UPCOMING EVENTS</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tabs_right relative rounded-[var(--border-radius--medium)]">
                                        <div className="w-full h-full relative overflow-visible">
                                            {/* Tab 1 Right - Artists */}
                                            <div className="tabs_video p-4 md:p-8 custom-scrollbar border-4 border-grunge-black overflow-hidden bg-background shadow-hard bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] rounded-[var(--border-radius--medium)]">
                                                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-12 max-w-5xl mx-auto">
                                                    {artists.map(artist => (
                                                        <ArtistProfile key={artist.id} {...artist} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tab 2 Right - Image Marquee */}
                                            <div className="tabs_video border-4 border-grunge-black overflow-hidden rounded-[var(--border-radius--medium)] flex items-center" style={{ background: 'var(--color-grunge-black, #1a1a1a)' }}>
                                                <div className="w-full overflow-hidden bg-grunge-black relative -rotate-2 scale-110 py-10 pointer-events-none">
                                                    <div className="flex animate-marquee gap-8 px-4 h-full items-center pointer-events-auto">
                                                        {shuffledPortfolio.map((item, i) => (
                                                            <div key={i} className="w-72 h-80 shrink-0 border-4 border-grunge-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500 relative group/card overflow-hidden">
                                                                <img src={`https://picsum.photos/seed/${item.seed}/288/320`} alt={`${item.artist} - Tattoo ${i + 1}`} className="w-full h-full object-cover" />
                                                                <div className="absolute inset-0 bg-accent-primary/10 group-hover/card:bg-transparent transition-colors z-10" />
                                                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-grunge-black/80 backdrop-blur-sm translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 z-20">
                                                                    <p className="font-black uppercase italic text-accent-primary text-xs tracking-widest truncate">{item.artist}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {/* Duplicate for seamless loop */}
                                                        {shuffledPortfolio.map((item, i) => (
                                                            <div key={`dup-${i}`} className="w-72 h-80 shrink-0 border-4 border-grunge-black grayscale contrast-125 hover:grayscale-0 transition-all duration-500 relative group/card overflow-hidden">
                                                                <img src={`https://picsum.photos/seed/${item.seed}/288/320`} alt={`${item.artist} - Tattoo ${i + 1}`} className="w-full h-full object-cover" />
                                                                <div className="absolute inset-0 bg-accent-primary/10 group-hover/card:bg-transparent transition-colors z-10" />
                                                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-grunge-black/80 backdrop-blur-sm translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 z-20">
                                                                    <p className="font-black uppercase italic text-accent-primary text-xs tracking-widest truncate">{item.artist}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tab 3 Right - Events */}
                                            <div className="tabs_video p-4 md:p-8 custom-scrollbar border-4 border-grunge-black overflow-hidden bg-background shadow-hard bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] rounded-[var(--border-radius--medium)]">
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
                                                                    <Link to="/events" className="px-6 py-3 border-4 border-grunge-black text-grunge-black font-black uppercase italic hover:bg-grunge-black hover:text-foreground transition-all cursor-pointer text-center w-full md:w-max">
                                                                        SECURE ACCESS
                                                                    </Link>
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

                {/* --- MOBILE VIEW --- */}
                <div className="lg:hidden w-full flex flex-col gap-12 px-4 py-16 relative z-30 max-w-xl mx-auto">
                    {/* Tab 1 Pair */}
                    <div className="border-4 border-grunge-black bg-grunge-black shadow-hard rounded-[var(--border-radius--medium)] p-6 flex flex-col gap-6">
                        <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-1 inline-block mt-2 mb-2 shadow-hard-sm w-max">
                            THE FRONT LINE
                        </h2>

                        <div className="grid grid-cols-3 gap-3 w-full">
                            {[
                                { num: '10+', label: 'YRS RUNNING' },
                                { num: '2', label: 'ARTISTS' },
                                { num: '100%', label: 'CUSTOM' },
                            ].map(({ num, label }) => (
                                <div key={`mob-stat-${label}`} className="border-2 border-accent-primary/40 bg-background/10 py-3 text-center">
                                    <p className="text-accent-primary font-black text-xl italic leading-none">{num}</p>
                                    <p className="text-foreground/50 font-bold uppercase text-[0.6rem] tracking-widest mt-1">{label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="w-1/2 mx-auto h-px bg-foreground/20"></div>

                        <p className="text-foreground/70 italic font-semibold text-sm leading-relaxed px-2 text-center">
                            No flash racks. No cookie-cutter work.<br />
                            Every piece drawn from scratch — built around <span className="text-accent-primary not-italic font-black">you</span>.
                        </p>

                        <div className="bg-background shadow-hard bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] rounded-[var(--border-radius--xsmall)] p-4 border-4 border-grunge-black">
                            <div className="grid grid-cols-1 gap-8">
                                {artists.map(artist => (
                                    <ArtistProfile key={`mobile-${artist.id}`} {...artist} />
                                ))}
                            </div>
                        </div>

                        <a href="#about" className="text-foreground/40 italic font-bold text-xs tracking-[0.2em] uppercase hover:text-accent-primary transition-colors cursor-pointer w-max mx-auto mt-2">MEET THE ARTISTS →</a>
                    </div>

                    {/* Tab 2 Pair: LATEST CUTS */}
                    <div className="border-4 border-grunge-black bg-grunge-black shadow-hard rounded-[var(--border-radius--medium)] p-6 flex flex-col gap-2">
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 -rotate-2 inline-block shadow-hard-sm w-max mx-auto">
                            LATEST CUTS
                        </h2>
                        <p className="text-foreground/80 italic font-bold text-center text-sm mb-4">RECENT SESSIONS</p>

                        <div className="border-4 border-grunge-black overflow-hidden rounded-[var(--border-radius--xsmall)] flex items-center bg-grunge-black/50 py-6">
                            <div className="w-full overflow-hidden relative pointer-events-none">
                                <div className="flex animate-marquee gap-4 px-4 h-full items-center pointer-events-auto">
                                    {shuffledPortfolio.map((item, i) => (
                                        <div key={`mobile-port-${i}`} className="w-40 h-48 shrink-0 border-4 border-grunge-black relative group/card overflow-hidden bg-background">
                                            <img src={`https://picsum.photos/seed/${item.seed}/160/192`} alt={`${item.artist} - Tattoo`} className="w-full h-full object-cover grayscale" />
                                            <div className="absolute inset-x-0 bottom-0 p-2 bg-grunge-black/90 backdrop-blur-sm z-20">
                                                <p className="font-black uppercase italic text-accent-primary text-[10px] tracking-widest truncate">{item.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Duplicate for infinite loop */}
                                    {shuffledPortfolio.map((item, i) => (
                                        <div key={`mobile-port-dup-${i}`} className="w-40 h-48 shrink-0 border-4 border-grunge-black relative group/card overflow-hidden bg-background">
                                            <img src={`https://picsum.photos/seed/${item.seed}/160/192`} alt={`${item.artist} - Tattoo`} className="w-full h-full object-cover grayscale" />
                                            <div className="absolute inset-x-0 bottom-0 p-2 bg-grunge-black/90 backdrop-blur-sm z-20">
                                                <p className="font-black uppercase italic text-accent-primary text-[10px] tracking-widest truncate">{item.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab 3 Pair: GIG LIST */}
                    <div className="border-4 border-grunge-black bg-grunge-black shadow-hard rounded-[var(--border-radius--medium)] p-6 flex flex-col gap-2">
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-grunge-black bg-accent-primary px-6 py-2 rotate-[-1deg] inline-block shadow-hard-sm w-max mx-auto">
                            GIG LIST
                        </h2>
                        <p className="text-foreground/80 italic font-bold text-center text-sm mb-4">UPCOMING EVENTS</p>

                        <div className="bg-background shadow-hard bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] rounded-[var(--border-radius--xsmall)] p-4 border-4 border-grunge-black mt-2">
                            {upcomingEvents.length === 0 ? (
                                <div className="py-8 text-center opacity-40">
                                    <h3 className="text-2xl font-black uppercase italic text-grunge-black tracking-tighter">NO UPCOMING EVENTS</h3>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {upcomingEvents.map(event => (
                                        <div key={`mobile-event-${event.id}`} className="bg-accent-secondary border-4 border-grunge-black p-6 relative flex flex-col justify-center space-y-4">
                                            <div className="bg-grunge-black text-accent-primary px-3 py-1 font-black uppercase italic text-xs w-max">
                                                {event.date}
                                            </div>
                                            <h3 className="text-2xl font-black uppercase italic leading-none tracking-tighter text-grunge-black">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm font-bold uppercase italic text-grunge-black opacity-80 leading-tight">
                                                {event.location}
                                            </p>
                                            <Link to="/events" className="px-4 py-2 border-4 border-grunge-black text-grunge-black font-black uppercase italic text-center text-sm">
                                                SECURE ACCESS
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-16 px-6 md:px-16 bg-background border-t-4 border-grunge-black relative z-20">
                {/* Blurb */}
                <p className="text-foreground/60 italic font-semibold text-base leading-relaxed max-w-2xl mx-auto text-center mb-14">
                    Below Ground Ink is a custom tattoo studio in <span className="text-accent-primary not-italic font-black">Kane, Pennsylvania</span> —
                    owned and operated by Shya Morris and Megan Rohr. Every piece is drawn from scratch, built for the person in the chair.
                    No flash racks. No walk-ins. No regrets.
                </p>

                {/* Owner cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Shya */}
                    <div className="group flex gap-5 items-start border-4 border-grunge-black bg-grunge-black p-6 shadow-hard hover:border-accent-primary transition-colors duration-300">
                        <div className="w-20 h-20 shrink-0 overflow-hidden border-2 border-accent-primary">
                            <img src="https://picsum.photos/seed/shya-morris-about/160/160" alt="Shya Morris" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-accent-primary font-black uppercase italic text-[10px] tracking-widest">Co-Owner · Lead Artist</p>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground">Shya Morris</h3>
                            <p className="text-foreground/50 italic text-sm font-semibold leading-snug">Raw blackwork &amp; dark illustrative work. A decade of ink on skin, no apologies.</p>
                        </div>
                    </div>

                    {/* Megan */}
                    <div className="group flex gap-5 items-start border-4 border-grunge-black bg-grunge-black p-6 shadow-hard hover:border-accent-primary transition-colors duration-300">
                        <div className="w-20 h-20 shrink-0 overflow-hidden border-2 border-accent-primary">
                            <img src="https://picsum.photos/seed/megan-rohr-about/160/160" alt="Megan Rohr" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-accent-primary font-black uppercase italic text-[10px] tracking-widest">Co-Owner · Artist</p>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground">Megan Rohr</h3>
                            <p className="text-foreground/50 italic text-sm font-semibold leading-snug">Biomechanical surrealism — vivid, strange, and built to last.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
