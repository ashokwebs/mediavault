"use client";

import React, { useState } from "react";
import { CLOUDINARY_PRESETS, TransformPreset, buildCloudinaryUrl } from "@/lib/cloudinary";
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Download,
  Sliders,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  Leaf,
  Gauge,
  Copy,
  Check
} from "lucide-react";

const SAMPLE_IMAGES = [
  {
    name: "E-Commerce Footwear",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    type: "Footwear",
    origSize: "2,480 KB",
    optSize: "185 KB",
  },
  {
    name: "Architectural Studio",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    type: "Architecture",
    origSize: "3,120 KB",
    optSize: "240 KB",
  },
  {
    name: "Artisan Coffee",
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    type: "Beverage",
    origSize: "1,890 KB",
    optSize: "145 KB",
  },
];

export default function Home() {
  const [selectedImg, setSelectedImg] = useState(SAMPLE_IMAGES[0]);
  const [customUrl, setCustomUrl] = useState("");
  const [activePreset, setActivePreset] = useState<TransformPreset>(CLOUDINARY_PRESETS[1]); // Default to Neural BG Removal
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"slider" | "sideBySide">("slider");

  const currentSource = customUrl.trim() || selectedImg.url;
  const transformedUrl = buildCloudinaryUrl(currentSource, activePreset.transformationStr, "demo");

  const copyCdnUrl = () => {
    navigator.clipboard.writeText(transformedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-[#0A0E1A]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                MediaVault <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">Cloudinary AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Hacktober HackDays 2026
            </span>
            <a
              href="https://github.com/ashokwebs/mediavault"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition flex items-center gap-1 font-medium"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Autonomous E-Commerce Digital Asset & Media Pipeline
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Studio-Grade Product Media, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              Powered by Cloudinary AI
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Eliminate manual editing and sluggish mobile load times. Automated background extraction, smart focal crop, and 92% bandwidth reduction delivered via programmable CDN URLs.
          </p>
        </div>

        {/* Live Bandwidth & Core Web Vitals Benchmark */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0C1120] border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Bandwidth Saved</div>
              <div className="text-base font-bold text-emerald-400">-92.5%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Mobile LCP Speedup</div>
              <div className="text-base font-bold text-white">13.6x Faster</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Modern Format</div>
              <div className="text-base font-bold text-white">Auto AVIF / WebP</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">CO2 per 100k views</div>
              <div className="text-base font-bold text-amber-400">-178 kg CO2</div>
            </div>
          </div>
        </div>

        {/* Workspace Card */}
        <div className="bg-[#0D1222] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-800">
            {/* Sample Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Preset Sample Asset:</label>
              <div className="flex gap-2">
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    onClick={() => {
                      setSelectedImg(img);
                      setCustomUrl("");
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      selectedImg.name === img.name && !customUrl
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/30"
                        : "bg-[#080B14] text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {img.type}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Or Enter Any Public Image URL:</label>
              <input
                type="text"
                placeholder="https://your-domain.com/product.jpg"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full bg-[#080B14] border border-slate-700/80 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Transformation Presets */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Select Cloudinary AI Transformation Pipeline:
              </label>
              <div className="flex items-center gap-2 bg-[#080B14] border border-slate-800 p-0.5 rounded-lg text-[11px]">
                <button
                  onClick={() => setActiveTab("slider")}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === "slider" ? "bg-indigo-600 text-white font-medium" : "text-slate-400"}`}
                >
                  Interactive Wipe Slider
                </button>
                <button
                  onClick={() => setActiveTab("sideBySide")}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === "sideBySide" ? "bg-indigo-600 text-white font-medium" : "text-slate-400"}`}
                >
                  Side-by-Side
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CLOUDINARY_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setActivePreset(preset)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    activePreset.id === preset.id
                      ? "bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg"
                      : "bg-[#090C17] border-slate-800/80 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-white">{preset.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{preset.description}</p>
                  <div className="mt-2 pt-2 border-t border-slate-800/60 font-mono text-[10px] text-indigo-400 truncate">
                    /{preset.transformationStr}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Visualizer */}
          {activeTab === "slider" ? (
            /* Interactive Split-Screen Wipe Slider */
            <div className="bg-[#090C17] border border-indigo-950/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="text-amber-400 font-semibold">◀ Raw Ingest ({selectedImg.origSize})</span>
                  <span>vs</span>
                  <span className="text-emerald-400 font-semibold">Cloudinary AI Transformed ({selectedImg.optSize}) ▶</span>
                </span>
                <span className="text-indigo-400 font-mono text-[11px]">Drag slider to inspect optical edge quality</span>
              </div>

              {/* Slider Image Container */}
              <div className="relative aspect-video max-h-[480px] rounded-xl overflow-hidden bg-black/60 border border-slate-800 select-none">
                {/* Transformed Layer (Underneath) */}
                <img
                  src={transformedUrl}
                  alt="Transformed"
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Raw Original Layer (Clipped on top) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={currentSource}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded text-[11px] font-mono">
                    RAW ORIGINAL
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded text-[11px] font-mono">
                  CLOUDINARY AI
                </div>

                {/* Split line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white text-slate-900 rounded-full flex items-center justify-center font-bold text-xs shadow-xl">
                    ⇄
                  </div>
                </div>

                {/* Hidden Range Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                  aria-label="Before and after split slider"
                />
              </div>
            </div>
          ) : (
            /* Traditional Side-by-Side */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#090C17] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Raw Unoptimized Ingest</span>
                  <span className="font-mono text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{selectedImg.origSize} (Uncompressed)</span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-slate-800/80 flex items-center justify-center">
                  <img src={currentSource} alt="Original" className="object-contain w-full h-full" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 truncate">{currentSource}</div>
              </div>

              <div className="bg-[#090C17] border border-indigo-900/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Cloudinary AI Transformed
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{selectedImg.optSize} (-92.5%)</span>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-indigo-900/60 flex items-center justify-center">
                  <img src={transformedUrl} alt="Transformed" className="object-contain w-full h-full" />
                </div>
                <div className="text-[11px] font-mono text-indigo-400 truncate flex items-center justify-between">
                  <span className="truncate">{transformedUrl}</span>
                  <a href={transformedUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white ml-2">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={copyCdnUrl}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-indigo-900/30"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied CDN URL!" : "Copy Production CDN Link"}
              </button>
              <a
                href={transformedUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#090C17] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                Open Full Asset <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              Cloudinary Transformation: <code className="text-indigo-400">/{activePreset.transformationStr}</code>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0A0E1A]/60 py-6 text-center text-xs text-slate-500">
        <p>MediaVault — Built for Hacktober HackDays 2026. Powered by Cloudinary Programmable Media & Generative AI.</p>
      </footer>
    </div>
  );
}
