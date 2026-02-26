import React from 'react';

interface UserAvatarProps {
    src: string;
    rating?: number;
    showBadge?: boolean;
    size?: number;
    className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
    src, 
    rating, 
    showBadge = true, 
    size = 48,
    className = ""
}) => {
    // Scaling factors based on a base size of 48px
    const badgeSize = Math.round(size * 0.4);
    const badgeTopRight = -Math.round(size * 0.05);
    const ratingBottom = -Math.round(size * 0.12);
    const ratingFontSize = Math.max(10, Math.round(size * 0.22));
    const ratingGap = Math.round(size * 0.08);
    const ratingPadding = `${Math.round(size * 0.04)}px ${Math.round(size * 0.16)}px`;

    return (
        <div 
            className={`user-avatar-container ${className}`}
            style={{ 
                position: 'relative', 
                width: `${size}px`, 
                height: `${size}px`, 
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                maxWidth: `${size}px`,
                maxHeight: `${size}px`,
                flexShrink: 0,
                display: 'block'
            }}
        >
            {/* Main Avatar Image */}
            <img 
                src={src} 
                alt="" 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    display: 'block',
                    border: '1px solid #f0f0f0',
                    boxSizing: 'border-box'
                }} 
            />

            {/* Verification Badge (Top Right) */}
            {showBadge && (
                <div style={{ 
                    position: 'absolute', 
                    top: badgeTopRight, 
                    right: badgeTopRight, 
                    width: `${badgeSize}px`, 
                    height: `${badgeSize}px`, 
                    zIndex: 2,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.5 4.5H18V8L20.5 10.5V13.5L18 16V19.5H14.5L12 22L9.5 19.5H6V16L3.5 13.5V10.5L6 8V4.5H9.5L12 2Z" fill="black"/>
                        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            )}

            {/* Rating Badge (Bottom Center) */}
            {rating !== undefined && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: ratingBottom, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fbbf24',
                    padding: ratingPadding,
                    borderRadius: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: `${ratingGap}px`,
                    fontSize: `${ratingFontSize}px`,
                    fontWeight: '800',
                    border: '2px solid white',
                    whiteSpace: 'nowrap',
                    zIndex: 3,
                    minWidth: `${Math.round(size * 0.75)}px`,
                    boxSizing: 'border-box'
                }}>
                    <span style={{ color: 'black', display: 'flex', alignItems: 'center', height: '1em' }}>
                        <svg width={ratingFontSize} height={ratingFontSize} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                    </span>
                    <span style={{ color: 'black', lineHeight: 1 }}>{rating.toFixed(1)}</span>
                </div>
            )}
        </div>
    );
};

