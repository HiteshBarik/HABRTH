"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function WelcomeCard() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const rpgUser = useSelector((state: RootState) => state.user);
  const level = authUser?.level ?? rpgUser.progression.level;
  const xp = authUser?.xp ?? rpgUser.progression.xp;
  const streak = authUser?.streak ?? rpgUser.progression.streak;
  const userName = authUser?.name?.trim() || rpgUser.profile.name;

  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.2)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
      <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
        HABRTH
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Welcome back, {userName}
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400 sm:text-lg">
        Forge your next milestone. Every action shapes your character.
      </p>
      <p className="mt-5 text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
        Level {level} Initiate · {xp} XP · Streak {streak}
      </p>
    </section>
  );
}
