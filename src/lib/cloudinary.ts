// Cloudinary AI Transformation & Delivery Engine for MediaVault

export interface TransformPreset {
  id: string;
  name: string;
  description: string;
  transformationStr: string;
  badge: string;
  category: "Performance" | "Catalog AI" | "Omnichannel" | "Enhance";
}

export const CLOUDINARY_PRESETS: TransformPreset[] = [
  {
    id: "auto-perf",
    name: "Autonomous High-Performance Delivery",
    description: "Automatic modern AVIF/WebP format negotiation + perceptual lossy compression with zero human intervention.",
    transformationStr: "f_auto,q_auto:best",
    badge: "98+ Lighthouse",
    category: "Performance",
  },
  {
    id: "bg-remove",
    name: "Neural Background Extraction",
    description: "AI-powered foreground segmentation removing distracting real-world backgrounds into crisp transparency.",
    transformationStr: "e_background_removal,f_auto,q_auto",
    badge: "Catalog AI",
    category: "Catalog AI",
  },
  {
    id: "studio-shadow",
    name: "Studio Drop Shadow & Floating Elevation",
    description: "Neural cutout with simulated studio spotlight lighting and realistic soft shadow spread.",
    transformationStr: "e_background_removal/e_dropshadow:azimuth_215;elevation_45;spread_5,f_auto,q_auto",
    badge: "Amazon / Shopify",
    category: "Catalog AI",
  },
  {
    id: "omnichannel-story",
    name: "Omnichannel 9:16 Social Story Auto-Padding",
    description: "Adapts landscape or square product media to vertical reels/stories with AI predominant color gradient background.",
    transformationStr: "c_pad,g_auto,ar_9:16,b_auto:predominant_gradient,f_auto,q_auto",
    badge: "TikTok & Reels",
    category: "Omnichannel",
  },
  {
    id: "smart-crop",
    name: "AI Content-Aware Smart Crop (1:1)",
    description: "Identifies the core semantic focal point and centers the frame for square marketplace listings.",
    transformationStr: "c_fill,g_auto,w_600,h_600,f_auto,q_auto",
    badge: "E-Commerce",
    category: "Omnichannel",
  },
  {
    id: "retouch",
    name: "Color Harmonization & Clarity Boost",
    description: "Multi-scale adaptive contrast enhancement, dynamic exposure balance, and high-frequency edge sharpening.",
    transformationStr: "e_improve,e_sharpen:100,f_auto,q_auto",
    badge: "Studio Polish",
    category: "Enhance",
  },
];

export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  transformStr: string,
  cloudName = "demo"
): string {
  if (!publicIdOrUrl) return "";

  // If already a full URL (fetch API)
  if (publicIdOrUrl.startsWith("http")) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}/${encodeURIComponent(publicIdOrUrl)}`;
  }

  // Uploaded asset
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${publicIdOrUrl}`;
}
