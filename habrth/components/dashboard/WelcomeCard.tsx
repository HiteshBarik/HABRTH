"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function WelcomeCard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const level = user?.level ?? 1;
  const xp = user?.xp ?? 0;
  const streak = user?.streak ?? 0;

  return (
    <div className="mx-auto flex w-full max-w-4xl justify-center gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          HABRTH
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Welcome, {user?.name ?? "Initiate"}
        </h1>
        <p className="mt-3 text-zinc-400">
          Level {level} Initiate · {xp} XP · Streak {streak}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
          <p className="text-sm text-zinc-400">Profile</p>
          <p className="mt-2 text-lg font-medium text-white">
            {user?.email ?? "No account loaded"}
          </p>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
          <p className="text-sm text-zinc-400">Status</p>
          <p className="mt-2 text-lg font-medium text-white">Forge started</p>
        </section>
      </div>
    </div>
  );
}
