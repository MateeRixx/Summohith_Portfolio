import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* ─────────────────────────────────────────────────────────────────────────
   Hypnotic spiral GIF embedded as an <img>.
   We use a well-known public Giphy URL of a classic black-and-white
   multi-arm Archimedean spiral — exactly like the Pinterest reference.
   The image is clipped to a circle and tinted with a colour mix so
   it fits the warm esoteric palette.
───────────────────────────────────────────────────────────────────────── */
const HypnoticO = ({ emSize = '0.75em' }) => (
  <span
    style={{
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      width:          emSize,
      height:         emSize,
      borderRadius:   '50%',
      overflow:       'hidden',
      flexShrink:     0,
      /* golden ring border */
      boxShadow:      '0 0 0 2.5px rgba(206,135,21,0.75), 0 0 18px rgba(206,135,21,0.3)',
      position:       'relative',
    }}
  >
    {/* The GIF */}
    <img
      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTdiMW5tNW8zcG1tYzBkYXc5MHk3aGowNW8zNHA1cXBqaGs1cXFmdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BX1m6sfV7Q7eg/giphy.gif"
      alt="hypnotic spiral"
      style={{
        width:      '100%',
        height:     '100%',
        objectFit:  'cover',
        display:    'block',
        /* Tone the B&W GIF into the warm palette using CSS blend modes */
        filter: 'sepia(0.9) hue-rotate(10deg) saturate(1.2) contrast(1.1)',
        mixBlendMode: 'normal',
      }}
    />
  </span>
);

/* ─────────────────────────────────────────────────────────────────────────
   Typewriter hook
───────────────────────────────────────────────────────────────────────── */
const useTypewriter = (text, { speed = 60, startDelay = 0 } = {}) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return displayed;
};

/* ─────────────────────────────────────────────────────────────────────────
   HeroTitle
───────────────────────────────────────────────────────────────────────── */
const HeroTitle = ({
  title    = 'Summohith',
  subtitle = 'Crafting visuals that captivate.',
}) => {
  const letters  = title.split('');
  const oIndex   = letters.findIndex(l => l.toLowerCase() === 'o');
  const spanRefs = useRef([]);

  /* GSAP letter stagger */
  useEffect(() => {
    const els = spanRefs.current.filter(Boolean);
    gsap.set(els, { opacity: 0, y: 36 });
    gsap.to(els, {
      opacity:  1,
      y:        0,
      duration: 0.65,
      stagger:  0.07,
      ease:     'power3.out',
      delay:    0.2,
    });
  }, []);

  const typedSubtitle = useTypewriter(subtitle, { speed: 55, startDelay: 1100 });
  const isTypingDone  = typedSubtitle.length >= subtitle.length;

  return (
    <div style={{ textAlign: 'center' }}>

      {/* Title row — flex so all items including the GIF align on the same axis */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',      /* vertically centres the GIF circle with the letters */
          fontSize:       'clamp(3.2rem, 9vw, 7.5rem)',
          lineHeight:     1,
          marginBottom:   '1.5rem',
          gap:            0,
        }}
      >
        {letters.map((letter, i) =>
          i === oIndex ? (
            <span
              key={`o-${i}`}
              ref={el => (spanRefs.current[i] = el)}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                /* Negative horizontal margins pull adjacent letters inward
                   so the disk sits as snugly as a real 'o' glyph */
                margin:         '0 -0.015em',
              }}
            >
              {/* Pass emSize so the disk grows with the font-size */}
              <HypnoticO emSize="0.72em" />
            </span>
          ) : (
            <span
              key={`l-${i}`}
              ref={el => (spanRefs.current[i] = el)}
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    600,
                letterSpacing: '0.04em',
                color:         'var(--text-primary)',
                display:       'inline-block',
                textShadow:    '0 6px 30px rgba(0,0,0,0.5)',
              }}
            >
              {letter}
            </span>
          )
        )}
      </div>

      {/* Typewriter subtitle */}
      <p
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'clamp(0.85rem, 1.8vw, 1.1rem)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'var(--text-secondary)',
          minHeight:     '1.6em',
          opacity:       typedSubtitle.length ? 1 : 0,
          transition:    'opacity 0.3s ease',
        }}
      >
        {typedSubtitle}
        {!isTypingDone && (
          <span style={{
            marginLeft: 2,
            color:      'var(--blob-2)',
            animation:  'blink 0.7s step-end infinite',
          }}>|</span>
        )}
      </p>
    </div>
  );
};

export default HeroTitle;
