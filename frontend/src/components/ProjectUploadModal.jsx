import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const GOLD = '#CE8715';

const ProjectUploadModal = ({ onClose, onAdd, category = 'video-editing' }) => {
  const isVideo = category === 'video-editing';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    videoFile: null,
    thumbnailFile: null,
    beforeFile: null,
    afterFile: null,
    videoPreview: null,
    thumbPreview: null,
    beforePreview: null,
    afterPreview: null
  });

  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(modalRef.current, 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        [`${type}File`]: file,
        [`${type}Preview`]: url
      }));
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  // ... previous effects ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    if (isVideo && !formData.videoFile) return;
    if (!isVideo && !formData.afterFile) return;

    setIsUploading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', category);
      data.append('type', isVideo ? 'video' : 'image');
      data.append('tags', formData.tags);

      if (isVideo) {
        data.append('video', formData.videoFile);
        if (formData.thumbnailFile) {
          data.append('thumbnail', formData.thumbnailFile);
        }
      } else {
        data.append('after', formData.afterFile);
        if (formData.beforeFile) {
            data.append('before', formData.beforeFile);
        }
      }

      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        body: data,
      });

      const savedProject = await response.json();
      onAdd(savedProject);
      onClose();
    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert('Upload failed! Check terminal logs.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(5,3,1,0.85)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div 
        ref={modalRef}
        className="glass-panel"
        style={{
          width: '100%', maxWidth: '600px',
          padding: '2.5rem', position: 'relative',
          border: `1px solid ${GOLD}44`,
          boxShadow: `0 0 50px ${GOLD}22`
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'transparent', border: 'none', color: 'var(--text-secondary)',
            fontSize: '1.2rem', cursor: 'pointer'
          }}
        >✕</button>

        <h2 style={{ 
          fontFamily: 'var(--font-display)', color: GOLD, 
          fontSize: '1.8rem', marginBottom: '1.5rem', letterSpacing: '2px'
        }}>
          ADD NEW {category.toUpperCase().replace('-', ' ')}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={labelStyle}>Project Title</label>
            <input 
              type="text" 
              placeholder="e.g. Cinematic Street Reel"
              style={inputStyle}
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea 
              placeholder="Tell the story behind this video..."
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label style={labelStyle}>Tags (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. After Effects, 4K, Color Grade"
              style={inputStyle}
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {isVideo ? (
                <>
                    <div>
                    <label style={labelStyle}>Thumbnail Image</label>
                    <div style={uploadBoxStyle}>
                        <input 
                        type="file" 
                        accept="image/*" 
                        style={fileInputStyle} 
                        onChange={e => handleFileChange(e, 'thumb')}
                        />
                        {formData.thumbPreview ? (
                        <img src={formData.thumbPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>UPLOAD THUMB</span>
                        )}
                    </div>
                    </div>
                    <div>
                    <label style={labelStyle}>Video File</label>
                    <div style={uploadBoxStyle}>
                        <input 
                        type="file" 
                        accept="video/*" 
                        style={fileInputStyle} 
                        onChange={e => handleFileChange(e, 'video')}
                        required
                        />
                        {formData.videoPreview ? (
                        <video src={formData.videoPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>UPLOAD VIDEO</span>
                        )}
                    </div>
                    </div>
                </>
            ) : (
                <>
                    <div>
                    <label style={labelStyle}>Before Image (Optional)</label>
                    <div style={uploadBoxStyle}>
                        <input 
                        type="file" 
                        accept="image/*" 
                        style={fileInputStyle} 
                        onChange={e => handleFileChange(e, 'before')}
                        />
                        {formData.beforePreview ? (
                        <img src={formData.beforePreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>BEFORE EDIT</span>
                        )}
                    </div>
                    </div>
                    <div>
                    <label style={labelStyle}>After Image (Final)</label>
                    <div style={uploadBoxStyle}>
                        <input 
                        type="file" 
                        accept="image/*" 
                        style={fileInputStyle} 
                        onChange={e => handleFileChange(e, 'after')}
                        required
                        />
                        {formData.afterPreview ? (
                        <img src={formData.afterPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>AFTER EDIT</span>
                        )}
                    </div>
                    </div>
                </>
            )}
          </div>

          <button 
            type="submit"
            className="btn-glass"
            disabled={isUploading}
            style={{
              marginTop: '1rem', width: '100%', padding: '1rem',
              background: isUploading ? 'rgba(206,135,21,0.5)' : GOLD, 
              color: '#000', fontWeight: 'bold',
              border: 'none', cursor: isUploading ? 'not-allowed' : 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            {isUploading ? 'UPLOADING PROJECT...' : 'CREATE PROJECT CARD'}
          </button>
        </form>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block', fontSize: '0.65rem', textTransform: 'uppercase',
  letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '0.5rem',
  opacity: 0.7
};

const inputStyle = {
  width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(221,175,144,0.15)', borderRadius: '8px',
  color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s'
};

const uploadBoxStyle = {
  height: '100px', background: 'rgba(255,255,255,0.02)',
  border: '1px dashed rgba(221,175,144,0.3)', borderRadius: '8px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative', overflow: 'hidden'
};

const fileInputStyle = {
  position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2
};

export default ProjectUploadModal;
