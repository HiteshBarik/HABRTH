"use client";

import { type FormEvent, useState } from "react";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GET_HABITS_QUERY } from "@/features/habits/graphql/queries";
import { useUpdateHabit } from "@/features/habits/hooks/useUpdateHabit";
import type { Habit } from "@/features/habits/types/habit.types";

const editHabitSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
  category: z.enum(["health", "productivity", "learning", "social", "other"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  xpReward: z.coerce.number().int().min(0, "XP reward must be at least 0"),
});

type EditHabitFormValues = {
  title: string;
  description: string;
  category: "health" | "productivity" | "learning" | "social" | "other";
  difficulty: "easy" | "medium" | "hard";
  frequency: "daily" | "weekly" | "monthly";
  xpReward: string;
};

type FormErrors = Partial<Record<keyof EditHabitFormValues, string>>;

type EditHabitDialogProps = {
  habit: Habit;
  onSubmit?: () => void;
};

export function EditHabitDialog({ habit, onSubmit }: EditHabitDialogProps) {
  const [updateHabit, { loading: isSubmitting }] = useUpdateHabit();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<EditHabitFormValues>({
    title: habit.title,
    description: habit.description ?? "",
    category: habit.category,
    difficulty: habit.difficulty,
    frequency: habit.frequency,
    xpReward: String(habit.xpReward),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = () => {
    setValues({
      title: habit.title,
      description: habit.description ?? "",
      category: habit.category,
      difficulty: habit.difficulty,
      frequency: habit.frequency,
      xpReward: String(habit.xpReward),
    });
    setErrors({});
    setSubmitError(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetForm();
  };

  const onChange = <K extends keyof EditHabitFormValues>(
    field: K,
    value: EditHabitFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const parsed = editHabitSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        category: fieldErrors.category?.[0],
        difficulty: fieldErrors.difficulty?.[0],
        frequency: fieldErrors.frequency?.[0],
        xpReward: fieldErrors.xpReward?.[0],
      });
      return;
    }

    setErrors({});

    try {
      await updateHabit({
        variables: {
          id: habit.id,
          title: parsed.data.title,
          description: parsed.data.description ?? undefined,
          category: parsed.data.category,
          difficulty: parsed.data.difficulty,
          xpReward: parsed.data.xpReward,
          frequency: parsed.data.frequency,
        },
        refetchQueries: [
          { query: GET_HABITS_QUERY, variables: { userId: habit.userId } },
        ],
        awaitRefetchQueries: true,
      });

      onSubmit?.();
      setOpen(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to update habit. Please try again.",
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Edit habit"
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/8 hover:text-zinc-300"
        >
          <Pencil className="size-3.5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={true}
        className="border-white/10 bg-zinc-950 text-white"
      >
        <SheetHeader>
          <SheetTitle>Edit Habit</SheetTitle>
          <SheetDescription>Update your habit details.</SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-4 pb-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="edit-habit-title" className="text-zinc-200">
              Title
            </Label>
            <Input
              id="edit-habit-title"
              type="text"
              value={values.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="border-white/10 bg-black/35 text-white placeholder:text-zinc-500"
            />
            {errors.title && (
              <p className="text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-habit-description" className="text-zinc-200">
              Description (optional)
            </Label>
            <textarea
              id="edit-habit-description"
              value={values.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-black/35 px-2.5 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {errors.description && (
              <p className="text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-habit-category" className="text-zinc-200">
                Category
              </Label>
              <select
                id="edit-habit-category"
                value={values.category}
                onChange={(e) =>
                  onChange(
                    "category",
                    e.target.value as EditHabitFormValues["category"],
                  )
                }
                className="h-10 w-full rounded-lg border border-white/10 bg-black/35 px-2.5 text-sm text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="health">Health</option>
                <option value="productivity">Productivity</option>
                <option value="learning">Learning</option>
                <option value="social">Social</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-400">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-habit-difficulty" className="text-zinc-200">
                Difficulty
              </Label>
              <select
                id="edit-habit-difficulty"
                value={values.difficulty}
                onChange={(e) =>
                  onChange(
                    "difficulty",
                    e.target.value as EditHabitFormValues["difficulty"],
                  )
                }
                className="h-10 w-full rounded-lg border border-white/10 bg-black/35 px-2.5 text-sm text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficulty && (
                <p className="text-sm text-red-400">{errors.difficulty}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-habit-frequency" className="text-zinc-200">
                Frequency
              </Label>
              <select
                id="edit-habit-frequency"
                value={values.frequency}
                onChange={(e) =>
                  onChange(
                    "frequency",
                    e.target.value as EditHabitFormValues["frequency"],
                  )
                }
                className="h-10 w-full rounded-lg border border-white/10 bg-black/35 px-2.5 text-sm text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {errors.frequency && (
                <p className="text-sm text-red-400">{errors.frequency}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-habit-xp" className="text-zinc-200">
                XP Reward
              </Label>
              <Input
                id="edit-habit-xp"
                type="number"
                min={0}
                value={values.xpReward}
                onChange={(e) => onChange("xpReward", e.target.value)}
                className="border-white/10 bg-black/35 text-white"
              />
              {errors.xpReward && (
                <p className="text-sm text-red-400">{errors.xpReward}</p>
              )}
            </div>
          </div>

          {submitError && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {submitError}
            </p>
          )}

          <SheetFooter className="p-0 pt-2">
            <div className="flex w-full justify-end gap-2">
              <SheetClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
