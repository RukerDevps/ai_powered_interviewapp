"use client";

import { useState } from "react";
import { Check, Sun, Moon, Laptop, ChevronDown, Columns, Type, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const layoutOptions = [
  { label: "Expanded (Full description)", value: "expanded" },
  { label: "Compact (Icons only)", value: "compact" },
];

const fontOptions = [
  { label: "Inter (Modern & Clean)", value: "inter" },
  { label: "Outfit (Geometric & Round)", value: "outfit" },
  { label: "Roboto (Technical & Standard)", value: "roboto" },
];

const densityOptions = [
  { label: "Comfortable (Standard spacings)", value: "comfortable" },
  { label: "Compact (Dense paddings)", value: "compact" },
];

export function AppearanceForm() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Form Fields
  const [theme, setTheme] = useState("system");
  const [sidebarLayout, setSidebarLayout] = useState("expanded");
  const [fontFamily, setFontFamily] = useState("inter");
  const [density, setDensity] = useState("comfortable");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-border/60 pb-4">
        <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Appearance Settings</h3>
        <p className="text-sm font-medium text-text-secondary mt-0.5">
          Customize the visual look and feel of the platform.
        </p>
      </div>

      <div className="space-y-6">
        {/* Color Theme Selector Grid */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-dark">
            Color Theme
          </label>
          <div className="grid gap-3 grid-cols-3">
            {/* Light Mode */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                theme === "light"
                  ? "bg-accent-muted/40 border-accent text-accent shadow-sm"
                  : "bg-surface border-border text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              <Sun className="h-5 w-5 mb-2" />
              <span className="text-xs font-bold">Light Mode</span>
            </button>

            {/* Dark Mode */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                theme === "dark"
                  ? "bg-accent-muted/40 border-accent text-accent shadow-sm"
                  : "bg-surface border-border text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              <Moon className="h-5 w-5 mb-2" />
              <span className="text-xs font-bold">Dark Mode</span>
            </button>

            {/* System Mode */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                theme === "system"
                  ? "bg-accent-muted/40 border-accent text-accent shadow-sm"
                  : "bg-surface border-border text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              <Laptop className="h-5 w-5 mb-2" />
              <span className="text-xs font-bold">System Default</span>
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Sidebar Layout */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Sidebar Layout</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Columns className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {layoutOptions.find((opt) => opt.value === sidebarLayout)?.label || sidebarLayout}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={sidebarLayout} onValueChange={setSidebarLayout}>
                  {layoutOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Font Family</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Type className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {fontOptions.find((opt) => opt.value === fontFamily)?.label || fontFamily}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={fontFamily} onValueChange={setFontFamily}>
                  {fontOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Density Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-dark">Visual Density</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                  <Grid className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                  {densityOptions.find((opt) => opt.value === density)?.label || density}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                {densityOptions.map((opt) => (
                  <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Footer Save */}
      <div className="border-t border-border/50 pt-5 flex items-center justify-between">
        <div>
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
              <Check className="h-4 w-4" />
              Appearance saved successfully!
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={saveStatus === "saving"}
          className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6 rounded-lg"
        >
          {saveStatus === "saving" ? "Saving..." : "Save Appearance"}
        </Button>
      </div>
    </form>
  );
}
