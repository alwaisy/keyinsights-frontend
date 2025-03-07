// components/ui/sticky-scroll-reveal.tsx
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
}

export function StickyScroll({ content }: StickyScrollProps) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const cardLength = content.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const scrollPosition = -top;
      const cardHeight = height / cardLength;
      const activeCardIndex = Math.min(
        Math.max(Math.floor(scrollPosition / cardHeight), 0),
        cardLength - 1,
      );
      setActiveCard(activeCardIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardLength]);

  return (
    <motion.div
      ref={ref}
      className="relative flex h-[40rem] items-start overflow-hidden"
    >
      <div className="sticky top-0 flex h-full w-full items-center justify-center">
        <motion.div
          className="absolute h-60 w-60 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="grid w-full max-w-5xl grid-cols-1 gap-10 px-4 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            {content.map((item, idx) => (
              <motion.div
                key={idx}
                className={`rounded-xl p-6 ${
                  activeCard === idx
                    ? "border border-zinc-700 bg-zinc-800/50"
                    : "border border-zinc-800/30 bg-zinc-900/20"
                }`}
                animate={{
                  opacity: activeCard === idx ? 1 : 0.5,
                  scale: activeCard === idx ? 1 : 0.95,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            {content[activeCard]?.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
