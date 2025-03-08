// components/landing/Hero.tsx
"use client";

import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { SparklesCore } from "~/components/ui/sparkles";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";

export default function LandingHero() {
  const [videoUrl, setVideoUrl] = useState("");

  const heroTitle = "Turn Hours of Video into Minutes of Insight";
  const heroSubtitle =
    "In 2025, we don't have time to watch—we need time to know. Extract the essence of any YouTube video instantly with AI.";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      <BackgroundBeams className="opacity-20" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="relative h-[40px] w-full">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
          <TextGenerateEffect words={heroTitle} />
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400 md:text-xl">
          {heroSubtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* <div className="relative w-full max-w-md flex-1">
            <Input
              placeholder="Paste YouTube URL here..."
              className="w-full rounded-lg border-zinc-800 bg-zinc-900/80 px-4 py-6 text-white"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ArrowRight className="h-5 w-5 text-purple-500" />
            </div>
          </div> */}

          <Link
            href={
              videoUrl ? `/app?url=${encodeURIComponent(videoUrl)}` : "/app"
            }
          >
            <Button
              size="lg"
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 font-medium text-white hover:from-purple-700 hover:to-indigo-700 sm:w-auto"
            >
              Extract Insights
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="link"
            className="flex items-center gap-2 text-zinc-400"
          >
            <PlayCircle size={20} />
            See how it works
          </Button>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <div className="p-1">
              <video
                className="w-full rounded-lg shadow-2xl"
                autoPlay
                muted
                loop
                poster="/demo-poster.png"
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 transform space-x-12 text-zinc-600">
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-zinc-800"></div>
          <p className="text-sm">No account needed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-zinc-800"></div>
          <p className="text-sm">Instant results</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-zinc-800"></div>
          <p className="text-sm">AI-powered</p>
        </div>
      </div>
    </div>
  );
}
