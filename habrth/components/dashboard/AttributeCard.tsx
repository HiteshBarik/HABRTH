"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  attribute: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
};

export default function AttributeCard({
  attribute,
  value,
  description,
  icon: Icon,
}: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-200 hover:border-white/15 hover:bg-white/6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            {attribute}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 text-sm text-zinc-400">{description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/8 p-3 text-zinc-100 shadow-[0_0_24px_rgba(255,255,255,0.06)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
