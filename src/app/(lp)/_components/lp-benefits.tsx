// components/landing/Benefits.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HoverEffect } from "~/components/ui/card-hover-effect";

const benefits = [
  {
    title: "Save 83% of Your Time",
    description:
      "A 30-minute video becomes a 5-minute read. Process information at your own pace.",
    icon: "/icons/time.svg",
  },
  {
    title: "Focus on What Matters",
    description:
      "No more distractions, ads, or tangents. Just the core insights you need.",
    icon: "/icons/focus.svg",
  },
  {
    title: "Better Knowledge Retention",
    description:
      "Reading improves retention by 65% compared to passive video watching.",
    icon: "/icons/brain.svg",
  },
  {
    title: "Extend Battery Life",
    description:
      "Reading text uses 5x less battery than streaming video. Stay productive longer.",
    icon: "/icons/battery.svg",
  },
  {
    title: "Reduce Eye Strain",
    description:
      "Properly formatted text with customizable display reduces digital eye strain.",
    icon: "/icons/eye.svg",
  },
  {
    title: "Share Knowledge Efficiently",
    description:
      "Easily share text insights instead of lengthy video links. Respect others' time.",
    icon: "/icons/share.svg",
  },
];

export default function LandingBenefits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 font-medium text-purple-500">
              WHY CHOOSE YOUTUBE INSIGHTS
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              The Future of Content Consumption
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              In 2025, the most valuable resource isn&apos;t content—it&apos;s
              attention. Here&apos;s how we help you reclaim yours.
            </p>
          </motion.div>
        </div>

        <HoverEffect
          items={benefits.map((benefit) => ({
            title: benefit.title,
            description: benefit.description,
            icon: benefit.icon,
          }))}
        />
      </div>
    </section>
  );
}
