/* ─────────────────────────────────────────────────────────────────────
   uiux.js  —  UI/UX Design section
   
   HOW TO ADD A PROJECT:
   1. Drop your image/video files into:
        public/works/ui-ux/
   2. Copy one of the project objects below and paste it into the
      `items` array.
   3. Set `type` to:
        "image"        → single screenshot / mockup
        "before-after" → drag slider comparing two images
        "video"        → a video file with a poster thumbnail
   4. Set the file paths to match what you dropped in step 1.
      Example: image at  public/works/ui-ux/dashboard.jpg
               path   →  "/works/ui-ux/dashboard.jpg"
───────────────────────────────────────────────────────────────────── */
export const uiux = {
  id:          "ui-ux",
  label:       "UI/UX Design",
  shortLabel:  "UI / UX",
  number:      "01",
  description: "Designing intuitive digital experiences that feel effortless and look extraordinary.",
  color:       "#CE8715",

  items: [
    // ── PROJECT TEMPLATE (copy & paste to add more) ──────────────────
    // {
    //   id:          "uiux-X",          ← make unique, e.g. "uiux-3"
    //   title:       "Project Name",
    //   description: "Short description.",
    //   type:        "image",           ← "image" | "before-after" | "video"
    //   tags:        ["Figma", "UX Research"],
    //   image:       "/works/ui-ux/your-file.jpg",
    // },

    // ── SAMPLE PROJECTS (replace with your own) ─────────────────────
    {
      id:          "uiux-1",
      title:       "Arcane Analytics Dashboard",
      description: "A dark-mode analytics interface designed for deep research workflows.",
      type:        "before-after",
      tags:        ["Figma", "UI Design", "Prototyping"],
      beforeImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
      afterImage:  "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900&auto=format&fit=crop",
    },
    {
      id:          "uiux-2",
      title:       "Ritual Mobile App",
      description: "Habit tracking app with a ceremonial, intentional design language.",
      type:        "image",
      tags:        ["Mobile", "UX Research", "Prototyping"],
      image:       "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop",
    },
  ],
};
