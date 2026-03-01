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
    showBadge = false, 
    size = 48,
    className = ""
}) => {
    const hasRating = rating !== undefined && rating !== null && rating > 0;
    
    // Scaling factors
    const badgeSize = Math.round(size * 0.45);
    const badgeOffset = -Math.round(size * 0.05);

    return (
        <div 
            className={`user-avatar-container ${className}`}
            style={{ 
                position: 'relative', 
                width: `${size}px`, 
                height: `${size}px`, 
                minWidth: `${size}px`,
                maxWidth: `${size}px`,
                flexShrink: 0
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

            {/* Verification Badge (Bottom Right) - Only show if NO RATING */}
            {showBadge && !hasRating && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: badgeOffset, 
                    right: badgeOffset, 
                    width: `${badgeSize}px`, 
                    height: `${badgeSize}px`, 
                    zIndex: 2,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.5 4.5H18V8L20.5 10.5V13.5L18 16V19.5H14.5L12 22L9.5 19.5H6V16L3.5 13.5V10.5L6 8V4.5H9.5L12 2Z" fill="#3b82f6"/>
                        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            )}

            {/* Rating Badge (Bottom Right) */}
            {hasRating && (
                <div style={{
                    position: 'absolute',
                    bottom: badgeOffset,
                    right: badgeOffset,
                    backgroundColor: 'white',
                    padding: `${Math.round(size * 0.04)}px ${Math.round(size * 0.12)}px`,
                    borderRadius: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    fontSize: `${Math.round(size * 0.22)}px`,
                    fontWeight: '800',
                    border: '1px solid #f1f5f9',
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                    boxSizing: 'border-box'
                }}>
                    <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center' }}>
                        <svg width={Math.round(size * 0.22)} height={Math.round(size * 0.22)} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                    </span>
                    <span style={{ color: '#111827', lineHeight: 1 }}>{rating!.toFixed(1)}</span>
                </div>
            )}
        </div>
    );
};
