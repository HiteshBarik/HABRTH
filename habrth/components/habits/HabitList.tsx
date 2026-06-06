import type { Habit } from "@/features/habits/types/habit.types";
import { HabitCard } from "@/components/habits/HabitCard";

type HabitListProps = {
  habits: Habit[];
};

export function HabitList({ habits }: HabitListProps) {
  if (!habits.length) {
    return (
      <div className="rounded-lg border border-dashed border-white/20 p-6 text-sm text-muted-foreground">
        No habits yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
