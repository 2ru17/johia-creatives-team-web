import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://johia-creatives.vercel.app"),
  title: "JOHIA CREATIVES | We Shape The Vibe | Cubao",
  description:
    "The official JOHIA Creatives web experience for Jesus Our Hope International Assemblies - Cubao. Photography, Graphic Design, Event Documentation & Social Media Marketing.",
  manifest: "/manifest.json",
  openGraph: {
    title: "JOHIA CREATIVES | We Shape The Vibe | Cubao",
    description:
      "Explore the 4 Creatives branches, interact with our 3D camera angles and Lego poster assembler, and join our creative family.",
    images: ["/images/og-image.png"],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Jesus Our Hope International Assemblies - Cubao",
  alternateName: ["JOHIA Cubao", "JOHIA Creatives"],
  url: "https://johia-creatives.vercel.app",
  logo: "https://johia-creatives.vercel.app/images/johia-logo.png",
  image: "https://johia-creatives.vercel.app/images/og-image.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#15 Cambridge St.",
    addressLocality: "Cubao",
    addressRegion: "Quezon City",
    addressCountry: "PH",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "12:30",
    },
  ],
  sameAs: ["https://www.facebook.com/johiacubaoph"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen selection:bg-[#FF5A1F] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
