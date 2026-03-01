import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const GOLD = '#CE8715';

/* Platform SVG icons */
const icons = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  Behance: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zm-7.73-3.35h3.708c-.126-1.606-1.473-2.411-2.857-2.039-.981.268-1.618 1.031-1.851 2.039zM6.177 6.086a5.063 5.063 0 01.89 0c2.551.223 4.146 1.636 3.975 4.199-.094 1.401-.657 2.333-1.621 2.95C10.943 14 11.343 15.18 11.25 17c-.211 4.148-3.741 4.926-7.5 5H0V6h3.75c.854 0 1.657.029 2.427.086zm.83 3.884c.031-1.274-.784-2.002-2.007-1.97-1.07.028-1.5 0-1.5 0V12.5s.5 0 1.75 0c1.25 0 1.726-1.282 1.757-2.53zm-.93 5.03s-.65 0-1.577 0V19.5h1.752c1.213 0 2.02-.574 2.032-2 .013-1.564-.802-2.5-2.207-2.5z"/>
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Dribbble: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.21 10.21 0 004.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.161 10.161 0 006.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.073c.232-.4 3.045-5.155 8.332-6.898.137-.045.276-.088.415-.127-.265-.6-.537-1.2-.817-1.79C7.282 11.55 2.493 11.64 2.1 11.64H1.9a10.045 10.045 0 00.485 7.737zm-1.34-9.64c.41.014 4.512.109 8.294-1.09a78.482 78.482 0 00-3.444-5.338A10.19 10.19 0 003.045 9.737zm6.674-7.244c.192.27 1.914 2.73 3.456 5.4 3.29-1.233 4.682-3.11 4.85-3.354a10.166 10.166 0 00-8.306-2.046zm9.44 3.61c-.19.267-1.72 2.26-5.127 3.683.213.44.42.888.61 1.336.066.163.13.327.193.49 3.407-.43 6.79.258 7.127.332a10.14 10.14 0 00-2.804-5.841z"/>
    </svg>
  )
};

/* ── Single social card with GSAP levitate + gold glow ── */
const SocialCard = ({ social }) => {
  const cardRef    = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (hovered) {
      gsap.to(el, { y: -7, duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(el, { y: 0,  duration: 0.45, ease: 'power2.inOut' });
    }
  }, [hovered]);

  return (
    <a
      ref={cardRef}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-card glass-panel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '1rem',
        textDecoration: 'none',
        padding:        '1.75rem',
        borderRadius:   '16px',
        /* Gold glow border + ambient shadow on hover */
        borderColor:    hovered ? `${GOLD}66` : 'rgba(221,175,144,0.15)',
        boxShadow:      hovered
          ? `0 0 28px -4px ${GOLD}44, inset 0 0 40px -20px ${GOLD}22`
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition:     'border-color 0.4s ease, box-shadow 0.4s ease',
        willChange:     'transform',
        opacity:        0,   /* starts hidden — GSAP scroll reveal sets this */
      }}
    >
      {/* Icon Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ 
            color: hovered ? GOLD : 'var(--text-secondary)', 
            transition: 'all 0.4s ease',
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
            willChange: 'transform'
        }}>
          {icons[social.platform]}
        </div>
      </div>

      {/* Name + handle */}
      <div>
        <div style={{
          fontSize: '1rem', fontWeight: 600,
          color: hovered ? GOLD : 'var(--text-primary)',
          transition: 'color 0.4s ease',
          marginBottom: '0.15rem', letterSpacing: '0.5px'
        }}>
          {social.platform}
        </div>
        <div style={{
          fontSize: '0.8rem',
          color: hovered ? `${GOLD}cc` : 'var(--text-secondary)',
          transition: 'color 0.4s ease',
          letterSpacing: '0.5px'
        }}>
          {social.handle}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.85rem', color: 'var(--text-secondary)',
        lineHeight: 1.6, flexGrow: 1,
        opacity: hovered ? 1 : 0.6, transition: 'opacity 0.4s ease'
      }}>
        {social.description}
      </p>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        fontSize: '0.75rem', letterSpacing: '2px',
        textTransform: 'uppercase',
        color: hovered ? GOLD : 'var(--text-secondary)',
        transition: 'color 0.4s ease'
      }}>
        Follow
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
};

/* ── Section container with scroll-triggered stagger reveal ── */
const SocialSection = ({ socials }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(
              containerRef.current.querySelectorAll('.social-card'),
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                from: { opacity: 0, y: 40 } }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} style={{
      padding:   '5rem 2rem',
      maxWidth:  '1200px',
      margin:    '0 auto',
    }}>
      {/* Section heading */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '3rem' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem', letterSpacing: '4px',
          color: GOLD, opacity: 0.7
        }}>05</span>
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(2rem, 5vw, 4rem)',
          fontWeight:    600, letterSpacing: '0.03em',
          color:         'var(--text-primary)'
        }}>Let's Connect</h2>
      </div>

      {/* Cards grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap:                 '1.25rem',
      }}>
        {socials.map(social => (
          <SocialCard key={social.platform} social={social} />
        ))}
      </div>
    </section>
  );
};

export default SocialSection;
