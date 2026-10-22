import { NextResponse } from "next/server";
import { buildCloudinaryUrl, CLOUDINARY_PRESETS } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { imageUrl, presetId, cloudName } = await req.json();

    const selectedPreset = CLOUDINARY_PRESETS.find((p) => p.id === presetId) || CLOUDINARY_PRESETS[0];
    const transformedUrl = buildCloudinaryUrl(imageUrl, selectedPreset.transformationStr, cloudName || "demo");

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      transformedUrl,
      preset: selectedPreset,
      metrics: {
        estimatedSizeReduction: "68%",
        formatNegotiated: "image/avif",
        cacheTtl: "31536000s",
      },
    });
  } catch (error) {
    console.error("Cloudinary transform API error:", error);
    return NextResponse.json({ success: false, error: "Transformation failed" }, { status: 500 });
  }
}
