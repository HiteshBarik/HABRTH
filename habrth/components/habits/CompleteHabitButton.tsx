"use client";

type CompleteHabitButtonProps = {
  onComplete?: () => void;
};

export function CompleteHabitButton({ onComplete }: CompleteHabitButtonProps) {
  return (
    <button
      type="button"
      className="rounded-md border border-white/15 px-3 py-1 text-sm"
      onClick={onComplete}
    >
      Complete
    </button>
  );
}
