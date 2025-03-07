// components/landing/CallToAction.tsx
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function LandingCTA() {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <section className="bg-gradient-to-b from-black to-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <BackgroundGradient className="rounded-2xl p-[1px]">
          <div className="rounded-2xl bg-zinc-950 p-8 text-center md:p-12 lg:p-16">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Stop Watching. Start Knowing.
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-xl text-zinc-400">
              The average person will watch 8 years of video in their lifetime.
              How much of that time could you reclaim with YouTube Insights?
            </p>

            <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Input
                  placeholder="Paste YouTube URL here..."
                  className="w-full rounded-lg border-zinc-800 bg-zinc-900/80 px-4 py-6 text-white"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <ArrowRight className="h-5 w-5 text-purple-500" />
                </div>
              </div>

              <Link
                href={
                  videoUrl
                    ? `/insights?url=${encodeURIComponent(videoUrl)}`
                    : "/insights"
                }
              >
                <Button
                  size="lg"
                  className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 font-medium text-white hover:from-purple-700 hover:to-indigo-700 sm:w-auto"
                >
                  Extract Insights Now
                </Button>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 text-sm text-zinc-500 md:flex-row">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>No account required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Works with any YouTube video</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Free to use</span>
              </div>
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  );
}
