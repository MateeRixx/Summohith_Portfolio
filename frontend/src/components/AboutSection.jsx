import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GOLD = '#CE8715';

const AboutSection = () => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo('.about-reveal', 
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
                    );
                    gsap.fromTo(imgRef.current,
                        { scale: 1.1, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' }
                    );
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="about" style={{
            padding: '10rem 2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            color: 'var(--text-primary)'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '5rem',
                alignItems: 'start'
            }}>
                {/* ── Left: Photo with Stylized Frame ── */}
                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'relative',
                        zIndex: 2,
                        borderRadius: '24px',
                        overflow: 'hidden',
                        aspectRatio: '5/6',
                        border: `1px solid ${GOLD}44`,
                        background: '#111'
                    }}>
                        <img 
                            ref={imgRef}
                            src="/me.jpg" // User should place their photo here
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
                            alt="Mohit Kumar"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                            }}
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div style={{
                        position: 'absolute', top: '-20px', right: '-20px',
                        width: '100px', height: '100px', borderRight: `2px solid ${GOLD}`,
                        borderTop: `2px solid ${GOLD}`, opacity: 0.3, zIndex: 1
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-20px', left: '-20px',
                        width: '100px', height: '100px', borderLeft: `2px solid ${GOLD}`,
                        borderBottom: `2px solid ${GOLD}`, opacity: 0.3, zIndex: 1
                    }} />
                </div>

                {/* ── Right: Content ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div className="about-reveal" style={{ opacity: 0 }}>
                        <span style={{
                            fontFamily: 'var(--font-display)', fontSize: '0.8rem', 
                            letterSpacing: '4px', color: GOLD, opacity: 0.7, display: 'block', marginBottom: '1rem'
                        }}>00 / ABOUT ME</span>
                        <h2 style={{
                            fontFamily: 'var(--font-display)', fontSize: '4rem',
                            fontWeight: 600, letterSpacing: '0.03em', lineHeight: 1.1
                        }}>Designing the <span style={{ color: GOLD }}>Future</span></h2>
                        <p style={{
                            marginTop: '2rem', fontSize: '1.1rem', color: 'var(--text-secondary)',
                            lineHeight: 1.8, maxWidth: '600px'
                        }}>
                            I am Mohit Kumar, a creative and detail-oriented Graphic Designer and Social Media Content Creator. 
                            My work is a blend of digital marketing precision and cinematic visual storytelling. 
                            I specialize in transforming raw moments into compelling narratives that drive real-world engagement.
                        </p>
                    </div>

                    {/* Stats / Achievements */}
                    <div className="about-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', opacity: 0 }}>
                        <div>
                            <h3 style={{ color: GOLD, fontSize: '2.4rem', fontFamily: 'var(--font-display)' }}>329%</h3>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6 }}>Engagement Boost</p>
                        </div>
                        <div>
                            <h3 style={{ color: GOLD, fontSize: '2rem', fontFamily: 'var(--font-display)' }}>260K+</h3>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6 }}>Total Views generated</p>
                        </div>
                    </div>

                    {/* Achievements & Experience Grid */}
                    <div className="about-reveal" style={{ 
                        display: 'grid', gridTemplateColumns: '1fr 1fr', 
                        gap: '3rem', borderTop: '1px solid rgba(221,175,144,0.1)', 
                        paddingTop: '3rem', opacity: 0
                    }}>
                        <div>
                            <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: GOLD, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Achievements</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ fontSize: '0.9rem' }}>
                                    <span style={{ fontWeight: 600, color: GOLD }}>Winner</span> · Antaragni '24 IIT Kanpur Photography Competition
                                </div>
                                <div style={{ fontSize: '0.9rem' }}>
                                    <span style={{ fontWeight: 600, color: GOLD }}>Runner Up</span> · Exam Hermes Photography Competition
                                </div>
                                <div style={{ fontSize: '0.9rem' }}>
                                    <span style={{ fontWeight: 600, color: GOLD }}>Top 15</span> · Hindustan Times National Photography Competition
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: GOLD, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Experience</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Design Head</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>GFG Student Chapter</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Video & Graphic Intern</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Leaf Gains Finance</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Media Team Co-head</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Energia, RGIPT</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education Row */}
                    <div className="about-reveal" style={{ borderTop: '1px solid rgba(221,175,144,0.1)', paddingTop: '2rem', opacity: 0 }}>
                         <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: GOLD, textTransform: 'uppercase', marginBottom: '1rem' }}>Education</h4>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>B.E. in Information Technology</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>RGIPT · 2023 - 2027</div>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* ── Skills / Tools Row ── */}
            <div className="about-reveal" style={{ 
                marginTop: '6rem', padding: '2rem', 
                border: '1px solid rgba(221,175,144,0.1)', borderRadius: '16px',
                display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center',
                opacity: 0 // Start hidden for GSAP
            }}>
                {['Photoshop', 'Lightroom', 'Illustrator', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Figma', 'Canva'].map(tool => (
                    <span key={tool} style={{ 
                        fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', 
                        padding: '0.5rem 1.5rem', borderRadius: '100px', border: `1px solid ${GOLD}22`,
                        color: 'var(--text-secondary)'
                    }}>{tool}</span>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;
