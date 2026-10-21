import { StudioAccentColor } from "@/store/useCreativesStore";

export interface CreativesBranch {
  id: string;
  number: string;
  name: string;
  title: string;
  color: StudioAccentColor;
  tagline: string;
  role: string;
  tools: string[];
  mentorship: string;
  sundayTasks: string[];
  formCheckboxValue: string;
}

export const CREATIVES_BRANCHES: CreativesBranch[] = [
  {
    id: "branch-photography",
    number: "BRANCH 01",
    name: "Photography & Event Documentation",
    title: "Photography (DSLR & Mobile)",
    color: "#FF5A1F",
    tagline: "Freezing sacred moments in RAW color.",
    role: "Capture Sunday worship, baptisms, and youth fellowships. Master framing, stage lighting, and candid storytelling.",
    tools: [
      "Church DSLRs & Mirrorless (Canon, Sony, Nikon)",
      "Prime Lenses (35mm, 50mm, 85mm)",
      "Lightroom Mobile / Desktop Color Grading",
      "Smartphone Pro Camera Modes",
    ],
    mentorship:
      "No camera experience needed. We teach manual exposure, lighting, and low-light autofocus hands-on.",
    sundayTasks: [
      "Worship team and congregation angles",
      "Altar call candid prayer moments",
      "Post-service fellowship smiles",
    ],
    formCheckboxValue: "DSLR / Mirrorless Photography & Videography (Canon, Sony, Nikon)",
  },
  {
    id: "branch-graphic-design",
    number: "BRANCH 02",
    name: "Graphic Design & Visual Identity",
    title: "Graphic Design (Posters & Visuals)",
    color: "#EC4899",
    tagline: "Crafting visual stories and sermon branding.",
    role: "Design sermon series keys, altar screen backdrops, event posters, and social carousels.",
    tools: [
      "Canva Pro (Beginners welcome!)",
      "Figma (Modular broken-grid layouts)",
      "Adobe Photoshop & Illustrator",
      "Typography & Color Systems",
    ],
    mentorship:
      "Start with Canva or Figma. We teach visual hierarchy, palette harmony, and print-ready setup.",
    sundayTasks: [
      "Celebration announcement slides",
      "Sermon quote graphics for social media",
      "Print bulletins and event badges",
    ],
    formCheckboxValue: "Graphic Design (Photoshop, Illustrator, Canva)",
  },
  {
    id: "branch-writeups",
    number: "BRANCH 03",
    name: "Documentation & Copywriting",
    title: "Documentation & Write-Ups",
    color: "#2563EB",
    tagline: "Anchoring snapshots into timeless testimonies.",
    role: "Take sermon notes, capture member testimonies, and craft inspiring recaps for our online community.",
    tools: [
      "Scripture-anchored Storytelling",
      "Editorial Copywriting & Recaps",
      "Notion & Google Docs",
      "Testimony Interviews",
    ],
    mentorship:
      "Love writing? We teach you how to distill a 45-minute sermon into punchy 3-point reflections that touch hearts.",
    sundayTasks: [
      "Live sermon notes & key scripture quotes",
      "Post-service testimony interviews",
      "Drafting captions for the social media team",
    ],
    formCheckboxValue: "Social Media Content Creation & Copywriting",
  },
  {
    id: "branch-social-media",
    number: "BRANCH 04",
    name: "Social Media & Digital Marketing",
    title: "Social Media Marketing",
    color: "#FACC15",
    tagline: "Connecting church and community online.",
    role: "Curate and publish on JOHIA Facebook. Engage seekers, share stories, and grow online outreach.",
    tools: [
      "Meta Business Suite",
      "Short-form Reels & Stories",
      "Audience Analytics & Scheduling",
      "Community Engagement",
    ],
    mentorship:
      "Learn content scheduling, audience growth, and community management in an encouraging team.",
    sundayTasks: [
      "Sunday livestream announcements",
      "Real-time Facebook Stories",
      "Member engagement and prayer requests",
    ],
    formCheckboxValue: "Social Media Content Creation & Copywriting",
  },
];
