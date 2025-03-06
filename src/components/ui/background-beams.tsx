// components/ui/background-beams.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

// Define the Beam class outside the useEffect
class Beam {
  x: number;
  y: number;
  height: number;
  width: number;
  speed: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  context: CanvasRenderingContext2D;

  constructor(
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = 0;
    this.height = Math.random() * canvasHeight + 200;
    this.width = Math.random() * 4 + 2;
    this.speed = Math.random() * 1 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  draw() {
    this.context.beginPath();
    const gradient = this.context.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.height,
    );
    gradient.addColorStop(0, `rgba(103, 103, 255, ${this.opacity})`);
    gradient.addColorStop(1, "rgba(103, 103, 255, 0)");
    this.context.fillStyle = gradient;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
    if (this.y > this.canvasHeight) {
      this.y = -this.height;
      this.x = Math.random() * this.canvasWidth;
    }
    this.draw();
  }
}

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

    // Initialize beams
    for (let i = 0; i < numberOfBeams; i++) {
      beams.push(new Beam(context, canvas.width, canvas.height));
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
