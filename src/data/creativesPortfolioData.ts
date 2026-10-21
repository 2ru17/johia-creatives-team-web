import { StudioAccentColor } from "@/store/useCreativesStore";

export type PortfolioCategory =
  | "ALL WORKS"
  | "EVENT POSTERS"
  | "SUNDAY PHOTOGRAPHY"
  | "SERMON SERIES"
  | "YOUTH & SOAKING";

export interface CreativeRecipe {
  swatches: string[];
  fonts: string;
  exif: string;
  branches: string[];
  dimensions: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "EVENT POSTERS" | "SUNDAY PHOTOGRAPHY" | "SERMON SERIES" | "YOUTH & SOAKING";
  fig: string;
  coord: string;
  accent: StudioAccentColor;
  aspectRatio: "square" | "portrait" | "wide";
  gridSpan: string;
  description: string;
  recipe: CreativeRecipe;
  imageSrc?: string;
  svgVariant:
    | "conqueror"
    | "still-standing"
    | "choice-is-yours"
    | "interrupted"
    | "larger-than-life"
    | "beyond-capacity"
    | "baptism"
    | "no-limits";
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "sermon-conqueror",
    title: "Sunday Message Key Visual: 'Conqueror'",
    category: "SERMON SERIES",
    fig: "FIG. 01",
    coord: "GRID // COL_01_06 // ROW_01",
    accent: "#FF5A1F",
    aspectRatio: "portrait",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-5",
    description:
      "Signature sermon key visual branding for the August 30 message (Isaiah 54:2). Explores spiritual expansion, renewed mindsets, and conquering by faith.",
    recipe: {
      swatches: ["#FF5A1F", "#FACC15", "#121316"],
      fonts: "Syne 900 + JetBrains Mono",
      exif: "Digital Vector Artboard • Isaiah 54:2",
      branches: ["Branch 02: Graphic Design", "Branch 04: Social Media"],
      dimensions: "1080 x 1350 px (Instagram / FB 4:5)",
    },
    svgVariant: "conqueror",
  },
  {
    id: "sermon-still-standing",
    title: "Sermon Series Graphic: 'Still Standing'",
    category: "SERMON SERIES",
    fig: "FIG. 02",
    coord: "GRID // COL_07_12 // ROW_01",
    accent: "#EC4899",
    aspectRatio: "wide",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-7",
    description:
      "Message series visual for the July 26 service (Ephesians 6:13). Dynamic mountain topography and bold typography celebrating steadfast faith.",
    recipe: {
      swatches: ["#EC4899", "#2563EB", "#FAF7F2"],
      fonts: "Impact / Cabinet Grotesk + Plus Jakarta Sans",
      exif: "Editorial Typography • Ephesians 6:13",
      branches: ["Branch 02: Graphic Design", "Branch 03: Write-Ups"],
      dimensions: "1920 x 1080 px (Sanctuary LED Screen)",
    },
    svgVariant: "still-standing",
  },
  {
    id: "series-when-the-choice-is-yours",
    title: "Discipleship Series: 'When the Choice Is Yours'",
    category: "SERMON SERIES",
    fig: "FIG. 03",
    coord: "GRID // COL_01_04 // ROW_02",
    accent: "#8B5CF6",
    aspectRatio: "portrait",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    description:
      "Sermon visual branding for the September 6 message (2 Chronicles 20). Modern editorial typography layout framing how we choose to respond by faith when battles are bigger than us.",
    recipe: {
      swatches: ["#8B5CF6", "#2563EB", "#FAF7F2"],
      fonts: "Playfair Display + JetBrains Mono",
      exif: "Vector Layout • 2 Chronicles 20",
      branches: ["Branch 02: Graphic Design", "Branch 03: Write-Ups"],
      dimensions: "1080 x 1350 px (Social Carousel)",
    },
    svgVariant: "choice-is-yours",
  },
  {
    id: "sermon-recap-interrupted",
    title: "Sunday Recap Visual Study: 'Interrupted'",
    category: "SERMON SERIES",
    fig: "FIG. 04",
    coord: "GRID // COL_05_12 // ROW_02",
    accent: "#2563EB",
    aspectRatio: "wide",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-8",
    description:
      "Sunday service recap for October 10. A typography and graphic design study exploring unexpected pauses and trusting Jesus in the midst of life's storms.",
    recipe: {
      swatches: ["#2563EB", "#10B981", "#FAF7F2"],
      fonts: "Cabinet Grotesk + Plus Jakarta Sans",
      exif: "Editorial Typography • October 10 Key Visual",
      branches: ["Branch 02: Graphic Design", "Branch 03: Write-Ups"],
      dimensions: "1920 x 1080 px (Sanctuary LED Screen)",
    },
    svgVariant: "interrupted",
  },
  {
    id: "sermon-larger-than-life",
    title: "Sunday Message Poster: 'Larger Than Life'",
    category: "EVENT POSTERS",
    fig: "FIG. 05",
    coord: "GRID // COL_01_06 // ROW_03",
    accent: "#FACC15",
    aspectRatio: "wide",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    description:
      "Sunday service visual for September 13. Vibrant geometric poster branding reflecting God's greatness and calling us to think beyond human capacity.",
    recipe: {
      swatches: ["#FACC15", "#FF5A1F", "#121316"],
      fonts: "Syne Black + JetBrains Mono",
      exif: "Geometric Artboard • September 13 Key Visual",
      branches: ["Branch 02: Graphic Design", "Branch 04: Social Media"],
      dimensions: "1920 x 1080 px (16:9 LED Wall)",
    },
    svgVariant: "larger-than-life",
  },
  {
    id: "sermon-beyond-capacity",
    title: "Sunday Series: 'Beyond Your Capacity'",
    category: "SERMON SERIES",
    fig: "FIG. 06",
    coord: "GRID // COL_07_12 // ROW_03",
    accent: "#10B981",
    aspectRatio: "portrait",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-6",
    description:
      "Key visual for the August 23 Sunday series. Kinetic composition framing reliance on divine strength when human capacity is exceeded.",
    recipe: {
      swatches: ["#10B981", "#FACC15", "#121316"],
      fonts: "Cinzel Decorative + Plus Jakarta Sans",
      exif: "Modular Poster • August 23 Key Visual",
      branches: ["Branch 02: Graphic Design", "Branch 01: Photography"],
      dimensions: "1080 x 1350 px",
    },
    svgVariant: "beyond-capacity",
  },
  {
    id: "baptism-testimony-grid",
    title: "Water Baptism & New Life Testimony Carousel",
    category: "SUNDAY PHOTOGRAPHY",
    fig: "FIG. 07",
    coord: "GRID // COL_01_07 // ROW_04",
    accent: "#2563EB",
    aspectRatio: "wide",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-7",
    imageSrc: "/images/gallery/water-baptism.jpg",
    description:
      "Candid smiles breaking through water: a powerful testimony documentary carousel capturing obedience, joyful celebration, and faith stories.",
    recipe: {
      swatches: ["#2563EB", "#FF5A1F", "#FAF7F2"],
      fonts: "Plus Jakarta Sans Bold + JetBrains Mono",
      exif: "Canon EOS R6 • 50mm f/1.8 • 1/1000s • ISO 250",
      branches: ["Branch 01: Photography", "Branch 03: Write-Ups", "Branch 04: Social Media"],
      dimensions: "1080 x 1080 px Multi-Slide Carousel",
    },
    svgVariant: "baptism",
  },
  {
    id: "youth-gathering-wildfire",
    title: "Wildfire Sunday: Youth Gathering & Celebration",
    category: "YOUTH & SOAKING",
    fig: "FIG. 08",
    coord: "GRID // COL_08_12 // ROW_04",
    accent: "#FF5A1F",
    aspectRatio: "portrait",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-5",
    imageSrc: "/images/gallery/youth-stage.jpg",
    description:
      "Recent candid documentary capture from Wildfire Sunday. Celebrating the vibrant next generation of believers gathered on stage for authentic worship, fellowship, and discipleship.",
    recipe: {
      swatches: ["#FF5A1F", "#FACC15", "#121316"],
      fonts: "Syne + Plus Jakarta Sans",
      exif: "Sony A7 IV • 24-70mm f/2.8 • 1/250s • ISO 800",
      branches: ["Branch 01: Photography", "Branch 04: Social Media"],
      dimensions: "2048 x 946 px (Cinematic Stage Docu)",
    },
    svgVariant: "no-limits",
  },
];
