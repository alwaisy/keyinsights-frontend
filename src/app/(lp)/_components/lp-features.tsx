// components/landing/Features.tsx
"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Clock,
  Download,
  FileText,
  Key,
  Palette,
  Share2,
  Zap,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { StickyScroll } from "~/components/ui/sticky-scroll-reveal";

const features = [
  {
    title: "AI-Powered Extraction",
    description:
      "Our advanced AI doesn't just transcribe—it identifies key concepts, summarizes main points, and organizes information logically.",
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
  },
  {
    title: "Beautiful Reading Experience",
    description:
      "Content is formatted with proper headings, lists, and emphasis—designed for maximum readability and comprehension.",
    icon: <FileText className="h-10 w-10 text-blue-500" />,
  },
  // components/landing/Features.tsx (continued)
  {
    title: "Download & Save",
    description:
      "Export insights as markdown, PDF, or plain text. Save valuable knowledge for future reference.",
    icon: <Download className="h-10 w-10 text-green-500" />,
  },
  {
    title: "Bookmark Important Points",
    description:
      "Highlight and save key insights from any video for your personal knowledge library.",
    icon: <Bookmark className="h-10 w-10 text-red-500" />,
  },
  {
    title: "Easy Sharing",
    description:
      "Share valuable insights with colleagues, classmates, or friends instead of lengthy video links.",
    icon: <Share2 className="h-10 w-10 text-purple-500" />,
  },
  {
    title: "Time-to-Value Metrics",
    description:
      "See exactly how much time you saved by reading instead of watching—quantify your productivity gains.",
    icon: <Clock className="h-10 w-10 text-indigo-500" />,
  },
  {
    title: "Customizable Display",
    description:
      "Adjust text size, contrast, and layout to suit your reading preferences and reduce eye strain.",
    icon: <Palette className="h-10 w-10 text-pink-500" />,
  },
  {
    title: "Key Concept Extraction",
    description:
      "Our AI identifies and highlights the most important concepts, making complex topics easier to understand.",
    icon: <Key className="h-10 w-10 text-orange-500" />,
  },
];

export default function LandingFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 font-medium text-purple-500">
              POWERFUL CAPABILITIES
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Features That Enhance Your Learning
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              Designed for the way your brain works best in 2025—focused,
              efficient, and distraction-free.
            </p>
          </motion.div>
        </div>

        <div className="h-[40rem] w-full">
          <StickyScroll
            content={features.map((feature) => ({
              title: feature.title,
              description: feature.description,
              content: (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 backdrop-blur-sm">
                    {feature.icon}
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
