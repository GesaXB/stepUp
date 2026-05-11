"use client";

import { StoriesHero } from "@/components/stories/StoriesHero";
import { StoriesGrid } from "@/components/stories/StoriesGrid";
import { StoriesFooter } from "@/components/stories/StoriesFooter";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <StoriesHero />
      <StoriesGrid />
      <StoriesFooter />
    </main>
  );
}
