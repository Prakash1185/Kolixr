"use client";

import Link from "next/link";
import React from "react";

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

const Homepage = () => {
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
      <div className="flex flex-col justify-center items-center gap-4 pt-20 px-4 text-center">
        <h1 className="text-5xl tracking-tighter sm:tracking-tight md:text-6xl font-bold">
          AI Powered Color Palette Generator
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-gray-700 mt-3 sm:leading-8 max-w-sm sm:max-w-xl md:max-w-3xl">
          Instantly generate beautiful, custom color palettes using AI — no
          design skills needed. Perfect for devs, designers, and curious minds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <Link
            href="/generate"
            className="bg-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md border-2 border-indigo-600 hover:bg-indigo-700 transition-all duration-200 font-medium text-white text-base sm:text-lg"
          >
            Generate Now
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 block">
          How It Works
        </h2>
        <ol className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, idx) => (
            <li
              key={step.title}
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
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer className="text-center border-t border-gray-400/30 pt-6 text-sm text-gray-500 px-4">
        Made with ❤️ by{" "}
        <Link href="/" className="underline hover:text-indigo-600">
          Prakash
        </Link>
      </footer>
    </main>
  );
};

export default Homepage;
