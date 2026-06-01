"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export default function EmptyStateCard({
  title,
  description,
  icon: Icon,
}: Props) {
  return (
    <section className="rounded-2xl border border-dashed border-white/10 bg-white/3 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-zinc-200">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-zinc-400">{description}</p>
        </div>
      </div>
    </section>
  );
}
