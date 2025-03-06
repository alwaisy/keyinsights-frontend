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
        YouTube to Text Converter
      </h1>
      <p className="max-w-xl text-center text-gray-400">
        Convert any YouTube video to text with markdown formatting. Just paste
        the URL or video ID below.
      </p>
    </div>
  );
}
