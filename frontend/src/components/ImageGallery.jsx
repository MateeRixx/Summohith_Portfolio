import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const GOLD = '#CE8715';

/* ── Full-screen lightbox for single images ── */
const Lightbox = ({ items, startIndex, onClose }) => {
  const [current, setCurrent]  = useState(startIndex);
  const overlayRef = useRef(null);
  const imgRef     = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const animateTransition = (dir, nextIndex) => {
    gsap.to(imgRef.current, { opacity: 0, x: dir * -60, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setCurrent(nextIndex);
        gsap.fromTo(imgRef.current, { opacity: 0, x: dir * 60 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' });
      }
    });
  };

  const prev = () => { if (current > 0) animateTransition(-1, current - 1); };
  const next = () => { if (current < items.length - 1) animateTransition(1, current + 1); };

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      handleClose();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  const item = items[current];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(8,6,2,0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Close */}
      <button onClick={handleClose} aria-label="Close" style={{
        position: 'fixed', top: '1.5rem', right: '1.5rem',
        background: 'transparent', border: `1px solid rgba(221,175,144,0.2)`,
        color: 'var(--text-secondary)', width: 40, height: 40,
        borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10,
      }}>✕</button>

      {/* Counter */}
      <p style={{
        position: 'fixed', top: '1.8rem', left: '50%', transform: 'translateX(-50%)',
        fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase',
        color: 'var(--text-secondary)', opacity: 0.5,
      }}>
        {current + 1} / {items.length}
      </p>

      {/* Main image */}
      <div style={{ position: 'relative', maxWidth: '1100px', width: '100%', textAlign: 'center' }}>
        <img
          ref={imgRef}
          src={item.image || item.afterImage}
          alt={item.title}
          style={{
            maxWidth: '100%', maxHeight: '80vh',
            objectFit: 'contain', display: 'inline-block',
            borderRadius: '12px',
            boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 20px ${GOLD}18`,
          }}
        />
        {/* Prev arrow */}
        {current > 0 && (
          <button onClick={prev} style={arrowStyle('left')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}
        {/* Next arrow */}
        {current < items.length - 1 && (
          <button onClick={next} style={arrowStyle('right')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center', maxWidth: '600px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                     color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {item.description}
        </p>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          {item.tags?.map(t => (
            <span key={t} style={{
              fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: '20px',
              background: `${GOLD}18`, border: `1px solid ${GOLD}40`, color: GOLD,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const arrowStyle = (side) => ({
  position: 'absolute', top: '50%', [side]: '-4rem',
  transform: 'translateY(-50%)',
  background: 'rgba(20,16,8,0.8)', border: `1px solid rgba(221,175,144,0.2)`,
  color: 'var(--text-primary)', borderRadius: '50%',
  width: 46, height: 46, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
});

/* ── The Gallery Row itself ── */
const ImageGallery = ({ items }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const dragging  = useRef(false);
  const moved     = useRef(false);             // distinguish drag vs click

  const onMouseDown = (e) => {
    dragging.current  = true;
    moved.current     = false;
    startX.current    = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const walk = (e.pageX - scrollRef.current.offsetLeft - startX.current) * 1.5;
    if (Math.abs(walk) > 4) moved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const stopDrag = () => {
    dragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  return (
    <>
      {/* Horizontal gallery row */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="hide-scrollbar"
        style={{
          display:         'flex',
          gap:             '1rem',
          padding:         '2.5rem 2rem 1.5rem',
          overflowX:       'auto',
          cursor:          'grab',
          maxWidth:        '1200px',
          margin:          '0 auto',
          scrollbarWidth:  'none',
        }}
      >
        {items.map((item, idx) => (
          <GalleryTile
            key={item.id}
            item={item}
            onClick={() => { if (!moved.current) setLightboxIndex(idx); }}
          />
        ))}
        <div style={{ minWidth: '2rem', flexShrink: 0 }} />
      </div>

      {/* Scroll hint */}
      <p style={{
        textAlign: 'center', fontSize: '0.7rem', letterSpacing: '2px',
        color: 'var(--text-secondary)', opacity: 0.4,
        textTransform: 'uppercase', paddingBottom: '0.5rem',
      }}>
        click to open · drag to explore
      </p>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};

/* ── Single gallery tile ── */
const GalleryTile = ({ item, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const tileRef = useRef(null);

  useEffect(() => {
    gsap.to(tileRef.current, { y: hovered ? -5 : 0, duration: 0.35, ease: 'power2.out' });
  }, [hovered]);

  return (
    <div
      ref={tileRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:         '0 0 auto',
        width:        '300px',
        borderRadius: '14px',
        overflow:     'hidden',
        cursor:       'pointer',
        position:     'relative',
        border:       `1px solid ${hovered ? GOLD + '55' : 'rgba(221,175,144,0.12)'}`,
        boxShadow:    hovered ? `0 0 24px ${GOLD}33` : '0 4px 20px rgba(0,0,0,0.4)',
        transition:   'border-color 0.35s ease, box-shadow 0.35s ease',
        willChange:   'transform',
      }}
    >
      {/* Image */}
      <img
        src={item.image || item.afterImage}
        alt={item.title}
        draggable={false}
        style={{
          width: '100%', height: '220px', objectFit: 'cover', display: 'block',
          transition: 'transform 0.5s ease, filter 0.5s ease',
          transform:  hovered ? 'scale(1.04)' : 'scale(1)',
          filter:     hovered ? 'brightness(0.75)' : 'brightness(0.9)',
        }}
      />

      {/* Hover overlay with title */}
      <div style={{
        position:   'absolute', inset: 0,
        display:    'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        padding:    '1rem',
        background: `linear-gradient(to top, rgba(10,7,2,${hovered ? 0.85 : 0.5}) 0%, transparent 60%)`,
        transition: 'background 0.4s ease',
      }}>
        <p style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '0.95rem', fontWeight: 600,
          color:         'var(--text-primary)', marginBottom: '0.25rem',
          opacity:       hovered ? 1 : 0.8,
          transform:     hovered ? 'translateY(0)' : 'translateY(4px)',
          transition:    'all 0.35s ease',
        }}>
          {item.title}
        </p>
        {/* "Click to view" hint */}
        <p style={{
          fontSize:   '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase',
          color:      GOLD, opacity: hovered ? 1 : 0,
          transform:  hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'all 0.3s ease 0.05s',
        }}>
          Open full view →
        </p>
      </div>
    </div>
  );
};

export default ImageGallery;
