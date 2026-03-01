import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import BeforeAfterSlider from './BeforeAfterSlider';

const GOLD = '#CE8715';

const ProjectCard = ({ item, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.to(cardRef.current, { y: hovered ? -6 : 0, duration: 0.38, ease: 'power2.out' });
  }, [hovered]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-panel"
      style={{
        minWidth:    '360px',
        maxWidth:    '400px',
        flex:        '0 0 auto',
        display:     'flex',
        flexDirection: 'column',
        cursor:      onClick ? 'pointer' : 'default',
        borderColor: hovered ? `${GOLD}55` : 'rgba(221,175,144,0.12)',
        boxShadow:   hovered
          ? `0 0 28px -4px ${GOLD}44, inset 0 0 40px -20px ${GOLD}22`
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition:  'border-color 0.4s ease, box-shadow 0.4s ease',
        willChange:  'transform',
      }}
    >
      {/* Media */}
      <div style={{ marginBottom: '1.25rem', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
        {item.type === 'before-after' && (
          <BeforeAfterSlider
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            height="220px"
          />
        )}
        {item.type === 'image' && (
          <img
            src={item.image} alt={item.title} loading="lazy"
            draggable={false}
            style={{
              width: '100%', height: '220px', objectFit: 'cover',
              display: 'block', borderRadius: '10px',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
            }}
          />
        )}
        {item.type === 'video' && (
          <div style={{ position: 'relative', height: '220px', background: '#000',
                        borderRadius: '10px', overflow: 'hidden' }}>
            <video
              src={item.url}
              poster={item.thumbnail}
              muted
              playsInline
              loop
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: hovered ? 1 : 0.75, transition: 'opacity 0.4s ease',
              }}
            />
            {!hovered && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(206,135,21,0.75)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 14px ${GOLD}44`,
                  transition: 'all 0.35s ease',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#110e05">
                    <path d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        {item.tags?.map(tag => (
          <span key={tag} style={{
            fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: '20px',
            background: 'rgba(221,175,144,0.06)',
            border: `1px solid ${hovered ? GOLD + '40' : 'rgba(221,175,144,0.18)'}`,
            color: hovered ? GOLD : 'var(--text-secondary)',
            transition: 'all 0.35s ease',
          }}>{tag}</span>
        ))}
      </div>

      {/* Text */}
      <h3 style={{
        fontSize: '1.1rem', marginBottom: '0.4rem',
        color: hovered ? GOLD : 'var(--text-primary)',
        transition: 'color 0.35s ease',
        fontFamily: 'var(--font-display)',
      }}>{item.title}</h3>
      <p style={{
        fontSize: '0.88rem', color: 'var(--text-secondary)',
        lineHeight: 1.65, flexGrow: 1,
        opacity: hovered ? 1 : 0.7, transition: 'opacity 0.35s ease',
      }}>{item.description}</p>

      {/* "View project" hint */}
      {onClick && (
        <div style={{
          marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase',
          color: GOLD, opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
          View project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke={GOLD} strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
