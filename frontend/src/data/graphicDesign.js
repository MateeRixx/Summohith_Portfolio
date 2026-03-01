/* ─────────────────────────────────────────────────────────────────────
   graphicDesign.js  —  Graphic Design section

   HOW TO ADD A PROJECT:
   1. Drop your image files into:
        public/works/graphic-design/
   2. Copy one of the project objects and paste into `items`.
   3. Set type:
        "image"        → single artwork / poster / logo
        "before-after" → compare two versions side by side
   4. File path example:
        file at  public/works/graphic-design/poster.jpg
        path   → "/works/graphic-design/poster.jpg"
───────────────────────────────────────────────────────────────────── */
export const graphicDesign = {
  id:          "graphic-design",
  label:       "Graphic Design",
  shortLabel:  "Graphic Design",
  number:      "02",
  description: "Visual identities and print work rooted in symbolism, depth, and intentional aesthetics.",
  color:       "#CE8715",
  displayMode: "gallery",           // ← renders as interactive image gallery

  items: [
    // ── PROJECT TEMPLATE ─────────────────────────────────────────────
    // {
    //   id:          "gd-X",
    //   title:       "Project Name",
    //   description: "Short description.",
    //   type:        "image",
    //   tags:        ["Branding", "Print"],
    //   image:       "/works/graphic-design/your-file.jpg",
    // },

    // ── ACTUAL PROJECTS ──────────────────────────────────────────────
    {
      id:          "gd-1",
      title:       "Independence Day Celebration",
      description: "A commemorative social media post celebrating national pride with bold typography and symbolic imagery.",
      type:        "image",
      tags:        ["Poster Design", "Social Media", "National Independence"],
      image:       "/works/graphic-design/indepndence day post.jpg",
    },
    {
      id:          "gd-2",
      title:       "RGIPT Poster Submission",
      description: "Official poster design for the Rajiv Gandhi Institute of Petroleum Technology, focused on professional branding.",
      type:        "image",
      tags:        ["Professional", "Institutional", "Print Design"],
      image:       "/works/graphic-design/Mohit_Kumar_RajivGandhiInstituteofPetroleumTechnology_Poster_Submission.jpg",
    },
    {
      id:          "gd-3",
      title:       "Meme Story Series",
      description: "Engaging social media storytelling through creative meme-style graphics and narrative design.",
      type:        "image",
      tags:        ["Social Media", "Engagement", "Creative"],
      image:       "/works/graphic-design/Meme_story_01.jpg",
    },
    {
      id:          "gd-4",
      title:       "Visual Identity Concept",
      description: "An exploration of branding through minimalist shapes and balanced compositions.",
      type:        "image",
      tags:        ["Branding", "Minimalism", "Vektor"],
      image:       "/works/graphic-design/30b2898631674997b4bc357a8a359018.jpg",
    },
    {
      id:          "gd-5",
      title:       "Ember Visual Study",
      description: "A deep dive into color theory and spatial relationships in modern graphic layouts.",
      type:        "image",
      tags:        ["Visual Theory", "Color Study"],
      image:       "/works/graphic-design/ecc7323f9ae94a73a10fe1ebfe4c84bd..jpg",
    },
    {
      id:          "gd-6",
      title:       "Abstract Composition 02",
      description: "Experimental design workflow combining digital painting and geometric alignment.",
      type:        "image",
      tags:        ["Experimental", "Digital Art"],
      image:       "/works/graphic-design/Untitled-1_02.jpg",
    },
  ],
};
