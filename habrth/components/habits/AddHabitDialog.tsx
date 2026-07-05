"use client";

import { type FormEvent, useState } from "react";
import { useSelector } from "react-redux";
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
import { useCreateHabit } from "@/features/habits/hooks/useCreateHabit";
import type { RootState } from "@/store/store";

const addHabitSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
  category: z.enum(["health", "productivity", "learning", "social", "other"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  xpReward: z.coerce.number().int().min(0, "XP reward must be at least 0"),
});

type AddHabitDialogProps = {
  onSubmit?: () => void;
};

type AddHabitFormValues = {
  title: string;
  description: string;
  category: "health" | "productivity" | "learning" | "social" | "other";
  difficulty: "easy" | "medium" | "hard";
  frequency: "daily" | "weekly" | "monthly";
  xpReward: string;
};

type FormErrors = Partial<Record<keyof AddHabitFormValues, string>>;

const initialValues: AddHabitFormValues = {
  title: "",
  description: "",
  category: "health",
  difficulty: "easy",
  frequency: "daily",
  xpReward: "10",
};

export function AddHabitDialog({ onSubmit }: AddHabitDialogProps) {
  const userId = useSelector((state: RootState) => state.user.profile.id);
  const [createHabit, { loading: isSubmitting }] = useCreateHabit();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<AddHabitFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  const onChange = <K extends keyof AddHabitFormValues>(
    field: K,
    value: AddHabitFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!userId) {
      setSubmitError("You need to be logged in to add a habit.");
      return;
    }

    const parsed = addHabitSchema.safeParse(values);

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
      await createHabit({
        variables: {
          userId,
          title: parsed.data.title,
          description: parsed.data.description || undefined,
          category: parsed.data.category,
          difficulty: parsed.data.difficulty,
          xpReward: parsed.data.xpReward,
          frequency: parsed.data.frequency,
          streak: 0,
        },
        refetchQueries: [{ query: GET_HABITS_QUERY, variables: { userId } }],
        awaitRefetchQueries: true,
      });

      onSubmit?.();
      setOpen(false);
      resetForm();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create habit. Please try again.",
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" className="border-white/15">
          Add Habit
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={true}
        className="border-white/10 bg-zinc-950 text-white"
      >
        <SheetHeader>
          <SheetTitle>Add Habit</SheetTitle>
          <SheetDescription>
            Define a new habit to track your progression.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-4 pb-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="habit-title" className="text-zinc-200">
              Title
            </Label>
            <Input
              id="habit-title"
              type="text"
              value={values.title}
              onChange={(event) => onChange("title", event.target.value)}
              placeholder="Read for 20 minutes"
              className="border-white/10 bg-black/35 text-white placeholder:text-zinc-500"
            />
            {errors.title && (
              <p className="text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="habit-description" className="text-zinc-200">
              Description (optional)
            </Label>
            <textarea
              id="habit-description"
              value={values.description}
              onChange={(event) => onChange("description", event.target.value)}
              rows={3}
              placeholder="A short note about this habit"
              className="w-full rounded-lg border border-white/10 bg-black/35 px-2.5 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {errors.description && (
              <p className="text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="habit-category" className="text-zinc-200">
                Category
              </Label>
              <select
                id="habit-category"
                value={values.category}
                onChange={(event) =>
                  onChange(
                    "category",
                    event.target.value as AddHabitFormValues["category"],
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
              <Label htmlFor="habit-difficulty" className="text-zinc-200">
                Difficulty
              </Label>
              <select
                id="habit-difficulty"
                value={values.difficulty}
                onChange={(event) =>
                  onChange(
                    "difficulty",
                    event.target.value as AddHabitFormValues["difficulty"],
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
              <Label htmlFor="habit-frequency" className="text-zinc-200">
                Frequency
              </Label>
              <select
                id="habit-frequency"
                value={values.frequency}
                onChange={(event) =>
                  onChange(
                    "frequency",
                    event.target.value as AddHabitFormValues["frequency"],
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
              <Label htmlFor="habit-xp" className="text-zinc-200">
                XP Reward
              </Label>
              <Input
                id="habit-xp"
                type="number"
                min={0}
                value={values.xpReward}
                onChange={(event) => onChange("xpReward", event.target.value)}
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
                {isSubmitting ? "Adding..." : "Add Habit"}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
