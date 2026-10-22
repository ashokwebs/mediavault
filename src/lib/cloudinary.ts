// Cloudinary AI Transformation & Delivery Engine

export interface TransformPreset {
  id: string;
  name: string;
  description: string;
  transformationStr: string;
  badge: string;
}

export const CLOUDINARY_PRESETS: TransformPreset[] = [
  {
    id: "auto-perf",
    name: "Autonomous High-Performance Delivery",
    description: "Automatic AVIF/WebP negotiation + lossy perceptual compression without human intervention.",
    transformationStr: "f_auto,q_auto:best",
    badge: "95+ Lighthouse",
  },
  {
    id: "smart-crop",
    name: "AI Content-Aware Smart Crop",
    description: "Identifies core semantic subject and centers frame automatically for square and story formats.",
    transformationStr: "c_fill,g_auto,w_600,h_600,f_auto,q_auto",
    badge: "E-Commerce",
  },
  {
    id: "bg-remove",
    name: "Neural Background Extraction",
    description: "Removes distracting real-world backgrounds into crisp transparency for product cards.",
    transformationStr: "e_background_removal,f_auto,q_auto",
    badge: "Catalog AI",
  },
  {
    id: "retouch",
    name: "Color Harmonization & Clarity",
    description: "Multi-scale contrast enhancement, exposure balance, and edge definition boost.",
    transformationStr: "e_improve,e_sharpen:100,f_auto,q_auto",
    badge: "Studio Polish",
  },
];

export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  transformStr: string,
  cloudName = "demo"
): string {
  if (!publicIdOrUrl) return "";

  // If already a full URL
  if (publicIdOrUrl.startsWith("http")) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}/${encodeURIComponent(publicIdOrUrl)}`;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${publicIdOrUrl}`;
}
