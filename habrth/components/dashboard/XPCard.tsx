"use client";

import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import type { RootState } from "@/store/store";

export default function XPCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const currentLevel = user?.level ?? 1;
  const currentXP = user?.xp ?? 0;
  const nextLevelXP = 100 * currentLevel;
  const progressValue = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">XP</p>
        <p className="text-sm font-medium text-zinc-300">
          Level {currentLevel}
        </p>
      </div>

      <div className="space-y-3">
        <Progress
          value={progressValue}
          className="h-2 bg-white/10 **:data-[slot=progress-indicator]:bg-linear-to-r **:data-[slot=progress-indicator]:from-violet-300 **:data-[slot=progress-indicator]:to-cyan-300"
        />

        <div className="flex items-center justify-between text-sm">
          <p className="text-zinc-200">
            {currentXP} / {nextLevelXP} XP
          </p>
          <p className="text-zinc-400">Next: {nextLevelXP} XP</p>
        </div>
      </div>
    </section>
  );
}
