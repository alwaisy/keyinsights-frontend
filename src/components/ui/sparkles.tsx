// components/ui/sparkles.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export function SparklesCore({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
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
      if (canvas?.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = particleDensity ?? 50;
    const minSizeValue = minSize ?? 0.5;
    const maxSizeValue = maxSize ?? 1.5;
    const bgColor = background ?? "#000";
    const pColor = particleColor ?? "#FFF";

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityChange: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size =
          Math.random() * (maxSizeValue - minSizeValue) + minSizeValue;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
        this.opacityChange = Math.random() * 0.01 - 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        this.opacity += this.opacityChange;
        if (this.opacity <= 0 || this.opacity >= 1) {
          this.opacityChange = -this.opacityChange;
        }
      }

      draw() {
        ctx.fillStyle = pColor;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
    setLoaded(true);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
