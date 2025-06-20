"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Copy, Check, Download, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Hex → RGB
const hexToRgb = (hex) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

// Hex → HSL
const hexToHsl = (hex) => {
  const sanitized = hex.replace("#", "");
  const r = parseInt(sanitized.substring(0, 2), 16) / 255;
  const g = parseInt(sanitized.substring(2, 4), 16) / 255;
  const b = parseInt(sanitized.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
};

const ShowResults = ({ colors }) => {
  const [activeCodeType, setActiveCodeType] = useState("hex");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const paletteRef = useRef(null);

  const formatColor = (hex) => {
    if (activeCodeType === "rgb") return hexToRgb(hex);
    if (activeCodeType === "hsl") return hexToHsl(hex);
    return hex;
  };

  const copyColor = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Color copied!", { description: text });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const savePalette = () => {
    const data = colors.map(formatColor).join("\n");
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "color-palette.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("Palette saved");
  };

  return (
    <section
      className={`py-4 px-3 max-w-full mx-auto rounded-md shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-black border border-gray-700" : "bg-white border"
      }`}
    >
      {/* Top controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div className="inline-flex gap-1 items-center border rounded-md bg-background px-1 py-1">
          {["hex", "rgb", "hsl"].map((type) => (
            <Button
              key={type}
              variant={activeCodeType === type ? "default" : "ghost"}
              onClick={() => setActiveCodeType(type)}
              className="text-xs px-3"
            >
              {type.toUpperCase()}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={savePalette}>
            <Download className="w-4 h-4" />
          </Button>

          {/* Toggle dark mode button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <SunMoon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Palette Colors */}
      <div
        ref={paletteRef}
        className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar"
      >
        {colors.map((hex, i) => (
          <div
            key={i}
            className={`relative flex flex-col min-w-[140px] h-64 rounded-md overflow-hidden  ${
              darkMode ? "bg-neutral-900" : "bg-white"
            } shadow group hover:shadow-md transition cursor-pointer`}
            onClick={() => copyColor(formatColor(hex), i)}
          >
            {/* Color Block */}
            <div className="flex-1" style={{ backgroundColor: hex }} />

            {/* Copy icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white rounded-full p-1.5 shadow">
                {copiedIndex === i ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-800" />
                )}
              </div>
            </div>

            {/* Color Info */}
            <div
              className={`text-center px-2 py-2 ${
                darkMode ? "bg-neutral-800 text-white" : "bg-gray-50 text-gray-800"
              }`}
            >
              <p
                className={`text-[10px] uppercase tracking-widest ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activeCodeType}
              </p>
              <p className="text-sm font-medium break-words">{formatColor(hex)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowResults;
