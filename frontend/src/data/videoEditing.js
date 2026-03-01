/* ─────────────────────────────────────────────────────────────────────
   videoEditing.js  —  Video Editing section

   HOW TO ADD A PROJECT:
   1. Drop your video + thumbnail into:
        public/works/video-editing/
   2. Supported video formats: .mp4, .webm
   3. File path examples:
        video at     public/works/video-editing/reel.mp4
        thumbnail at public/works/video-editing/reel-thumb.jpg
        paths      → "/works/video-editing/reel.mp4"
                     "/works/video-editing/reel-thumb.jpg"
───────────────────────────────────────────────────────────────────── */
export const videoEditing = {
  id:          "video-editing",
  label:       "Video Editing",
  shortLabel:  "Video Editing",
  number:      "03",
  description: "Cinematic cuts, motion graphics, and pacing that turn raw footage into compelling narratives.",
  color:       "#CE8715",

  items: [
    // ── PROJECT TEMPLATE ─────────────────────────────────────────────
    // {
    //   id:          "ve-X",
    //   title:       "Project Name",
    //   description: "Short description.",
    //   type:        "video",
    //   tags:        ["Premiere Pro", "After Effects"],
    //   url:         "/works/video-editing/your-video.mp4",
    //   thumbnail:   "/works/video-editing/your-thumbnail.jpg",
    // },

    // ── ACTUAL PROJECTS ──────────────────────────────────────────────
    {
      id:          "ve-1",
      title:       "Showreel 2026",
      description: "A dynamic compilation of creative cuts and cinematic transitions.",
      type:        "video",
      tags:        ["Editing", "Transitions", "Showreel"],
      url:         "/works/video-editing/0207.mp4",
      thumbnail:   "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900&auto=format&fit=crop",
    },
    {
      id:          "ve-2",
      title:       "Tariff Effect Study",
      description: "Visual exploration of kinetic effects and overlays in commercial editing.",
      type:        "video",
      tags:        ["VFX", "After Effects", "Overlays"],
      url:         "/works/video-editing/Tariif effect.mp4",
      thumbnail:   "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop",
    },
    {
      id:          "ve-3",
      title:       "Tariff Commercial",
      description: "Full-length commercial edit focusing on pacing, rhythm, and color harmony.",
      type:        "video",
      tags:        ["Commercial", "Pacing", "Color Grade"],
      url:         "/works/video-editing/Tarrif Video.mp4",
      thumbnail:   "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=900&auto=format&fit=crop",
    },
    {
      id:          "ve-4",
      title:       "Tata Down Motion",
      description: "Motion graphics piece exploring corporate identity and fluid animation.",
      type:        "video",
      tags:        ["Motion Graphics", "Animation", "Identity"],
      url:         "/works/video-editing/Tata down.mp4",
      thumbnail:   "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=900&auto=format&fit=crop",
    },
  ],
};
