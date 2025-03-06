// components/ui/background-beams.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  const [opacity, setOpacity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Handle window resize
    window.addEventListener("resize", setCanvasSize);

    // Animation variables
    let animationFrameId: number;
    const beams: Beam[] = [];
    const numberOfBeams = 20;

    // Beam class
    class Beam {
      x: number;
      y: number;
      height: number;
      width: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.height = Math.random() * canvas.height + 200;
        this.width = Math.random() * 4 + 2;
        this.speed = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      draw() {
        context.beginPath();
        const gradient = context.createLinearGradient(
          this.x,
          this.y,
          this.x,
          this.y + this.height,
        );
        gradient.addColorStop(0, `rgba(103, 103, 255, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(103, 103, 255, 0)");
        context.fillStyle = gradient;
        context.fillRect(this.x, this.y, this.width, this.height);
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -this.height;
          this.x = Math.random() * canvas.width;
        }
        this.draw();
      }
    }

    // Initialize beams
    for (let i = 0; i < numberOfBeams; i++) {
      beams.push(new Beam());
    }

    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      beams.forEach((beam) => beam.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    setOpacity(1);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "duration-[1500ms] opacity-0 transition-opacity ease-in",
        { "opacity-100": opacity === 1 },
        className,
      )}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
}
