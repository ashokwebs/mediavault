"use client";

import React, { useState } from "react";
import { CLOUDINARY_PRESETS, TransformPreset, buildCloudinaryUrl } from "@/lib/cloudinary";
import { Image, Sparkles, Zap, ArrowRight, ShieldCheck, Download, Sliders, ExternalLink, RefreshCw } from "lucide-react";

const SAMPLE_IMAGES = [
  {
    name: "E-Commerce Footwear",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    type: "Product",
  },
  {
    name: "Architectural Studio",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    type: "Real Estate",
  },
  {
    name: "Artisan Coffee",
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    type: "Food & Bev",
  },
];

export default function Home() {
  const [selectedImg, setSelectedImg] = useState(SAMPLE_IMAGES[0].url);
  const [customUrl, setCustomUrl] = useState("");
  const [activePreset, setActivePreset] = useState<TransformPreset>(CLOUDINARY_PRESETS[0]);
  const [cloudName, setCloudName] = useState("demo");

  const currentSource = customUrl.trim() || selectedImg;
  const transformedUrl = buildCloudinaryUrl(currentSource, activePreset.transformationStr, cloudName);

  return (
    <div className="min-h-screen bg-[#090C15] text-slate-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-[#0C101D]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                MediaVault <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-semibold">Cloudinary AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Hacktober HackDays Ready
            </span>
            <a
              href="https://github.com/ashokwebs/mediavault"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Built for Hacktober HackDays 2026 (₹1,00,000 Cash Pool)
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Autonomous Digital Asset AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              Powered by Cloudinary Programmable Media
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Eliminate manual Photoshop exports and bloated payloads. Instant perceptual optimization, background extraction, and smart gravity framing via Cloudinary AI transformations.
          </p>
        </div>

        {/* Workspace Card */}
        <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-800">
            {/* Sample Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Preset Asset Sample:</label>
              <div className="flex gap-2">
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    onClick={() => {
                      setSelectedImg(img.url);
                      setCustomUrl("");
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      selectedImg === img.url && !customUrl
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {img.type}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Or Fetch Live External Asset:</label>
              <input
                type="text"
                placeholder="https://your-domain.com/sample.jpg"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full bg-[#090C15] border border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Transformation Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Select Cloudinary AI Transformation Pipeline:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CLOUDINARY_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setActivePreset(preset)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activePreset.id === preset.id
                      ? "bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg"
                      : "bg-[#090C15] border-slate-800/80 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-white">{preset.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{preset.description}</p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 font-mono text-[10px] text-indigo-400 truncate">
                    /{preset.transformationStr}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side-by-Side Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Original */}
            <div className="bg-[#090C15] border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Raw Unoptimized Ingest</span>
                <span className="font-mono text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Uncompressed JPEG (~2.4 MB)</span>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-slate-800/80 flex items-center justify-center">
                <img src={currentSource} alt="Original" className="object-cover w-full h-full" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 truncate">{currentSource}</div>
            </div>

            {/* Transformed */}
            <div className="bg-[#090C15] border border-indigo-900/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Cloudinary AI Transformed
                </span>
                <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Optimized AVIF (~180 KB / -92%)</span>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-indigo-900/60 flex items-center justify-center">
                <img src={transformedUrl} alt="Transformed" className="object-cover w-full h-full" />
              </div>
              <div className="text-[11px] font-mono text-indigo-400 truncate flex items-center justify-between">
                <span className="truncate">{transformedUrl}</span>
                <a href={transformedUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white ml-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0C101D]/60 py-6 text-center text-xs text-slate-500">
        <p>MediaVault — Built for Hacktober HackDays 2026. Powered by Cloudinary Dynamic Ingest & AI API.</p>
      </footer>
    </div>
  );
}
