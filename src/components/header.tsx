// components/Header.tsx
"use client";

import { SparklesCore } from "~/components/ui/sparkles";

export default function Header() {
  return (
    <div className="mb-12 flex flex-col items-center justify-center">
      <div className="relative h-[40px] w-[400px]">
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
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        YouTube Insights
      </h1>
      <p className="max-w-xl text-center text-gray-400">
        Extract key insights and summaries from any YouTube video using AI
      </p>
    </div>
  );
}
