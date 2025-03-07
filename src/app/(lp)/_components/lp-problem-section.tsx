// components/landing/ProblemSection.tsx
"use client";

import { motion } from "framer-motion";
import { BatteryLow, Brain, Clock, Eye } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { TracingBeam } from "~/components/ui/tracing-beam";

export default function LandingProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-gradient-to-b from-black to-zinc-950 py-24">
      <TracingBeam className="px-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              The Content Crisis of 2025
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              We&apos;re drowning in video content but starving for actual
              knowledge. The average person now scrolls through{" "}
              <span className="text-purple-400">7 hours</span> of video daily,
              yet retains less than <span className="text-purple-400">20%</span>{" "}
              of what they watch.
            </p>
          </div>

          <div
            ref={ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <Clock className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Time Wasted</h3>
              <p className="text-zinc-400">
                The average 15-minute video contains just 3 minutes of valuable
                content. You&apos;re watching 12 minutes of filler.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                <BatteryLow className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Energy Drained</h3>
              <p className="text-zinc-400">
                Video streaming consumes 5x more battery and bandwidth than
                reading text. Your devices are dying faster.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Eye className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Eye Strain</h3>
              <p className="text-zinc-400">
                Constant video consumption increases eye strain by 40%. Reading
                properly formatted text reduces this by 60%.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <Brain className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Poor Retention</h3>
              <p className="text-zinc-400">
                Studies show we retain 65% more information from reading than
                from passive video watching.
              </p>
            </motion.div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="mb-6 text-2xl font-bold md:text-3xl">
              It&apos;s not your fault. It&apos;s how we consume content now.
            </h3>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              In a world of endless content, the most valuable skill isn&apos;t
              watching more—it&apos;s extracting what matters.
            </p>
          </div>
        </div>
      </TracingBeam>
    </section>
  );
}
