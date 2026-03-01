import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import BeforeAfterSlider from './BeforeAfterSlider';

const GOLD = '#CE8715';

const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 50, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.1 }
    );
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* ── GSAP exit ── */
  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: onClose });
    gsap.to(panelRef.current, { y: 30, opacity: 0, scale: 0.97, duration: 0.2, ease: 'power2.in' });
  };

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!project) return null;

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position:   'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10, 7, 2, 0.85)',
        backdropFilter: 'blur(12px)',
        display:    'flex', alignItems: 'center', justifyContent: 'center',
        padding:    '2rem',
        overflowY:  'auto',
      }}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position:     'relative',
          width:        '100%',
          maxWidth:     '900px',
          background:   'rgba(18,14,6,0.9)',
          border:       `1px solid ${GOLD}33`,
          borderRadius: '24px',
          boxShadow:    `0 0 60px rgba(0,0,0,0.6), 0 0 30px ${GOLD}18`,
          padding:      '2.5rem',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position:  'absolute', top: '1.2rem', right: '1.2rem',
            background:'transparent', border: `1px solid rgba(221,175,144,0.2)`,
            color:     'var(--text-secondary)', width: 38, height: 38,
            borderRadius: '50%', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontSize:  '1.1rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(221,175,144,0.2)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          aria-label="Close"
        >✕</button>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {project.tags?.map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase',
              padding: '3px 10px', borderRadius: '20px',
              background: `${GOLD}18`, border: `1px solid ${GOLD}44`,
              color: GOLD,
            }}>{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2rem',
          color: 'var(--text-primary)', marginBottom: '0.75rem',
          lineHeight: 1.15,
        }}>
          {project.title}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '1rem', color: 'var(--text-secondary)',
          lineHeight: 1.75, marginBottom: '2rem', maxWidth: '680px',
        }}>
          {project.description}
        </p>

        {/* Media */}
        <div style={{ borderRadius: '14px', overflow: 'hidden' }}>
          {project.type === 'before-after' && (
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              height="460px"
            />
          )}
          {project.type === 'image' && (
            <img
              src={project.image} alt={project.title}
              style={{ width: '100%', maxHeight: '520px', objectFit: 'cover',
                       display: 'block', borderRadius: '14px' }}
            />
          )}
          {project.type === 'video' && (
            <video
              src={project.url}
              poster={project.thumbnail}
              controls
              style={{ width: '100%', borderRadius: '14px', maxHeight: '520px',
                       background: '#000' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
