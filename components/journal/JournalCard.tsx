"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface JournalCardProps {
  title: string;
  category: string;
  date: string;
  image: string;
  index: number;
}

export function JournalCard({ title, category, date, image, index }: JournalCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group cursor-pointer space-y-6"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
          {category}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 opacity-30">
           <p className="text-[9px] font-black uppercase tracking-widest italic">{date}</p>
           <div className="flex-1 h-px bg-black" />
        </div>
        <h3 className="text-3xl font-black italic uppercase leading-none tracking-tighter group-hover:text-zinc-400 transition-colors">
          {title}
        </h3>
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed line-clamp-2 max-w-[200px]">
          An in-depth exploration of the latest archival series and its impact on modern streetwear.
        </p>
      </div>
    </motion.div>
  );
}
