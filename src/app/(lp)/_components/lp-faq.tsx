// components/landing/FAQ.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
  {
    question: "How accurate are the extracted insights?",
    answer:
      "Our AI is trained to identify key concepts and important information with high accuracy. While it's not perfect, users report that it captures 90-95% of the essential content from videos, making it highly effective for knowledge extraction.",
  },
  {
    question: "Does this work with all YouTube videos?",
    answer:
      "Yes, YouTube Insights works with any publicly available YouTube video. However, the quality of insights may vary depending on the video's audio clarity, speaking pace, and content structure. Technical content, educational videos, and presentations typically yield the best results.",
  },
  {
    question: "How long does it take to process a video?",
    answer:
      "Processing time depends on the video length. A 10-minute video typically takes 30-60 seconds to process, while a 1-hour video might take 3-5 minutes. You'll see real-time progress updates while your insights are being generated.",
  },
  {
    question: "Is there a limit to how many videos I can process?",
    answer:
      "The free version allows processing of up to 10 videos per day with a maximum length of 30 minutes each. For higher limits and additional features, we offer premium plans designed for researchers, educators, and power users.",
  },
  {
    question: "Can I save the insights for later reference?",
    answer:
      "Absolutely! You can download insights as markdown, plain text, or PDF. You can also copy the content directly to your notes or other applications. Premium users get access to a personal library where insights are automatically saved.",
  },
  {
    question: "Does this replace watching videos entirely?",
    answer:
      "YouTube Insights is designed to help you extract knowledge efficiently, but there may still be value in watching certain videos, especially for visual demonstrations or emotional content. Our tool works best as a complement to your learning strategy, helping you decide which videos are worth your full attention and which can be consumed as text.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Currently, YouTube Insights supports English, Spanish, French, German, and Japanese. We're actively working on adding more languages to make knowledge extraction accessible to a global audience.",
  },
];

export default function LandingFAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div ref={ref} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 font-medium text-purple-500">
              QUESTIONS & ANSWERS
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-zinc-400">
              Everything you need to know about extracting insights from YouTube
              videos.
            </p>
          </motion.div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-zinc-800 py-2"
            >
              <AccordionTrigger className="text-left text-lg font-medium transition-colors hover:text-purple-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-zinc-500">
            Have more questions?{" "}
            <a
              href="#"
              className="text-purple-400 underline hover:text-purple-300"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
