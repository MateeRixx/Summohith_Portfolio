/* ─────────────────────────────────────────────────────────────────────
   index.js  —  Assembles all section data into one portfolioData object.

   ✅ You should NOT need to edit this file.
   Edit the individual section files instead:
     hero.js          → landing page title & subtitle
     uiux.js          → UI/UX projects
     graphicDesign.js → Graphic design projects
     photoEditing.js  → Photo editing projects
     videoEditing.js  → Video editing projects
     socials.js       → Social media links

   To add a BRAND NEW skill section:
     1. Create a new file e.g. src/data/motionGraphics.js
        (copy the structure from any existing skill file)
     2. Import it here and add it to the `skills` array below.
───────────────────────────────────────────────────────────────────── */
import { hero }          from './hero';
import { uiux }          from './uiux';
import { graphicDesign } from './graphicDesign';
import { photoEditing }  from './photoEditing';
import { videoEditing }  from './videoEditing';
import { socials }       from './socials';

export const portfolioData = {
  hero,
  skills: [
    photoEditing,
    graphicDesign,
    videoEditing,
    // ← Add new skill sections here
  ],
  socials,
};
