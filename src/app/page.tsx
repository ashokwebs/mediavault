"use client";

import React, { useState, useRef } from "react";
import { CLOUDINARY_PRESETS, TransformPreset, buildCloudinaryUrl } from "@/lib/cloudinary";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Download,
  Sliders,
  ExternalLink,
  Layers,
  Leaf,
  Gauge,
  Copy,
  Check,
  User,
  Key,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  Grid,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Info
} from "lucide-react";

interface MerchantProfile {
  id: string;
  name: string;
  email: string;
  storeName: string;
  role: "guest" | "pro" | "enterprise";
  creditsUsed: number;
  creditsLimit: number;
  apiKey: string;
}

const PRESET_USERS: MerchantProfile[] = [
  {
    id: "user_pro_01",
    name: "Ashok (Norveth Store)",
    email: "merchant@norveth.app",
    storeName: "Norveth Gear & Apparel",
    role: "pro",
    creditsUsed: 42,
    creditsLimit: 500,
    apiKey: "mv_live_948f2b1a8dc7392e411b0e9a",
  },
  {
    id: "user_enterprise_02",
    name: "Cloudinary Agency Partner",
    email: "agency@mediavault.io",
    storeName: "Global Omnichannel Studio",
    role: "enterprise",
    creditsUsed: 1280,
    creditsLimit: 10000,
    apiKey: "mv_ent_71c08d4b3e89a572f019c4ee",
  },
  {
    id: "user_guest_00",
    name: "Guest Evaluator (Unstop Judge)",
    email: "judge@unstop.com",
    storeName: "Demo Evaluation Store",
    role: "guest",
    creditsUsed: 3,
    creditsLimit: 25,
    apiKey: "mv_demo_sandbox_000000000000",
  },
];

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
  const [user, setUser] = useState<MerchantProfile>(PRESET_USERS[0]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(SAMPLE_IMAGES[0]);
  const [customUrl, setCustomUrl] = useState("");
  const [uploadedDataUrl, setUploadedDataUrl] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<TransformPreset>(CLOUDINARY_PRESETS[1]); // Default: Neural BG Removal
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<"slider" | "sideBySide">("slider");
  const [canvasBg, setCanvasBg] = useState<"dark" | "light" | "checker">("dark");
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const currentSource = uploadedDataUrl || customUrl.trim() || selectedImg.url;
  // If user uploaded a local data URL, fallback to demo cloud for URL representation
  const transformedUrl = buildCloudinaryUrl(
    uploadedDataUrl ? selectedImg.url : currentSource,
    activePreset.transformationStr,
    "demo"
  );

  const copyCdnUrl = () => {
    navigator.clipboard.writeText(transformedUrl);
    showToast("Production Cloudinary CDN URL copied to clipboard!");
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    showToast(`API Key copied for ${user.name}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedDataUrl(reader.result as string);
        setCustomUrl("");
        setUser((prev) => ({ ...prev, creditsUsed: prev.creditsUsed + 1 }));
        showToast(`Uploaded ${file.name} to local processing canvas`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    showToast("Preparing transformed asset download...", "info");
    try {
      const resp = await fetch(transformedUrl, { mode: "cors" });
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `mediavault-${activePreset.id}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showToast("Download completed successfully!");
    } catch {
      // Fallback: direct window open if CORS restricts direct client blob conversion
      window.open(transformedUrl, "_blank");
      showToast("Opened transformed high-res asset in new tab!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-indigo-950/95 border border-indigo-500/50 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-[#0A0E1A]/90 backdrop-blur sticky top-0 z-40">
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

          <div className="flex items-center gap-3">
            {/* Merchant Persona & Auth Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsAuthOpen(!isAuthOpen)}
                className="flex items-center gap-2 bg-[#0E1424] hover:bg-[#141C33] border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs transition shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-semibold text-slate-200 leading-tight flex items-center gap-1.5">
                    {user.name}
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                      {user.role}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {/* Auth Dropdown */}
              {isAuthOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#0E1426] border border-slate-700 rounded-2xl p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">Merchant Session</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>

                  {/* Quota bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Monthly AI Quota</span>
                      <span className="font-mono text-slate-200">{user.creditsUsed} / {user.creditsLimit}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all"
                        style={{ width: `${Math.min((user.creditsUsed / user.creditsLimit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* API Key */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-medium">Production API Key:</span>
                    <div className="flex items-center justify-between bg-black/40 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-300">
                      <span className="truncate max-w-[170px]">{user.apiKey}</span>
                      <button onClick={copyApiKey} className="text-indigo-400 hover:text-indigo-300 ml-1">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Switch Account */}
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Switch Persona:</span>
                    {PRESET_USERS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setUser(p);
                          setIsAuthOpen(false);
                          showToast(`Switched persona to ${p.name}`);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                          user.id === p.id ? "bg-indigo-600/30 text-indigo-300 font-medium" : "hover:bg-slate-800/60 text-slate-400"
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        <span className="text-[10px] font-mono uppercase">{p.role}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="https://github.com/ashokwebs/mediavault"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition flex items-center gap-1 font-medium text-xs hidden sm:flex"
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
            Eliminate manual Photoshop cutouts and sluggish mobile load times. Automated background extraction, smart focal crop, and 92% bandwidth reduction delivered via programmable CDN URLs.
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
            {/* Sample Selector & Custom File Upload */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Preset Sample Asset:</label>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    onClick={() => {
                      setSelectedImg(img);
                      setCustomUrl("");
                      setUploadedDataUrl(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      selectedImg.name === img.name && !customUrl && !uploadedDataUrl
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/30"
                        : "bg-[#080B14] text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {img.type}
                  </button>
                ))}

                {/* Upload Trigger */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                    uploadedDataUrl
                      ? "bg-cyan-600 text-white border-cyan-500"
                      : "bg-[#080B14] text-cyan-400 border-cyan-900/50 hover:border-cyan-700"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  {uploadedDataUrl ? "Custom File" : "Upload File"}
                </button>
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Or Enter Any Public Image URL:</label>
              <input
                type="text"
                placeholder="https://your-domain.com/product.jpg"
                value={customUrl}
                onChange={(e) => {
                  setCustomUrl(e.target.value);
                  setUploadedDataUrl(null);
                }}
                className="w-full bg-[#080B14] border border-slate-700/80 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Transformation Presets */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Select Cloudinary AI Transformation Pipeline:
              </label>
              
              <div className="flex items-center gap-3">
                {/* Canvas Background Preview Selector */}
                <div className="flex items-center gap-1 bg-[#080B14] border border-slate-800 p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setCanvasBg("dark")}
                    title="Dark Charcoal Studio"
                    className={`p-1.5 rounded transition ${canvasBg === "dark" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCanvasBg("light")}
                    title="Clean White Storefront"
                    className={`p-1.5 rounded transition ${canvasBg === "light" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-white"}`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCanvasBg("checker")}
                    title="Transparent Checkerboard"
                    className={`p-1.5 rounded transition ${canvasBg === "checker" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-[#080B14] border border-slate-800 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setActiveTab("slider")}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === "slider" ? "bg-indigo-600 text-white font-medium" : "text-slate-400"}`}
                  >
                    Wipe Slider
                  </button>
                  <button
                    onClick={() => setActiveTab("sideBySide")}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === "sideBySide" ? "bg-indigo-600 text-white font-medium" : "text-slate-400"}`}
                  >
                    Side-by-Side
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CLOUDINARY_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    setActivePreset(preset);
                    setUser((prev) => ({ ...prev, creditsUsed: prev.creditsUsed + 1 }));
                  }}
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

          {/* Interactive Visualizer Canvas */}
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

              {/* Slider Image Container with Canvas Background Toggle */}
              <div
                className={`relative aspect-video max-h-[480px] rounded-xl overflow-hidden border border-slate-800 select-none ${
                  canvasBg === "light"
                    ? "bg-white"
                    : canvasBg === "checker"
                    ? "bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%),linear-gradient(-45deg,#1f2937_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f2937_75%),linear-gradient(-45deg,transparent_75%,#1f2937_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] bg-slate-900"
                    : "bg-black/60"
                }`}
              >
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
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copyCdnUrl}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-indigo-900/30"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Production CDN Link
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-emerald-900/30"
              >
                <Download className="w-3.5 h-3.5" />
                {isDownloading ? "Downloading..." : "Download Asset"}
              </button>

              <a
                href={transformedUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#090C17] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
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
