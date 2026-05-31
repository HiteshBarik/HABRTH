"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
};

export default function KeyStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent opacity-70" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            {title}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/8 p-3 text-white shadow-[0_0_24px_rgba(255,255,255,0.08)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
