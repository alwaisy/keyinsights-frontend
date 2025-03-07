// components/landing/UseCases.tsx
"use client";

import { motion } from "framer-motion";
import {
  Book,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const useCases = [
  {
    id: "education",
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Education",
    description:
      "Transform lengthy lectures and educational content into concise study materials. Perfect for students and lifelong learners.",
    image: "/use-cases/education.jpg",
    quote:
      "I processed an entire semester of lectures in one weekend. My grades improved from C to A-.",
    author: "Jamie, Computer Science Student",
  },
  {
    id: "professional",
    icon: <Briefcase className="h-6 w-6" />,
    title: "Professional Development",
    description:
      "Stay on top of industry trends and training videos without sacrificing your entire workday.",
    image: "/use-cases/professional.jpg",
    quote:
      "I extract insights from 3 industry keynotes weekly instead of watching one monthly. My team is now ahead of every trend.",
    author: "Michael, Product Manager",
  },
  {
    id: "research",
    icon: <Book className="h-6 w-6" />,
    title: "Research",
    description:
      "Quickly extract key information from interviews, presentations, and research discussions.",
    image: "/use-cases/research.jpg",
    quote:
      "I can process 5x more research content by extracting insights rather than watching full videos.",
    author: "Dr. Sophia Chen, Researcher",
  },
  {
    id: "personal",
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Personal Growth",
    description:
      "Consume self-improvement content efficiently. Get the wisdom without the fluff.",
    image: "/use-cases/personal.jpg",
    quote:
      "I've read insights from 50+ self-improvement videos this year. It's like having a personal development library.",
    author: "Alex, Self-improvement Enthusiast",
  },
  {
    id: "news",
    icon: <Newspaper className="h-6 w-6" />,
    title: "News & Updates",
    description:
      "Stay informed without the time commitment of watching lengthy news videos and analyses.",
    image: "/use-cases/news.jpg",
    quote:
      "I stay informed on global events in 15 minutes a day instead of hours of video news.",
    author: "Elena, Busy Professional",
  },
];

export default function LandingUseCases() {
  const [activeTab, setActiveTab] = useState("education");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-gradient-to-b from-zinc-950 to-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 font-medium text-purple-500">WHO CAN BENEFIT</p>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Knowledge Extraction for Everyone
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              No matter what you&apos;re learning or who you are, YouTube
              Insights helps you extract knowledge more efficiently.
            </p>
          </motion.div>
        </div>

        <Tabs
          defaultValue="education"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-12 grid w-full grid-cols-2 gap-2 bg-transparent md:grid-cols-5">
            {useCases.map((useCase) => (
              <TabsTrigger
                key={useCase.id}
                value={useCase.id}
                className={`flex items-center gap-2 rounded-lg border border-transparent px-4 py-3 text-zinc-400 transition-all data-[state=active]:border-purple-500/20 data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-400`}
              >
                {useCase.icon}
                <span className="hidden md:inline">{useCase.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {useCases.map((useCase) => (
            <TabsContent key={useCase.id} value={useCase.id} className="mt-0">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1">
                  <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                    {useCase.title}
                  </h3>
                  <p className="mb-6 text-lg text-zinc-400">
                    {useCase.description}
                  </p>

                  <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
                    <p className="mb-4 italic text-zinc-300">
                      &quot;{useCase.quote}&quot;
                    </p>
                    <p className="text-sm text-zinc-500">— {useCase.author}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-75 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="aspect-w-16 aspect-h-9 w-full">
                        <Image
                          src={useCase.image}
                          alt={useCase.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={useCase.id === "education"} // Load the first image with priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
