// components/ui/card-hover-effect.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function HoverEffect({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: string;
  }[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 blur transition duration-300 group-hover:opacity-75"></div>
          <motion.div
            className="relative flex h-full flex-col rounded-lg bg-zinc-900 p-8"
            initial={{ borderRadius: "0.5rem" }}
            animate={{
              borderRadius: hoveredIndex === idx ? "1rem" : "0.5rem",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
              <Image
                src={item.icon}
                alt={item.title}
                width={28}
                height={28}
                className="text-purple-500"
              />
            </div>
            <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
            <p className="flex-grow text-zinc-400">{item.description}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
