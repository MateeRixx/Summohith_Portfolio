import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PortalTransition = ({ onComplete }) => {
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // 1. Initial State: Circle is tiny (0r)
    gsap.set(circleRef.current, { attr: { r: 0 } });
    gsap.set(overlayRef.current, { opacity: 1 });

    const tl = gsap.timeline({
        onComplete: onComplete
    });

    // 2. The Pop (Drop): Reveal a small portion
    tl.to(circleRef.current, {
        attr: { r: 50 },
        duration: 0.4,
        ease: 'back.out(2)'
    })
    // 3. The Expansion: Open the portal fully
    .to(circleRef.current, {
        attr: { r: 2500 }, // Large enough to cover all screens
        duration: 0.8,
        ease: 'expo.inOut'
    }, '+=0.1')
    // 4. Cleanup
    .to(overlayRef.current, {
        opacity: 0,
        duration: 0.4
    });

  }, [onComplete]);

  return (
    <div 
        ref={overlayRef}
        style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'transparent', pointerEvents: 'none'
        }}
    >
        <svg 
            ref={svgRef}
            width="100%" height="100%" 
            viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice"
            style={{ 
                position: 'absolute', inset: 0,
                width: '100vw', height: '100vh'
            }}
        >
            <defs>
                <mask id="portalMask">
                    {/* White reveals, Black hides. 
                        We want to reveal through the circle, so background is black, circle is white.
                    */}
                    <rect x="0" y="0" width="1000" height="1000" fill="white" />
                    <circle ref={circleRef} cx="500" cy="500" r="0" fill="black" />
                </mask>
            </defs>
            
            {/* The Black Curtain - It is hidden where the mask is BLACK */}
            <rect 
                x="0" y="0" width="1000" height="1000" 
                fill="#050301" 
                mask="url(#portalMask)" 
            />
        </svg>

        {/* The Golden Drop Point (The thing user sees first) */}
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px', height: '8px', background: '#CE8715',
            borderRadius: '50%', boxShadow: '0 0 40px #CE8715',
            zIndex: 10001
        }} />
    </div>
  );
};

export default PortalTransition;
