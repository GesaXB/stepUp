"use client";

import { JournalCard } from "@/components/journal/JournalCard";
import { JournalHeader } from "@/components/journal/JournalHeader";
import { JournalFooter } from "@/components/journal/JournalFooter";

const JOURNAL_POSTS = [
  { title: "The Anatomy of Air", category: "Technology", date: "APR 12, 2026", image: "/images/shoes-1.png" },
  { title: "Archival Series: 1994", category: "History", date: "APR 10, 2026", image: "/images/shoes-2.png" },
  { title: "Sustainable Hype", category: "Future", date: "APR 08, 2026", image: "/images/shoes-3.png" },
  { title: "Brutalist Soles", category: "Design", date: "APR 05, 2026", image: "/images/sneaker-yellow.png" },
  { title: "Luxury or Utility?", category: "Essay", date: "MAR 30, 2026", image: "/images/sneaker-right.png" },
  { title: "The Rise of NFC", category: "Security", date: "MAR 25, 2026", image: "/images/hero-main.png" },
  { title: "Urban Traversal 101", category: "Lifestyle", date: "MAR 20, 2026", image: "/images/story-model.png" },
  { title: "Material Revolution", category: "Spec", date: "MAR 15, 2026", image: "/images/shoes-1.png" },
  { title: "Tokyo Street Scene", category: "Global", date: "MAR 10, 2026", image: "/images/shoes-3.png" },
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-10 md:px-24 lg:px-32 selection:bg-black selection:text-white">
      <div className="max-w-[1200px] mx-auto">
        <JournalHeader />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {JOURNAL_POSTS.map((post, i) => (
            <JournalCard key={i} {...post} index={i} />
          ))}
        </div>

        <JournalFooter />
      </div>
    </main>
  );
}
