"use client";

import { useSelector } from "react-redux";
import { AddHabitDialog } from "@/components/habits/AddHabitDialog";
import { HabitList } from "@/components/habits/HabitList";
import { useHabits } from "@/features/habits/hooks/useHabits";
import type { RootState } from "@/store/store";

export default function HabitsPage() {
  const userId = useSelector((state: RootState) => state.user.profile.id);
  const { data, loading, error } = useHabits(userId);

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Habits</h1>
      <AddHabitDialog />

      {loading ? (
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
          Loading habits...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          Failed to load habits.
        </div>
      ) : null}

      {!loading && !error ? <HabitList habits={data?.getHabits ?? []} /> : null}
    </div>
  );
}
