// components/ui/sparkles.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

// Define the Particle class outside the useEffect
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacityChange: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  color: string;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    minSize: number,
    maxSize: number,
    color: string,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = color;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (maxSize - minSize) + minSize;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random();
    this.opacityChange = Math.random() * 0.01 - 0.005;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > this.canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY = -this.speedY;

    this.opacity += this.opacityChange;
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.opacityChange = -this.opacityChange;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export function SparklesCore({
  id,
  className,
  background,
  minSize = 0.5,
  maxSize = 1.5,
  particleDensity = 50,
  particleColor = "#FFF",
}: {
  id: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = particleDensity;

    // Initialize particles
    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle(canvas, ctx, minSize, maxSize, particleColor),
        );
      }
    };

    // Animation loop
    let animationFrameId: number;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
    setLoaded(true);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [background, maxSize, minSize, particleColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn(
        "opacity-0 transition-opacity duration-1000",
        loaded && "opacity-100",
        className,
      )}
    />
  );
}
