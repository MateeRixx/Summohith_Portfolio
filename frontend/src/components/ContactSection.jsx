import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const GOLD = '#CE8715';

const ContactSection = () => {
    const sectionRef = useRef(null);
    const [hoveredField, setHoveredField] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo('.contact-reveal', 
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                    );
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const contactMethods = [
        {
            id: 'email',
            label: 'Email',
            value: 'summohith@gmail.com',
            link: 'mailto:summohith@gmail.com',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l9 6 9-6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/><path d="M3 8l9 6 9-6" />
                </svg>
            )
        },
        {
            id: 'phone',
            label: 'Phone / WhatsApp',
            value: '+91 84688 98989',
            link: 'https://wa.me/918468898989',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 015.06 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
            )
        }
    ];

    return (
        <section ref={sectionRef} id="contact" style={{
            padding: '8rem 2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <div className="contact-reveal" style={{ opacity: 0, marginBottom: '4rem' }}>
                <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.8rem', 
                    letterSpacing: '4px', color: GOLD, opacity: 0.7, display: 'block', marginBottom: '1rem'
                }}>04 / CONNECT</span>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1
                }}>Ready to <span style={{ color: GOLD }}>Create?</span></h2>
                <p style={{
                    marginTop: '2rem', fontSize: '1.2rem', color: 'var(--text-secondary)',
                    lineHeight: 1.8, maxWidth: '600px', margin: '2rem auto 0'
                }}>
                    Whether you have a breakthrough project in mind or just want to say hi, my inbox is always open for creative collaborations.
                </p>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2rem',
                marginTop: '3rem'
            }}>
                {contactMethods.map((method) => (
                    <a
                        key={method.id}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-reveal"
                        onMouseEnter={() => setHoveredField(method.id)}
                        onMouseLeave={() => setHoveredField(null)}
                        style={{
                            opacity: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '3rem 4rem',
                            minWidth: '300px',
                            background: 'rgba(255,255,255,0.02)',
                            border: `1px solid ${hoveredField === method.id ? GOLD : 'rgba(221,175,144,0.1)'}`,
                            borderRadius: '24px',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: hoveredField === method.id ? 'translateY(-10px)' : 'translateY(0)',
                            boxShadow: hoveredField === method.id ? `0 20px 40px ${GOLD}11` : 'none',
                            textDecoration: 'none'
                        }}
                    >
                        <div style={{
                            color: hoveredField === method.id ? GOLD : 'var(--text-secondary)',
                            marginBottom: '1.5rem',
                            transition: 'color 0.4s ease'
                        }}>
                            {method.icon}
                        </div>
                        <span style={{
                            fontSize: '0.7rem', textTransform: 'uppercase', 
                            letterSpacing: '3px', color: 'var(--text-secondary)',
                            marginBottom: '0.5rem', opacity: 0.6
                        }}>{method.label}</span>
                        <span style={{
                            fontSize: '1.4rem', color: hoveredField === method.id ? '#fff' : 'var(--text-primary)',
                            fontWeight: 600, transition: 'color 0.4s ease'
                        }}>{method.value}</span>
                        
                        {/* Shimmer line */}
                        <div style={{
                            width: hoveredField === method.id ? '100%' : '0',
                            height: '1px', background: GOLD, marginTop: '1.5rem',
                            transition: 'width 0.6s ease'
                        }} />
                    </a>
                ))}
            </div>

            <div className="contact-reveal" style={{ opacity: 0, marginTop: '6rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Follow my journey on social media
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                    {/* Just small icon indicators or text links */}
                    <span style={{ fontSize: '0.7rem', letterSpacing: '1px', opacity: 0.4, textTransform: 'uppercase' }}>Instagram</span>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '1px', opacity: 0.4, textTransform: 'uppercase' }}>Behance</span>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '1px', opacity: 0.4, textTransform: 'uppercase' }}>YouTube</span>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
