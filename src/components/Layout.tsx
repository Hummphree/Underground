import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Instagram, MapPin, Clock } from 'lucide-react';
import GooeyMenu from './GooeyMenu';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen bg-background selection:bg-accent-primary selection:text-grunge-black">
            <div className="relative z-10 flex flex-col min-h-screen">
                <header id="global-header" className="h-24 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] px-4 md:px-8 border-b-8 border-grunge-black bg-accent-primary sticky top-0 z-[100] overflow-visible">
                    {/* Desktop: GooeyMenu on Left, Nav on right (near logo) */}
                    <div className="hidden md:flex justify-between items-center w-full h-full">
                        <div className="relative z-[200]">
                            <GooeyMenu origin="left" />
                        </div>
                        <nav className="flex justify-end gap-2 xl:gap-4 pr-2 xl:pr-6">
                            <Link to="/events" className="bg-grunge-black text-foreground px-3 lg:px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors transition-transform -rotate-1 hover:rotate-0 shadow-[2px_2px_0px_rgba(0,0,0,0.4)] text-xs lg:text-sm xl:text-base whitespace-nowrap">Events</Link>
                            <Link to="/#frontline" className="bg-grunge-black text-foreground px-3 lg:px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors transition-transform rotate-1 hover:rotate-0 shadow-[2px_2px_0px_rgba(0,0,0,0.4)] text-xs lg:text-sm xl:text-base whitespace-nowrap">Meet the Artists</Link>
                        </nav>
                    </div>

                    {/* Logo: Snaps left on mobile, centers on desktop */}
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center justify-start md:justify-center group relative md:col-start-2">
                        <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden shrink-0 relative md:pb-3">
                            <div className="ink-explosion-overlay" />
                            <img src="/Logo.png" alt="Below Ground Ink" className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </Link>

                    {/* Mobile: GooeyMenu on the Right */}
                    <div className="flex md:hidden justify-end relative z-[200]">
                        <GooeyMenu origin="right" />
                    </div>

                    {/* Desktop: Right Nav */}
                    <div className="hidden md:flex justify-start items-center w-full h-full">
                        <nav className="flex justify-start gap-2 xl:gap-4 pl-2 xl:pl-6">
                            <Link to="/aftercare" className="bg-grunge-black text-foreground px-3 lg:px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors transition-transform rotate-1 hover:rotate-0 shadow-[2px_2px_0px_rgba(0,0,0,0.4)] text-xs lg:text-sm xl:text-base whitespace-nowrap">Aftercare</Link>
                            <Link to="/scheduling" className="bg-grunge-black text-foreground px-3 lg:px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors transition-transform -rotate-1 hover:rotate-0 shadow-[2px_2px_0px_rgba(0,0,0,0.4)] text-xs lg:text-sm xl:text-base whitespace-nowrap">Schedule Now</Link>
                            <Link to="/contact" className="bg-grunge-black text-foreground px-3 lg:px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors transition-transform -rotate-1 hover:rotate-0 shadow-[2px_2px_0px_rgba(0,0,0,0.4)] text-xs lg:text-sm xl:text-base whitespace-nowrap">Contact</Link>
                        </nav>
                    </div>
                </header>

                {!isHome && (
                    <div className="px-8 pt-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-accent-primary text-grunge-black p-3 hover:bg-grunge-black hover:text-accent-primary transition-all border-4 border-grunge-black rotate-[-2deg] active:rotate-0 flex items-center justify-center group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12"
                        >
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}

                <main className={isHome ? "flex-grow w-full" : "flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full"}>
                    {children}
                </main>

                <footer className="w-full p-8 md:p-12 border-t-8 border-grunge-black bg-grunge-black text-foreground relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary animate-pulse" />

                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
                        {/* Logo Section */}
                        <div className="flex flex-col items-center md:items-start gap-6">
                            <div className="flex gap-4 items-center">
                                <img src="/Logo_White.png" alt="Below Ground Ink logo" className="w-20 h-20 md:w-24 md:h-24 object-contain rotate-3 hover:rotate-0 transition-transform bg-foreground/5 rounded-full p-2 border-2 border-foreground/20" />
                            </div>
                            <div className="flex flex-col font-black uppercase italic tracking-[0.2em] text-sm opacity-60 text-center md:text-left">
                                <span>Below Ground Ink</span>
                                <span>© 2026 Studio Humphrey</span>
                            </div>
                        </div>

                        {/* Menu Buttons */}
                        <div className="flex flex-col gap-4 text-center md:text-right">
                            <h3 className="font-black uppercase italic tracking-widest text-accent-primary text-xl mb-2">Navigate</h3>
                            <Link to="/events" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Events</Link>
                            <Link to="/#frontline" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Meet the Artists</Link>
                            <Link to="/scheduling" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Schedule Now</Link>
                            <Link to="/aftercare" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Aftercare</Link>
                        </div>

                        {/* Contact & Hours */}
                        <div className="flex flex-col gap-4 text-center md:text-right">
                            <h3 className="font-black uppercase italic tracking-widest text-accent-primary text-xl mb-2">Contact</h3>
                            <Link to="/contact" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Get in Touch</Link>
                            <Link to="/scheduling" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Book a Session</Link>
                            <a href="tel:+18005551234" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">1-800-INK-DEEP</a>
                            <a href="mailto:booking@belowgroundink.com" className="font-bold uppercase tracking-widest text-xs text-foreground/60 hover:text-accent-primary transition-colors break-all">booking@belowgroundink.com</a>
                        </div>

                        {/* Hours */}
                        <div className="flex flex-col gap-3 text-center md:text-right">
                            <h3 className="font-black uppercase italic tracking-widest text-accent-primary text-xl mb-2 flex items-center gap-2 justify-center md:justify-end">
                                <Clock className="w-4 h-4" /> Hours
                            </h3>
                            <p className="font-bold uppercase tracking-widest text-xs text-foreground/80">Mon – Fri: 11am – 8pm</p>
                            <p className="font-bold uppercase tracking-widest text-xs text-foreground/80">Sat: 10am – 6pm</p>
                            <p className="font-bold uppercase tracking-widest text-xs text-foreground/60">Sun: Closed</p>
                            <div className="flex items-center gap-2 justify-center md:justify-end mt-1">
                                <MapPin className="w-3 h-3 text-accent-primary" />
                                <a href="https://maps.google.com/?q=Kane,+PA" target="_blank" rel="noopener noreferrer" className="font-bold uppercase tracking-widest text-xs hover:text-accent-primary transition-colors">123 Underground Ave, Kane PA</a>
                            </div>
                        </div>

                        {/* Social & Legal */}
                        <div className="flex flex-col gap-4 text-center md:text-right">
                            <h3 className="font-black uppercase italic tracking-widest text-accent-primary text-xl mb-2">Follow</h3>
                            <a href="https://instagram.com/belowgroundink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center md:justify-end font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">
                                <Instagram className="w-4 h-4" /> Instagram
                            </a>
                            <Link
                                to="/consent"
                                className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors"
                            >
                                Consent Form
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
