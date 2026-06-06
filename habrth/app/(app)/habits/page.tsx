import { HabitList } from "@/components/habits/HabitList";

export default function HabitsPage() {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Habits</h1>
      <HabitList habits={[]} />
    </main>
  );
}
