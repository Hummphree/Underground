import React, { useId, useState } from 'react';

interface ArtistProfileProps {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    role?: string;
    photo?: string;
}

const PORTFOLIO_SEEDS = ['tat01', 'tat02', 'tat03', 'tat04', 'tat05', 'tat06', 'tat07', 'tat08', 'tat09'];

const ArtistProfile: React.FC<ArtistProfileProps> = ({ name, role = 'LEAD ARTIST', photo }) => {
    const uid = useId().replace(/:/g, '');
    const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

    // Get 2–3 initials for the SVG mask
    const initials = name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 3);

    const thumbnailSrc = photo ?? `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`;

    const artistSlug = name.replace(/\s+/g, '-').toLowerCase();
    const portfolioPieces = PORTFOLIO_SEEDS.map((seed, i) => ({
        src: `https://picsum.photos/seed/${artistSlug}-${seed}/300/380`,
        alt: `${name} — piece ${i + 1}`,
    }));

    const letterSpacing = 50 / (initials.length + 1);
    const letters = initials.split('').map((ch, i) => ({
        ch,
        x: letterSpacing * (i + 1),
    }));

    return (
        <>
            <style>{`
                /* ── SVG mask thumbnail ── */
                .ap-thumb-${uid} {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    cursor: pointer;
                }

                /* the SVG itself fills the container and shows photo as background */
                .ap-svg-${uid} {
                    background: url('${thumbnailSrc}') center/cover no-repeat;
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: transform 0.5s ease;
                }
                .ap-thumb-${uid}:hover .ap-svg-${uid} {
                    transform: scale(1.04);
                }

                /* SVG text letters (mask cutouts) */
                .ap-svg-${uid} text {
                    font-size: 10px;
                    transition: font-size 0.45s ease-out;
                    font-weight: 900;
                    font-family: Arial, sans-serif;
                }
                .ap-thumb-${uid}:hover .ap-svg-${uid} text {
                    transition: font-size 0.45s ease-in;
                    font-size: 300px;
                }

                /* ── Portfolio overlay (lives inside the thumbnail box) ── */
                .ap-overlay-${uid} {
                    position: absolute;
                    inset: 0;
                    overflow-y: ${zoomedIndex !== null ? 'hidden' : 'auto'};
                    overscroll-behavior: contain;
                    padding: 3rem 0.5rem 0.5rem;
                    background: #f6eee3;
                    background-size: 20px 20px;
                    background-image: repeating-linear-gradient(
                        0deg,
                        #e5decf,
                        #e5decf 1px,
                        #f6eee3 1px,
                        #f6eee3
                    );
                    /* hidden by default, slide up on hover */
                    transform: translateY(100%);
                    opacity: 0;
                    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                                opacity 0.35s ease;
                    pointer-events: none;
                }
                .ap-thumb-${uid}:hover .ap-overlay-${uid} {
                    transform: translateY(0);
                    opacity: 1;
                    pointer-events: auto;
                }

                /* ── Paper grid ── */
                .ap-grid-${uid} {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 0.35rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                @media (max-width: 500px) {
                    .ap-grid-${uid} {
                        grid-template-columns: 1fr 1fr;
                    }
                }
                .ap-grid-${uid}:has(li:hover) li:not(:hover) {
                    filter: blur(3px);
                }
                .ap-grid-${uid}:has(.zoomed) li:not(:has(.zoomed)) {
                    filter: blur(8px);
                    opacity: 0.6;
                }
                .ap-grid-${uid} li {
                    margin: 0;
                    transition: filter 150ms ease-in-out;
                    list-style: none;
                }
                .ap-grid-${uid} li::before { content: ''; }
                .ap-paper-tile-${uid} {
                    background: #fff;
                    box-shadow: 1px 1px 3px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.05);
                    padding: 0.3rem 0.3rem 0.25rem;
                    border-radius: 2px;
                    cursor: pointer;
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, z-index 0s;
                    position: relative;
                    z-index: 1;
                }
                .ap-paper-tile-${uid}.zoomed {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 100;
                    box-shadow: 0 15px 50px rgba(0,0,0,0.6), 0 0 0 2000px #f6eee3;
                    cursor: zoom-out;
                    pointer-events: auto;
                    filter: none !important;
                    opacity: 1 !important;
                    width: 92%;
                    height: auto;
                }
                .ap-paper-tile-${uid} img {
                    display: block;
                    width: 100%;
                    margin-bottom: 0.3rem;
                    filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.2));
                }
                .ap-paper-tile-${uid} p {
                    font-family: 'Neucha', cursive, sans-serif;
                    font-size: 0.6rem;
                    color: #999;
                    text-align: center;
                    margin: 0;
                    font-style: italic;
                }
            `}</style>

            <div className="grunge-card overflow-hidden p-0 flex flex-col h-full" style={{ background: '#E3DFD2' }}>
                {/* ── Tape strip ── */}
                <div className="tape-top" />

                {/* ── Thumbnail + Portfolio Overlay ── */}
                <div className={`ap-thumb-${uid}`}>

                    {/* Role badge */}
                    <div className="absolute top-4 left-4 z-20 bg-accent-primary text-grunge-black px-3 py-1 font-black uppercase italic text-xs rotate-[-5deg] shadow-hard-sm pointer-events-none border border-grunge-black">
                        {role.toUpperCase()}
                    </div>

                    {/* SVG Mask */}
                    <svg
                        className={`ap-svg-${uid}`}
                        viewBox="0 0 50 75"
                        aria-label={`${name} — hover to view portfolio`}
                        style={{ width: '100%', height: 'auto', display: 'block', border: '4px solid var(--color-accent-primary)' }}
                    >
                        <defs>
                            <mask id={`mask-${uid}`} x="0" y="0" width="100" height="75">
                                <rect x="0.5" y="0.5" width="49" height="74" fill="#000" />
                                {letters.map(({ ch, x }) => (
                                    <text
                                        key={ch + x}
                                        x={x}
                                        textAnchor="middle"
                                        y="75"
                                        dy="0"
                                        fill="#fff"
                                    >
                                        {ch}
                                    </text>
                                ))}
                            </mask>
                        </defs>
                        <rect
                            x="0.5"
                            y="0.5"
                            width="49"
                            height="74"
                            mask={`url(#mask-${uid})`}
                            fillOpacity="1"
                            fill="var(--color-accent-primary)"
                        />
                    </svg>

                    {/* Portfolio overlay — slides up on parent hover */}
                    <div
                        className={`ap-overlay-${uid}`}
                        onMouseLeave={() => setZoomedIndex(null)}
                    >
                        <p style={{
                            fontFamily: "'Neucha', cursive, sans-serif",
                            fontSize: '0.95rem',
                            color: '#5a3e1b',
                            fontWeight: 900,
                            fontStyle: 'italic',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            marginBottom: '0.75rem',
                            paddingLeft: '4.5rem',
                            textAlign: 'center',
                        }}>
                            {name}'s Portfolio
                        </p>
                        <ul className={`ap-grid-${uid}`}>
                            {portfolioPieces.map((piece, i) => (
                                <li key={i}>
                                    <div
                                        className={`ap-paper-tile-${uid} ${zoomedIndex === i ? 'zoomed' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setZoomedIndex(zoomedIndex === i ? null : i);
                                        }}
                                    >
                                        <img src={piece.src} alt={piece.alt} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
        </>
    );
};

export default ArtistProfile;
