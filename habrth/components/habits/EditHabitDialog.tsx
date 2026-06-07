"use client";

type EditHabitDialogProps = {
  onSubmit?: () => void;
};

export function EditHabitDialog({ onSubmit }: EditHabitDialogProps) {
  return (
    <button
      type="button"
      className="rounded-md border border-white/15 px-3 py-1 text-sm"
      onClick={onSubmit}
    >
      Edit Habit
    </button>
  );
}
