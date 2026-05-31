"use client";

import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import type { RootState } from "@/store/store";

export default function XPProgressCard() {
  const user = useSelector((state: RootState) => state.user);
  const requiredXP = 100;
  const progressValue = Math.min((user.progression.xp / requiredXP) * 100, 100);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            XP Progress
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {user.progression.xp} / {requiredXP}
          </p>
        </div>
        <p className="text-sm text-zinc-400">Level {user.progression.level}</p>
      </div>

      <div className="mt-5 space-y-3">
        <Progress
          value={progressValue}
          className="h-2 bg-white/10 **:data-[slot=progress-indicator]:bg-linear-to-r **:data-[slot=progress-indicator]:from-violet-300 **:data-[slot=progress-indicator]:via-cyan-300 **:data-[slot=progress-indicator]:to-emerald-300"
        />
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>Current XP</span>
          <span>Next level at {requiredXP} XP</span>
        </div>
      </div>
    </section>
  );
}
