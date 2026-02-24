import React from 'react';

interface GrungeCardProps {
    children: React.ReactNode;
    className?: string;
    withTape?: boolean;
}

const GlassCard: React.FC<GrungeCardProps> = ({ children, className = "", withTape = false }) => {
    return (
        <div className={`grunge-card ${className}`}>
            {withTape && <div className="tape-top" />}
            {children}
        </div>
    );
};

export default GlassCard;
