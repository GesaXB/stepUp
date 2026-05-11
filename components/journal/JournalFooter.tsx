"use client";

export function JournalFooter() {
  return (
    <footer className="mt-40 border-t border-zinc-100 pt-20 flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="space-y-4">
         <h4 className="text-[10px] font-black uppercase tracking-widest italic">Archival Navigation</h4>
         <div className="flex gap-8">
            {["2025", "2024", "2023"].map(year => (
              <button key={year} className="text-4xl font-black italic uppercase tracking-tighter text-zinc-200 hover:text-black transition-colors">
                {year}
              </button>
            ))}
         </div>
      </div>
      <div className="md:text-right space-y-2">
         <p className="text-[9px] font-black uppercase tracking-widest">Protocol 99 // Editorial Team</p>
         <p className="text-[9px] text-zinc-400 font-bold uppercase">All Rights Reserved © 2026</p>
      </div>
    </footer>
  );
}
