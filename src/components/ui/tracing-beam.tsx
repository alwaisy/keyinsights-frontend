// components/ui/tracing-beam.tsx
"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      <div className="absolute -left-4 top-3 md:left-10">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeOpacity="0.3"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            style={{ pathLength: scrollYProgress }}
          />
          <defs>
            <linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={0}
              y2={svgHeight}
            >
              <stop stopColor="#8B5CF6" stopOpacity="0" offset="0" />
              <stop stopColor="#8B5CF6" offset="0.2" />
              <stop stopColor="#6366F1" offset="0.8" />
              <stop stopColor="#6366F1" stopOpacity="0" offset="1" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute left-0 h-2 w-2 rounded-full bg-purple-500"
          style={{ top: y1 }}
        />
      </div>
      <div ref={contentRef} className="ml-4 md:ml-24">
        {children}
      </div>
    </motion.div>
  );
};
