// components/ui/infinite-moving-cards.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [duration, setDuration] = useState(50);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    if (speed === "slow") {
      setDuration(80);
    } else if (speed === "fast") {
      setDuration(30);
    } else {
      setDuration(50);
    }
  }, [speed]);

  return (
    // components/ui/infinite-moving-cards.tsx (continued)
    <div className="relative overflow-hidden" ref={containerRef}>
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x:
            direction === "left"
              ? [-containerWidth / 2, containerWidth / 2]
              : [containerWidth / 2, -containerWidth / 2],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="w-[350px] flex-shrink-0 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm md:w-[450px]"
          >
            <div className="mb-4 flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-zinc-500">{item.title}</p>
              </div>
            </div>
            <p className="italic text-zinc-300">&quot;{item.quote}&quot;</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
