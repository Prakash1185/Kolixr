"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Describe Your Needs",
    description: "Tell us about your project or desired mood.",
  },
  {
    title: "Generate Palette",
    description: "Let our AI craft a unique, harmonious color set for you.",
  },
  {
    title: "Export & Use",
    description: "Download or copy your palette and start designing.",
  },
];

// Animation Variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const wordAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Homepage = () => {
  const title = "AI Powered Color Palette Generator";

  return (
    <main
      className="space-y-12 bg-[radial-gradient(#0000001a_1px,transparent_1.5px)] [background-size:18px_18px] pb-24"
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 150% 90% at 50% 0%, black 95%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 150% 90% at 50% 0%, black 95%, transparent 105%)",
        maskRepeat: "no-repeat",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="flex flex-col justify-center items-center gap-4 pt-20 px-4 text-center"
      >
        {/* Word-by-word animated heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight flex flex-wrap justify-center">
          {title.split(" ").map((word, idx) => (
            <motion.span key={idx} className="mr-2" variants={wordAnim}>
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-lg md:text-xl text-gray-700 mt-3 sm:leading-8 max-w-sm sm:max-w-xl md:max-w-3xl"
        >
          Instantly generate beautiful, custom color palettes using AI —  Perfect for devs, designers, and curious minds.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 pt-3"
        >
          <Link
            href="/generate"
            className="bg-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md border-2 border-indigo-600 hover:bg-indigo-700 transition-all duration-200 font-medium text-white text-base sm:text-lg"
          >
            Generate Now
          </Link>
        </motion.div>
      </motion.div>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 block"
        >
          How It Works
        </motion.h2>

        <motion.ol
          variants={container}
          className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {steps.map((step, idx) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="flex flex-col items-center bg-white rounded-lg border border-gray-200 shadow-md p-5 sm:p-6 text-center"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                {idx + 1}
              </span>
              <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center border-t border-gray-400/30 pt-6 text-sm text-gray-500 px-4"
      >
        Made with ❤️ by{" "}
        <Link href="/" className="underline hover:text-indigo-600">
          Prakash
        </Link>
      </motion.footer>
    </main>
  );
};

export default Homepage;
