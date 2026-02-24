import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
                <header id="global-header" className="h-24 flex items-center justify-between px-8 border-b-8 border-grunge-black bg-accent-primary sticky top-0 z-50">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-3 group relative">
                            <div className="w-28 h-28 flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden shrink-0 relative">
                                <div className="ink-explosion-overlay" />
                                <img src="/Logo.png" alt="Below Ground Ink" className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                        </Link>
                    </div>
                    <nav className="hidden md:flex gap-4">
                        <Link to="/events" className="bg-grunge-black text-foreground px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors -rotate-1">Events</Link>
                        <Link to="/#frontline" className="bg-grunge-black text-foreground px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors rotate-1">Meet the Artists</Link>
                        <Link to="/scheduling" className="bg-grunge-black text-foreground px-4 py-1 font-black uppercase italic tracking-tighter hover:bg-background hover:text-grunge-black transition-colors -rotate-1">Schedule Now</Link>
                    </nav>
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
                                <img src="/Logo.png" alt="Below Ground Ink Primary" className="w-20 h-20 md:w-24 md:h-24 object-contain -rotate-3 hover:rotate-0 transition-transform bg-accent-primary/10 rounded-full p-2 border-2 border-accent-primary" />
                                <img src="/Logo_White.png" alt="Below Ground Ink Secondary" className="w-20 h-20 md:w-24 md:h-24 object-contain rotate-3 hover:rotate-0 transition-transform bg-foreground/5 rounded-full p-2 border-2 border-foreground/20" />
                            </div>
                            <div className="flex flex-col font-black uppercase italic tracking-[0.2em] text-sm opacity-60 text-center md:text-left">
                                <span>Below Ground Ink</span>
                                <span>SUBTERRANEAN SESSIONS</span>
                            </div>
                        </div>

                        {/* Menu Buttons */}
                        <div className="flex flex-col gap-4 text-center md:text-right">
                            <h3 className="font-black uppercase italic tracking-widest text-accent-primary text-xl mb-2">Navigate</h3>
                            <Link to="/events" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Events</Link>
                            <Link to="/#frontline" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Meet the Artists</Link>
                            <Link to="/scheduling" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">Schedule Now</Link>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-4 text-center md:text-right">
                            <h3 className="font-black uppercase italic tracking-widest text-accent-primary text-xl mb-2">Contact</h3>
                            <a href="tel:+1800INKDEEP" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">1-800-INK-DEEP</a>
                            <a href="mailto:booking@belowground.ink" className="font-bold uppercase tracking-widest text-sm hover:text-accent-primary transition-colors">booking@belowground.ink</a>
                            <p className="font-bold uppercase tracking-widest text-xs text-foreground/60 mt-1">123 Underground Ave<br />Seattle, WA 98101</p>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-4 border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-xs">
                        <p className="font-black uppercase italic tracking-[0.2em]">© Humphrey Studio 2026</p>
                        <div className="flex gap-8 font-black uppercase italic tracking-widest">
                            <span>DIY OR DIE</span>
                            <span>NO SELL OUTS</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
