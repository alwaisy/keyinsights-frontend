// components/ui/text-generate-effect.tsx
"use client";

import { useEffect, useState } from "react";

export function TextGenerateEffect({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) {
  const [renderedText, setRenderedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (currentIndex < words.length && isGenerating) {
      const timeout = setTimeout(() => {
        setRenderedText((prev) => prev + words[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // Adjust speed as needed

      return () => clearTimeout(timeout);
    } else {
      setIsGenerating(false);
    }
  }, [currentIndex, words, isGenerating]);

  return (
    <span
      className={`bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent ${className}`}
    >
      {renderedText}
      {isGenerating && <span className="ml-1 animate-pulse">|</span>}
    </span>
  );
}
