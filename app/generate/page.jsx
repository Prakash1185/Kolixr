"use client";

import React, { useRef, useState } from "react";
import InputForm from "@/components/input-form";
import ShowResults from "@/components/show-results";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Generate = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const handleGenerate = async (formData) => {
    setLoading(true);

    const paletteSize = formData.paletteSize || 5;
    const prompt = `You are an expert UI/brand color designer. Your task is to generate 6 distinct and usable color palettes for a design system.

🎨 Each palette must:
- Contain exactly ${paletteSize} HEX color codes.
- Follow this strict role pattern:
  1. Primary Color
  2. Secondary Color
  3. Accent Color
  4. Background Color
  5. Text Color

🧠 Design Brief:
- Project Description: ${
      formData.description || "A modern, user-friendly digital product"
    }
- Primary Color Hint: ${formData.primaryColor || "Any"}
- Secondary Color Hint: ${formData.secondaryColor || "Any"}
- Color Preference: ${formData.colorPreference || "None"}
- Tone: ${formData.tone || "Neutral"}
- Background Mode: ${formData.background || "Light"}
- Usage: ${formData.usage || "General design and UI"}
- Target Audience: ${formData.audience || "General users"}
- Visual Inspiration: ${formData.inspiration || "None"}

🧪 Constraints:
- Each palette should contain clearly different colors in terms of hue and usage.
- Avoid using shades of the same color (e.g., don't make all five colors different tints of blue).
- Respect any provided hints, but build cohesive, accessible combinations.
- Ensure high readability — background and text colors must contrast well.
- Use color theory to make the palette harmonious but useful for real UI/branding work.

📦 Output Format:
Only return an array of 6 palettes. Each palette must be in this exact order:
["#Primary", "#Secondary", "#Accent", "#Background", "#Text"]

🚫 Do not include any extra text, labels, or comments — only a raw JSON array of arrays.`;

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // console.log(text);
      const extracted = text
        .match(/\[[^\]]+\]/g)
        .map((str) =>
          str
            .replace(/\[|\]|"|'/g, "")
            .split(",")
            .map((c) => c.trim())
        )
        .filter((arr) => Array.isArray(arr) && arr.length > 0)
        .slice(0, 6);

      if (extracted.length === 0) {
        toast.error("Something went wrong!");
      } else {
        setPalettes(extracted);
        // toast.success("Generated color palettes successfully!");
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } catch (err) {
      //   console.error(err);
      toast.error("Failed to generate palettes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 sm:px-10 md:px-20 pb-20">
      <h1 className="text-3xl font-semibold text-center py-8 pb-0">
        Instantly Generate Color Palettes With AI
      </h1>

      <InputForm onGenerate={handleGenerate} loading={loading} />

      {palettes.length > 0 && (
        <div ref={resultsRef} className="grid grid-cols-1 gap-6 mt-8">
          {palettes.map((colors, index) => (
            <ShowResults key={index} colors={colors} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Generate;
