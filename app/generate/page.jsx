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

    const paletteSize = Number(formData.paletteSize) || 5;

    // Dynamic role names for the palette items
    const roles = [
      "Primary Color",
      "Secondary Color",
      "Accent Color",
      "Background Color",
      "Text Color",
    ].slice(0, paletteSize);

    const rolePattern = roles
      .map((role, idx) => `  ${idx + 1}. ${role}`)
      .join("\n");

    const prompt = `You are an expert UI/brand color designer. Your task is to generate 6 distinct and usable color palettes for a design system.

🎨 Each palette must:
- Contain exactly ${paletteSize} HEX color codes.
- Follow this strict role pattern:
${rolePattern}

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
- Ensure high readability — background and text colors must contrast well.

📦 Output Format:
Only return an array of 6 palettes. Each palette must contain exactly ${paletteSize} HEX codes, in the correct order.
Example (for ${paletteSize} colors):
["#FF0000", "#00FF00", "#0000FF", ...]

Strictly follow the given palette size and do not add extra color values. Respond only with valid JSON.

🚫 Do not include any extra text — only raw JSON array of arrays.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok || !data.text) {
        throw new Error("API Error");
      }

      const rawPalettes = data.text.match(/\[[^\]]+\]/g) || [];

      const extracted = rawPalettes
        .map((str) =>
          str
            .replace(/\[|\]|"|'/g, "")
            .split(",")
            .map((c) => c.trim())
        )
        .filter((arr) => arr.length === paletteSize)
        .slice(0, 6); // only keep 6 palettes max

      if (extracted.length === 0) {
        toast.error("No palettes found.");
      } else {
        setPalettes(extracted);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } catch (err) {
      console.error("Client Error:", err);
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
