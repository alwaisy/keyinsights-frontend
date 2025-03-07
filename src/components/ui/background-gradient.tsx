// components/ui/background-gradient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setPosition({ x, y });
  };

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex justify-center overflow-hidden rounded-lg",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 z-10 h-full w-full bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-500 opacity-0 transition-opacity duration-500",
          { "opacity-100": opacity === 1 },
        )}
        style={{
          background: animate
            ? `radial-gradient(circle at ${position.x * 100}% ${position.y * 100}%, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 40%, rgba(79, 70, 229, 0) 80%)`
            : "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 40%, rgba(79, 70, 229, 0) 80%)",
        }}
      />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};
