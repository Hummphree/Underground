import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            if (id === 'frontline' && pathname === '/') {
                setTimeout(() => {
                    window.scrollTo({ top: 500, behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.getElementById(id);
                if (element) {
                    // Small timeout to ensure component is rendered and layout is stable
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        } else {
            // No hash, so scroll to top on route change!
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [hash, pathname]);

    return null;
};

export default ScrollToHash;
