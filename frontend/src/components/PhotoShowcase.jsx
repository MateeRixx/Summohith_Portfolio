import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const GOLD = '#CE8715';

// 1. Justified Grid Item (Removed Reveal Animation)
const GridItem = React.memo(({ item, onClick }) => (
    <div 
        className="photo-grid-item"
        onClick={() => onClick(item)}
        style={{ 
            height: '350px',
            flexGrow: 0,
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.03)',
            position: 'relative'
        }}
    >
        <img 
            src={item.afterImage || item.url} 
            loading="lazy"
            decoding="async"
            style={{ 
                height: '100%',
                width: '100%',
                objectFit: 'cover'
            }}
            alt={item.title}
            onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.target;
                e.target.parentNode.style.flexGrow = (naturalWidth / naturalHeight).toFixed(3);
                e.target.parentNode.style.width = `${(naturalWidth / naturalHeight) * 350}px`;
            }}
        />
        <div className="masonry-minimal-overlay" />
    </div>
));

const PhotoShowcase = ({ items }) => {
  const openGallery = () => {
    window.open(window.location.origin + '?gallery=true', '_blank');
  };

  return (
    <div style={{ 
        height: '400px', width: '100%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(5,3,1,0.2)', position: 'relative',
        borderRadius: '24px', border: `1px solid ${GOLD}22`,
        overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem',
        opacity: 0.1, filter: 'blur(10px)', padding: '2rem', pointerEvents: 'none'
      }}>
        {items.slice(0, 16).map((item, i) => (
          <img 
            key={`bg-${i}`}
            src={item.afterImage || item.url} 
            loading="lazy"
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
            alt=""
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ 
            fontFamily: 'var(--font-display)', fontSize: '3rem', 
            color: GOLD, letterSpacing: '10px', opacity: 0.8, marginBottom: '2rem'
        }}>ARCHIVE</h2>
        <button onClick={openGallery} className="btn-glass" style={{ padding: '1.2rem 4rem', fontSize: '0.9rem' }}>
            EXPLORE WORKS
        </button>
      </div>
    </div>
  );
};

export const GridView = ({ items, onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Subtle and smooth section fade
        gsap.fromTo(containerRef.current, 
            { opacity: 0 },
            { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
        );
    }, []);

    return (
        <div 
            ref={containerRef}
            style={{
                minHeight: '100vh', background: '#050301',
                padding: '8rem 4vw 4rem', overflowX: 'hidden',
                opacity: 0 // Start hidden for GSAP
            }}
        >
            <button 
                onClick={onBack}
                style={{
                    position: 'fixed', top: '2rem', left: '2rem',
                    background: 'rgba(20,20,20,0.8)', border: `1px solid ${GOLD}44`, color: GOLD,
                    cursor: 'pointer', zIndex: 100, fontSize: '0.75rem',
                    letterSpacing: '3px', padding: '1rem 2.5rem',
                    backdropFilter: 'blur(20px)', borderRadius: '100px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform, background'
                }}
                className="exit-btn"
            >CLOSE GALLERY</button>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                maxWidth: '2200px', margin: '0 auto',
                width: '100%'
            }}>
                {items.map((item) => (
                    <GridItem key={item.id} item={item} onClick={setSelectedImage} />
                ))}
                <div style={{ flexGrow: 999999, height: 0 }} />
            </div>

            {/* ── LIGHTBOX ── */}
            {selectedImage && (
                <div 
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 10000,
                        background: 'rgba(0,0,0,0.98)', backdropFilter: 'blur(20px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-out', padding: '2vw'
                    }}
                >
                    <img 
                        src={selectedImage.afterImage || selectedImage.url} 
                        className="lightbox-img"
                        style={{ 
                            maxWidth: '100%', maxHeight: '95vh', 
                            objectFit: 'contain', 
                            boxShadow: '0 0 120px rgba(0,0,0,0.9)',
                            borderRadius: '8px'
                        }}
                        alt={selectedImage.title}
                    />
                </div>
            )}
        </div>
    );
};

export default PhotoShowcase;
