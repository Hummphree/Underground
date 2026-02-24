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
                <header className="h-24 flex items-center justify-between px-8 border-b-8 border-grunge-black bg-accent-primary sticky top-0 z-50">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-20 h-20 flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform overflow-hidden shrink-0">
                                <img src="/Logo.png" alt="Below Ground Ink" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col -space-y-2">
                                <span className="font-black text-3xl tracking-tighter uppercase italic text-grunge-black leading-none">Below Ground</span>
                                <span className="font-black text-xl uppercase tracking-tighter text-grunge-black ml-1">Ink / Post-Punk</span>
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

                <main className="flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full">
                    {children}
                </main>

                <footer className="p-12 border-t-8 border-grunge-black bg-grunge-black text-foreground overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary animate-pulse" />
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
                        <p className="font-black uppercase italic tracking-[0.2em] text-sm">Below Ground Ink // 1994-2026</p>
                        <div className="flex gap-8 font-black uppercase italic text-xs tracking-widest">
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
