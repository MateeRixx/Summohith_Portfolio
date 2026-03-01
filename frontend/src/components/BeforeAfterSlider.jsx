import { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, height = "300px" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging]         = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pc = Math.max(0, Math.min(((clientX - left) / width) * 100, 100));
    setSliderPosition(pc);
  };

  useEffect(() => {
    const stop = () => setIsDragging(false);
    const move = (e) => { if (isDragging) handleMove(e.clientX); };
    const mTouch = (e) => { if (isDragging) handleMove(e.touches[0].clientX); };

    if (isDragging) {
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup',   stop);
      window.addEventListener('touchmove', mTouch, { passive: false });
      window.addEventListener('touchend',  stop);
    }
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup',   stop);
      window.removeEventListener('touchmove', mTouch);
      window.removeEventListener('touchend',  stop);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      style={{
        position: 'relative', width: '100%', height,
        overflow: 'hidden', borderRadius: '12px',
        cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none',
        border: '1px solid rgba(221,175,144,0.15)'
      }}
    >
      {/* AFTER */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `url(${afterImage}) center/cover no-repeat`
      }}>
        <span style={labelStyle('right')}>AFTER</span>
      </div>
      {/* BEFORE */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `url(${beforeImage}) center/cover no-repeat`,
        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
      }}>
        <span style={labelStyle('left')}>BEFORE</span>
      </div>
      {/* Handle */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${sliderPosition}%`,
        width: '2px', background: '#CE8715', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#CE8715',
          boxShadow: '0 0 16px rgba(206,135,21,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: isDragging ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.15s ease'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#110e05" strokeWidth="2.5">
            <path d="M8 4l-4 8 4 8M16 4l4 8-4 8"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const labelStyle = (side) => ({
  position: 'absolute', top: 10,
  [side]: 10,
  background: 'rgba(0,0,0,0.6)',
  color: 'var(--text-primary)',
  fontSize: '0.7rem', letterSpacing: '2px',
  padding: '3px 8px', borderRadius: 4, zIndex: 5
});

export default BeforeAfterSlider;
