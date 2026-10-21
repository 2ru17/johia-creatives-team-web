"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Share2,
  ThumbsUp,
  Heart,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  useCreativesStore,
  WriteupTone,
} from "@/store/useCreativesStore";
import { WRITEUP_TEMPLATES } from "@/data/facebookFeedPosts";
import { PaintDripDivider } from "@/components/navigation/PaintDripDivider";
import { cn } from "@/lib/utils";

export function Chapter5FacebookWriteupHub() {
  const { activeAccent, writeupTone, setWriteupTone, cameraAngle } = useCreativesStore();
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState({
    like: 142,
    love: 89,
    care: 34,
  });
  const [userReacted, setUserReacted] = useState<"like" | "love" | "care" | null>("love");

  const currentWriteup = WRITEUP_TEMPLATES[writeupTone];

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `${currentWriteup.caption}\n\n${currentWriteup.hashtags.join(" ")}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReact = (type: "like" | "love" | "care") => {
    if (userReacted === type) {
      setUserReacted(null);
      setReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    } else {
      if (userReacted) {
        setReactions((prev) => ({ ...prev, [userReacted]: prev[userReacted] - 1 }));
      }
      setUserReacted(type);
      setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  return (
    <section
      id="chapter-5"
      className="relative min-h-screen py-20 bg-[#FAF7F2] text-[#121316] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#121316]/25 bg-white mb-3 text-xs font-mono font-bold">
            <Share2 className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span>CHAPTER 05 // DOCUMENTATION WRITE-UPS & FACEBOOK HUB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            THE FINAL STEP:
            <br />
            <span
              className="underline decoration-wavy decoration-2 transition-colors duration-300"
              style={{ textDecorationColor: activeAccent }}
            >
              FROM SHUTTER TO SOCIALS.
            </span>
          </h2>
          <p className="mt-3 text-[#5A5D64] text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
            A photo captures the moment; the write-up anchors the testimony. See how our
            Documentation & Social Media teams turn Sunday service into inspiring online stories.
          </p>
        </div>

        {/* 2-Column Split: Write-Up Studio (Left) & Facebook Feed Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Write-Up Studio */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-[#121316]/25 rounded-sm p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#121316]/15 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" style={{ color: activeAccent }} />
                  <h3 className="font-bold text-sm text-[#121316]">Event Write-Up Studio</h3>
                </div>
                <span className="text-[10px] font-mono text-[#5A5D64]">BRANCH 03 & 04</span>
              </div>

              {/* Tone Switcher Pills */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-[#5A5D64] block mb-2">
                  SELECT WRITE-UP TONE:
                </span>
                <div className="flex flex-col gap-2">
                  {(Object.keys(WRITEUP_TEMPLATES) as WriteupTone[]).map((toneKey) => {
                    const t = WRITEUP_TEMPLATES[toneKey];
                    const isSelected = writeupTone === toneKey;
                    return (
                      <button
                        key={toneKey}
                        onClick={() => setWriteupTone(toneKey)}
                        className={cn(
                          "p-3 rounded-sm border text-left transition-all duration-200 cursor-pointer flex items-center justify-between",
                          isSelected
                            ? "bg-[#121316] text-[#FAF7F2] border-[#121316] shadow-xs"
                            : "bg-[#FAF7F2] text-[#121316] border-[#121316]/20 hover:border-[#121316]/40"
                        )}
                      >
                        <div>
                          <div className="font-bold text-xs">{t.label}</div>
                          <div className="text-[10px] font-mono opacity-70 mt-0.5">{t.badge}</div>
                        </div>
                        {isSelected && (
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: activeAccent }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Author & Audience Meta */}
              <div className="p-3 bg-[#FAF7F2] border border-[#121316]/15 rounded-sm text-[11px] font-mono space-y-1 mb-4 text-[#5A5D64]">
                <div>
                  <strong className="text-[#121316]">BY:</strong> {currentWriteup.author}
                </div>
                <div>
                  <strong className="text-[#121316]">AUDIENCE:</strong> {currentWriteup.targetAudience}
                </div>
              </div>

              {/* Live Caption Textarea Preview */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={writeupTone}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-[#FAF7F2] border border-[#121316]/20 rounded-sm font-sans text-xs text-[#121316] leading-relaxed whitespace-pre-line"
                  >
                    {currentWriteup.caption}

                    {/* Hashtags */}
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-[#121316]/10 font-mono text-[10px] text-blue-600 font-bold">
                      {currentWriteup.hashtags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="mt-3 w-full py-2 px-3 rounded-sm border border-[#121316]/30 bg-white hover:bg-[#FAF7F2] text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Caption Copied To Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Caption & Hashtags</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Facebook Page Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#121316]/30 rounded-sm shadow-xl overflow-hidden">
              {/* Facebook Page Header Banner (Official Cover from @johiacubaoph) */}
              <div className="relative w-full aspect-[1119/388] overflow-hidden bg-zinc-900">
                <Image
                  src="/images/facebook-cover.jpg"
                  alt="JOHIA Cubao Facebook Banner"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover object-center"
                />
              </div>

              {/* Facebook Profile Bar */}
              <div className="px-5 pb-4 pt-2 border-b border-zinc-200 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-4">
                    {/* Only the avatar pops up over the cover banner */}
                    <div className="-mt-10 sm:-mt-14 relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md overflow-hidden shrink-0 bg-[#F7B519] flex items-center justify-center z-10">
                      <Image
                        src="/images/johia-logo.png"
                        alt="JOHIA Cubao"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                        priority
                        unoptimized
                      />
                    </div>
                    {/* Profile text cleanly centered and padded */}
                    <div className="pt-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-lg sm:text-xl text-[#121316]">
                          JOHIA Cubao
                        </h4>
                        <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 font-sans mt-0.5">
                        4K followers • Evangelical Church
                      </p>
                      <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                        This is your Home. People Loving God. People Inspiring Change.
                      </p>
                    </div>
                  </div>

                  {/* Facebook Profile Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <a
                      href="https://www.facebook.com/johiacubaoph"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1877F2] hover:bg-blue-600 text-xs font-bold text-white rounded shadow-xs transition-colors"
                    >
                      <span>Visit Official Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-zinc-100 text-xs text-zinc-600 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans">
                  <span>📍 #15 Cambridge St, Cubao, Quezon City</span>
                  <span>👥 4K Followers</span>
                  <span>🕒 Sundays 10:00 AM</span>
                </div>
              </div>

              {/* Live Post Card Preview */}
              <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200">
                {/* Post Creator Bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full border border-zinc-200 bg-[#F7B519] overflow-hidden shrink-0 flex items-center justify-center">
                      <Image
                        src="/images/johia-logo.png"
                        alt="JOHIA Cubao"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-zinc-900 flex items-center gap-1">
                        <span>JOHIA Cubao</span>
                        <span className="text-blue-500 font-bold text-[10px]">✓</span>
                      </div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <span>Just now</span>
                        <span>•</span>
                        <span>🌐 Public</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Caption (Dynamic from Selected Tone) */}
                <div className="text-xs sm:text-sm text-zinc-800 leading-relaxed whitespace-pre-line mb-4 font-sans">
                  {currentWriteup.caption}
                  <div className="mt-2 text-blue-600 font-bold text-xs">
                    {currentWriteup.hashtags.join(" ")}
                  </div>
                </div>

                {/* Reaction Summary Count */}
                <div className="flex items-center justify-between text-xs text-zinc-500 pb-2.5 mb-2 border-b border-zinc-200">
                  <div className="flex items-center gap-1.5">
                    <span className="flex -space-x-1">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
                        👍
                      </span>
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                        ❤️
                      </span>
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                        🥰
                      </span>
                    </span>
                    <span className="font-mono text-[11px] font-bold text-zinc-700">
                      {reactions.like + reactions.love + reactions.care} Reactions
                    </span>
                  </div>
                  <div className="font-mono text-[11px]">28 Comments • 47 Shares</div>
                </div>

                {/* Interactive Reaction Buttons */}
                <div className="grid grid-cols-3 gap-1 pt-1">
                  <button
                    onClick={() => handleReact("like")}
                    className={cn(
                      "py-1.5 rounded flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer",
                      userReacted === "like"
                        ? "text-blue-600 bg-blue-50"
                        : "text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Like</span>
                  </button>

                  <button
                    onClick={() => handleReact("love")}
                    className={cn(
                      "py-1.5 rounded flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer",
                      userReacted === "love"
                        ? "text-red-500 bg-red-50"
                        : "text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Love</span>
                  </button>

                  <button
                    onClick={() => handleReact("care")}
                    className={cn(
                      "py-1.5 rounded flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer",
                      userReacted === "care"
                        ? "text-amber-500 bg-amber-50"
                        : "text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    <span>🥰</span>
                    <span>Care</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Paint Wave Transition into Chapter 6 */}
      <div className="mt-20 w-full">
        <PaintDripDivider color={activeAccent} />
      </div>
    </section>
  );
}
