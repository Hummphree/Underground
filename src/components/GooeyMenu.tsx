import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GooeyMenu.css';

interface GooeyMenuProps {
    origin: 'left' | 'right';
}

const GooeyMenu: React.FC<GooeyMenuProps> = ({ origin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    // Positions mapping for different origins so they don't fly off screen
    // [x(vw), y(vh)]
    const positions = {
        left: [
            { x: 25, y: 30 },
            { x: 50, y: 25 },
            { x: 75, y: 30 },
            { x: 35, y: 60 },
            { x: 65, y: 60 },
        ],
        right: [
            { x: 75, y: 30 }, // Inverted for right side
            { x: 50, y: 25 },
            { x: 25, y: 30 },
            { x: 65, y: 60 },
            { x: 35, y: 60 },
        ]
    };

    const currentPositions = positions[origin];

    return (
        <div className={`gooey-menu-wrapper ${origin}`}>
            <nav className="gooey-menu">
                <input
                    type="checkbox"
                    id={`menu-toggle-${origin}`}
                    className="gooey-menu__toggle"
                    checked={isOpen}
                    onChange={(e) => setIsOpen(e.target.checked)}
                />

                {/* Expanding background */}
                <label htmlFor={`menu-toggle-${origin}`} className="gooey-menu__toggle-label"></label>

                {/* The actual button */}
                <label htmlFor={`menu-toggle-${origin}`} className="gooey-menu__toggle-label gooey-menu__toggle-label--closer">
                    <svg className="gooey-menu__icon" preserveAspectRatio="xMinYMin" viewBox="0 0 24 24">
                        {/* Hamburger icon */}
                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                    </svg>
                    <svg className="gooey-menu__icon" preserveAspectRatio="xMinYMin" viewBox="0 0 24 24">
                        {/* Close (X) icon */}
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </label>

                <div className="gooey-menu__container">
                    <ul className="gooey-menu__content">
                        <li className="gooey-menu__item" style={{ '--delay': '0.1', '--x': currentPositions[0].x, '--y': currentPositions[0].y } as React.CSSProperties}>
                            <Link to="/events" className="gooey-menu__link" onClick={closeMenu}>EVENTS</Link>
                        </li>
                        <li className="gooey-menu__item" style={{ '--delay': '0.2', '--x': currentPositions[1].x, '--y': currentPositions[1].y } as React.CSSProperties}>
                            <Link to="/#frontline" className="gooey-menu__link" onClick={closeMenu}>ARTISTS</Link>
                        </li>
                        <li className="gooey-menu__item" style={{ '--delay': '0.3', '--x': currentPositions[2].x, '--y': currentPositions[2].y } as React.CSSProperties}>
                            <Link to="/scheduling" className="gooey-menu__link" onClick={closeMenu}>BOOK</Link>
                        </li>
                        <li className="gooey-menu__item" style={{ '--delay': '0.4', '--x': currentPositions[3].x, '--y': currentPositions[3].y } as React.CSSProperties}>
                            <Link to="/aftercare" className="gooey-menu__link" onClick={closeMenu}>AFTERCARE</Link>
                        </li>
                        <li className="gooey-menu__item" style={{ '--delay': '0.5', '--x': currentPositions[4].x, '--y': currentPositions[4].y } as React.CSSProperties}>
                            <Link to="/contact" className="gooey-menu__link" onClick={closeMenu}>CONTACT</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* SVG Filter for the Gooey Effect */}
            <svg style={{ position: 'absolute', left: '100%', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="BLUR" />
                        <feColorMatrix in="BLUR" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="GOO" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default GooeyMenu;
