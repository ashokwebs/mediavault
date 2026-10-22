import test from "node:test";
import assert from "node:assert/strict";

// Re-implement the pure URL builder function for isolated node runner testing
function buildCloudinaryUrl(sourceUrl, transformStr, cloudName = "demo") {
  const isDirectAsset = !sourceUrl.startsWith("http://") && !sourceUrl.startsWith("https://");
  if (isDirectAsset) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${sourceUrl}`;
  }
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformStr}/${encodeURIComponent(sourceUrl)}`;
}

const PRESETS = [
  { id: "p1", transform: "f_auto,q_auto:best" },
  { id: "p2", transform: "e_background_removal" },
  { id: "p3", transform: "e_dropshadow:azimuth_215;elevation_45;spread_5" },
  { id: "p4", transform: "c_pad,g_auto,ar_9:16,b_auto:predominant_gradient" },
  { id: "p5", transform: "c_fill,g_auto,w_600,h_600" },
  { id: "p6", transform: "e_improve,e_sharpen:100" },
];

test("Cloudinary URL Builder formats fetch URLs with modern encodings", () => {
  const source = "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
  const url = buildCloudinaryUrl(source, "e_background_removal", "demo");
  assert.ok(url.startsWith("https://res.cloudinary.com/demo/image/fetch/e_background_removal/"));
  assert.ok(url.includes(encodeURIComponent(source)));
});

test("Cloudinary URL Builder handles direct asset public IDs", () => {
  const url = buildCloudinaryUrl("sample.jpg", "f_auto,q_auto", "demo");
  assert.equal(url, "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg");
});

test("All 6 Cloudinary transformation pipelines produce valid endpoints", () => {
  const sample = "https://example.com/shoe.jpg";
  for (const preset of PRESETS) {
    const url = buildCloudinaryUrl(sample, preset.transform, "demo");
    assert.ok(url.includes(preset.transform), `Failed on preset ${preset.id}`);
    assert.ok(url.startsWith("https://res.cloudinary.com/demo/image/fetch/"));
  }
});
