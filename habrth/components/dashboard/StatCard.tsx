"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">
          {title}
        </p>
        {Icon && <Icon className="h-4 w-4 text-zinc-400" />}
      </div>

      <p className="text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
      {description ? (
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      ) : null}
    </section>
  );
}
