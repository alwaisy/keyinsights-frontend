// components/landing/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "I used to spend hours watching YouTube videos for research. Now I extract the key points in minutes. It's completely transformed my workflow.",
    name: "Sarah Johnson",
    title: "PhD Researcher",
    image: "/testimonials/person1.jpg",
  },
  {
    quote:
      "As someone with ADHD, sitting through long videos is a struggle. YouTube Insights lets me consume the content in a format that works for my brain.",
    name: "Marcus Chen",
    title: "Software Engineer",
    image: "/testimonials/person2.jpg",
  },
  {
    quote:
      "I've saved approximately 15 hours a week since I started using this tool. The ROI is incredible for busy professionals.",
    name: "Priya Patel",
    title: "Marketing Director",
    image: "/testimonials/person3.jpg",
  },
  {
    quote:
      "My students use this to process lecture content, and their comprehension has improved dramatically. It's a game-changer for education.",
    name: "Dr. James Wilson",
    title: "University Professor",
    image: "/testimonials/person4.jpg",
  },
  {
    quote:
      "I can finally keep up with industry trends without spending my entire evening watching videos. This tool gives me my life back.",
    name: "Emma Rodriguez",
    title: "UX Designer",
    image: "/testimonials/person5.jpg",
  },
  {
    quote:
      "The quality of the insights is remarkable. It captures nuances I wouldn't have expected from an AI tool. Genuinely impressed.",
    name: "David Kim",
    title: "Content Creator",
    image: "/testimonials/person6.jpg",
  },
];

export default function LandingTestimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="overflow-hidden bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 font-medium text-purple-500">
              WHAT PEOPLE ARE SAYING
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              From Time-Starved to Time-Saved
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              Join thousands who&apos;ve reclaimed their time and transformed
              how they consume content.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <InfiniteMovingCards
            items={testimonials.map((testimonial) => ({
              quote: testimonial.quote,
              name: testimonial.name,
              title: testimonial.title,
              image: testimonial.image,
            }))}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
