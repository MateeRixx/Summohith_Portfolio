import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ProjectCard   from './ProjectCard';
import ProjectModal  from './ProjectModal';
import ImageGallery  from './ImageGallery';
import PhotoShowcase from './PhotoShowcase';

const GOLD = '#CE8715';

const SkillSection = ({ skill, isActive, onActivate, onClose, onOpenUpload }) => {
  const sectionRef  = useRef(null);
  const contentRef  = useRef(null);
  const scrollRef   = useRef(null);
  const [isHovered,     setIsHovered]     = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /* ── GSAP hover levitate ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.to(el, {
      y:        isHovered && !isActive ? -6 : 0,
      duration: isHovered ? 0.45 : 0.5,
      ease:     isHovered ? 'power2.out' : 'power2.inOut',
    });
  }, [isHovered, isActive]);

  /* ── GSAP content reveal on expand ── */
  useEffect(() => {
    if (isActive && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.15 }
      );
    }
  }, [isActive]);

  /* ── Horizontal drag scroll (card-row mode) ── */
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);
  const dragging    = useRef(false);

  const onMouseDown = (e) => {
    dragging.current   = true;
    startX.current     = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const walk = (e.pageX - scrollRef.current.offsetLeft - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const stopDrag = () => {
    dragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  /* ── Display mode: "gallery" uses ImageGallery, else card row ── */
  const isGallery = skill.displayMode === 'gallery';

  return (
    <>
      <div
        ref={sectionRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position:   'relative',
          padding:    '3rem 0',
          borderTop:    `1px solid ${(isHovered || isActive) ? GOLD + '55' : 'rgba(221,175,144,0.08)'}`,
          borderBottom: `1px solid ${(isHovered || isActive) ? GOLD + '55' : 'rgba(221,175,144,0.08)'}`,
          boxShadow:  isHovered && !isActive
            ? `0 0 28px -4px ${GOLD}44, inset 0 0 40px -20px ${GOLD}22`
            : isActive ? `0 0 20px -6px ${GOLD}33` : 'none',
          background: isActive ? 'rgba(0,0,0,0.22)' : 'transparent',
          transition: 'border-color 0.4s ease, box-shadow 0.45s ease, background 0.5s ease',
          willChange: 'transform',
        }}
      >
        {/* ── Section header (always visible) ── */}
        <div
          onClick={() => isActive ? onClose() : onActivate(skill.id)}
          style={{
            display:    'flex', alignItems: 'center', gap: '2rem',
            padding:    '0 2rem', cursor: 'pointer',
            maxWidth:   '1200px', margin: '0 auto', userSelect: 'none',
          }}
          className="skill-header"
        >
          {/* Number */}
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '4px',
            color: GOLD, opacity: (isHovered || isActive) ? 1 : 0.55,
            minWidth: '28px', transition: 'opacity 0.4s ease',
          }}>
            {skill.number}
          </span>

          {/* Label */}
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 600, letterSpacing: '0.03em',
            color:      (isActive || isHovered) ? GOLD : 'var(--text-primary)',
            transition: 'color 0.4s ease, text-shadow 0.4s ease',
            textShadow: isHovered && !isActive ? `0 0 40px ${GOLD}66`
                        : isActive ? `0 0 30px ${GOLD}55` : 'none',
            flex: 1, lineHeight: 1.1,
          }}>
            {skill.label}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '360px',
            lineHeight: 1.6, opacity: (isActive || isHovered) ? 1 : 0.4,
            transition: 'opacity 0.4s ease',
          }}>
            {skill.description}
          </p>

          {/* Toggle icon */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: `1px solid ${(isActive || isHovered) ? GOLD : 'rgba(221,175,144,0.2)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s ease', flexShrink: 0,
            boxShadow: (isActive || isHovered) ? `0 0 14px ${GOLD}55` : 'none',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={(isActive || isHovered) ? GOLD : 'var(--text-secondary)'} strokeWidth="2"
              style={{ transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease' }}
            >
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5"  y1="12" x2="19" y2="12"/>
            </svg>
          </div>
        </div>

        {/* ── Expanded content ── */}
        {isActive && (
          <div ref={contentRef}>
            {isGallery ? (
              /* Gallery mode — horizontal image tiles + lightbox */
              <ImageGallery items={skill.items} />
            ) : skill.id === 'photo-editing' ? (
                /* Specialized Photo Showcase — Launchpad for separate gallery */
                <PhotoShowcase items={skill.items} onOpenUpload={onOpenUpload} />
            ) : (
              /* Card row mode — project cards + modal on click */
              <>
                <div
                  ref={scrollRef}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={stopDrag}
                  onMouseLeave={stopDrag}
                  className="hide-scrollbar"
                  style={{
                    display: 'flex', gap: '1.5rem',
                    padding: '2.5rem 2rem 1.5rem',
                    overflowX: 'auto', cursor: 'grab',
                    maxWidth: '1200px', margin: '0 auto',
                    scrollbarWidth: 'none', msOverflowStyle: 'none',
                  }}
                >
                  {skill.items.map(item => (
                    <ProjectCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedProject(item)}
                    />
                  ))}

                  <div style={{ minWidth: '2rem', flexShrink: 0 }} />
                </div>
                <p style={{
                  textAlign: 'center', fontSize: '0.7rem', letterSpacing: '2px',
                  color: 'var(--text-secondary)', opacity: 0.4,
                  textTransform: 'uppercase', paddingBottom: '0.5rem',
                }}>
                  click to open · drag to explore
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Project detail modal (card-row mode) */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default SkillSection;
