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
    <form className="pt-5 max-w-6xl mx-auto space-y-6 px-4 sm:px-6" onSubmit={handleSubmit}>
      {/* Project Description */}
      <div>
        <Label className="block mb-1 text-base font-medium">Project Description</Label>
        <Textarea
          required
          name="description"
          placeholder="Describe about your project. e.g. A modern SaaS dashboard for startups. Needs sleek, professional UI with a dark theme and vibrant accents."
          className="min-h-36 sm:min-h-24 sm:max-h-28 text-sm"
        />
      </div>

      {/* Primary, Secondary & Color Preference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 ">
        <div className="w-full">
          <Label className="block mb-1">Primary Color</Label>
          <Input name="primaryColor" type="text" placeholder="#4F46E5 or Indigo"  className={"text-sm"}/>
        </div>
        <div className="w-full">
          <Label className="block mb-1">Secondary Color</Label>
          <Input name="secondaryColor" type="text" placeholder=" #F43F5E or Rose"  className={"text-sm"}/>
        </div>
        <div className="w-full">
          <Label className="block mb-1">Color Preference Keywords</Label>
          <Input
            name="colorPreference"
            type="text"
            placeholder="e.g. pastel, neon, muted" className={"text-sm"}
          />
        </div>
      </div>

      {/* Select Inputs Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
        <div className="w-full">
          <Label className="block mb-1">Tone</Label>
          <Select name="tone">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {["Calm", "Bold", "Neutral", "Vibrant", "Luxurious"].map((tone) => (
                <SelectItem key={tone} value={tone.toLowerCase()}>
                  {tone}
                </SelectItem>
              ))}
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
              {[3, 4, 5, 6].map((num) => (
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

      {/* Select Inputs Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
        <div className="w-full">
          <Label className="block mb-1">Usage Context</Label>
          <Select name="usage">
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select usage" />
            </SelectTrigger>
            <SelectContent>
              {["App", "Website", "Print", "Graphics", "Presentation"].map((use) => (
                <SelectItem key={use} value={use.toLowerCase()}>
                  {use}
                </SelectItem>
              ))}
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
            placeholder="Nature, Dreamy, etc"
            className={"text-sm"}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full text-lg bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer"
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
