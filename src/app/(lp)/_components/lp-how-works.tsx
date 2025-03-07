// components/landing/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { cn } from "~/lib/utils";

const steps = [
  {
    number: "01",
    title: "Paste Any YouTube URL",
    description:
      "Simply copy and paste the URL of any YouTube video you want to extract insights from.",
    color: "from-purple-500 to-indigo-500",
    image: "/step1.png",
  },
  {
    number: "02",
    title: "AI Processes the Content",
    description:
      "Our advanced AI analyzes the video, extracts the key points, and organizes them into readable insights.",
    color: "from-blue-500 to-cyan-500",
    image: "/step2.png",
  },
  {
    number: "03",
    title: "Read & Save Your Insights",
    description:
      "Get a well-structured summary with all the important information, ready to read, copy, or download.",
    color: "from-green-500 to-emerald-500",
    image: "/step3.png",
  },
];

export default function HowItWorks() {
  // Create individual refs for each step
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Array of refs and inView states
  const stepVisibility = [
    { ref: ref1, inView: inView1 },
    { ref: ref2, inView: inView2 },
    { ref: ref3, inView: inView3 },
  ];

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-20 text-center">
          <p className="mb-2 font-medium text-purple-500">
            SIMPLE 3-STEP PROCESS
          </p>
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Knowledge Extraction, Simplified
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-zinc-400">
            No more scrubbing through videos or taking notes. Our AI does the
            heavy lifting so you can focus on what matters.
          </p>
        </div>

        <div className="space-y-20 md:space-y-24">
          {steps.map((step, index) => (
            <StepItem
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for each step
function StepItem({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-8 md:flex-row md:gap-16",
        index % 2 === 1 ? "md:flex-row-reverse" : "",
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={
          inView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <div className="relative">
          <div
            className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${step.color} opacity-75 blur-xl`}
          ></div>
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="relative h-[240px] w-full md:h-[320px]">
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        animate={
          inView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }
        }
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-xl flex-1"
      >
        <div
          className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 ${step.color} mb-4 bg-opacity-10 text-sm font-medium text-white`}
        >
          {step.number}
        </div>
        <h3 className="mb-4 text-2xl font-bold md:text-3xl">{step.title}</h3>
        <p className="mb-6 text-lg text-zinc-400">{step.description}</p>

        {index < steps.length - 1 && (
          <div className="hidden md:block">
            <ArrowRight
              className={`text-gradient-to-r h-8 w-8 ${step.color}`}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
