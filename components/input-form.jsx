"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const InputForm = ({ onGenerate, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const formData = {
      description: form.get("description"),
      primaryColor: form.get("primaryColor"),
      secondaryColor: form.get("secondaryColor"),
      colorPreference: form.get("colorPreference"),
      tone: form.get("tone"),
      paletteSize: form.get("paletteSize"),
      background: form.get("background"),
      usage: form.get("usage"),
      audience: form.get("audience"),
      inspiration: form.get("inspiration"), 
    };

    onGenerate(formData);
  };

  return (
    <form className="pt-5 max-w-6xl mx-auto space-y-6" onSubmit={handleSubmit}>
      {/* Project Description */}
      <div>
        <Label className="block mb-1 text-base font-medium">
          Project Description 
        </Label>
        <Textarea
          required
          name="description"
          placeholder="Briefly describe your project..."
          className="min-h-20 max-h-28"
        />
      </div>

      {/* Primary, Secondary & Preference */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full">
          <Label className="block mb-1">Primary Color</Label>
          <Input name="primaryColor" type="text" placeholder="#FFDE21, Red, etc." />
        </div>
        <div className="w-full">
          <Label className="block mb-1">Secondary Color</Label>
          <Input name="secondaryColor" type="text" placeholder="#000000, Gray, etc." />
        </div>
        <div className="w-full">
          <Label className="block mb-1">Color Preference Keywords</Label>
          <Input
            name="colorPreference"
            type="text"
            placeholder="e.g., pastel, neon, earthy..."
          />
        </div>
      </div>

      {/* Select Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="w-full">
          <Label className="block mb-1">Tone</Label>
          <Select name="tone">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {["Calm", "Bold", "Neutral", "Vibrant", "Luxurious"].map(
                (tone) => (
                  <SelectItem key={tone} value={tone.toLowerCase()}>
                    {tone}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label className="block mb-1">Palette Size</Label>
          <Select name="paletteSize">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Choose number" />
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label className="block mb-1">Background Mode</Label>
          <Select name="background">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select background" />
            </SelectTrigger>
            <SelectContent>
              {["Light", "Dark", "Gradient", "Textured"].map((bg) => (
                <SelectItem key={bg} value={bg.toLowerCase()}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Usage, Audience, Inspiration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full">
          <Label className="block mb-1">Usage Context</Label>
          <Select name="usage">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select usage" />
            </SelectTrigger>
            <SelectContent>
              {["App", "Website", "Print", "Graphics", "Presentation"].map(
                (use) => (
                  <SelectItem key={use} value={use.toLowerCase()}>
                    {use}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label className="block mb-1">Target Audience</Label>
          <Select name="audience">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              {["Kids", "Youth", "Professional", "Everyone"].map((aud) => (
                <SelectItem key={aud} value={aud.toLowerCase()}>
                  {aud}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label className="block mb-1">Design Inspiration Source</Label>
          <Input
            name="inspiration"
            type="text"
            placeholder="e.g., Nature, Netflix UI, Vintage posters..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full text-lg bg-indigo-600 hover:bg-indigo-700 transition-all"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" /> Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
    </form>
  );
};

export default InputForm;
