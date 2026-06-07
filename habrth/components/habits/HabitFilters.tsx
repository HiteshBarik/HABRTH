"use client";

import type { HabitListFilters } from "@/features/habits/types/habit.types";

type HabitFiltersProps = {
  filters: HabitListFilters;
  onChange?: (filters: HabitListFilters) => void;
};

export function HabitFilters({ filters, onChange }: HabitFiltersProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
      <p>Filters placeholder</p>
      <button
        type="button"
        className="mt-2 rounded-md border border-white/15 px-2 py-1"
        onClick={() => onChange?.(filters)}
      >
        Apply
      </button>
    </div>
  );
}
