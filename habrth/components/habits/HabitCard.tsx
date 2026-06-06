import type { Habit } from "@/features/habits/types/habit.types";

type HabitCardProps = {
  habit: Habit;
};

export function HabitCard({ habit }: HabitCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-black/20 p-4">
      <h3 className="font-semibold">{habit.title}</h3>
      {habit.description ? (
        <p className="mt-1 text-sm text-muted-foreground">
          {habit.description}
        </p>
      ) : null}
      <p className="mt-2 text-xs text-muted-foreground">
        {habit.category} • {habit.difficulty} • {habit.frequency}
      </p>
    </article>
  );
}
