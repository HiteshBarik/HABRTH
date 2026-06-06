"use client";

type AddHabitDialogProps = {
  onSubmit?: () => void;
};

export function AddHabitDialog({ onSubmit }: AddHabitDialogProps) {
  return (
    <button
      type="button"
      className="rounded-md border border-white/15 px-3 py-1 text-sm"
      onClick={onSubmit}
    >
      Add Habit
    </button>
  );
}
