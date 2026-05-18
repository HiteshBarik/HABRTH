"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setCredentials } from "@/store/features/auth/authSlice";
import { signupUser } from "@/services/auth.service";
import { useDispatch } from "react-redux";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return false;

        const today = new Date();
        const normalizedToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );

        return date <= normalizedToday;
      }, "Date of birth must be in the past"),
  })
  .superRefine((values, context) => {
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

type FormValues = z.infer<typeof signupSchema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const today = new Date();
  const earliestDob = new Date(1900, 0, 1);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [isDobPickerOpen, setIsDobPickerOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const parsed = signupSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        dob: fieldErrors.dob?.[0],
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const fullName =
      `${values.firstName.trim()} ${values.lastName.trim()}`.trim();

    try {
      const result = await signupUser({
        name: fullName,
        email: values.email.trim(),
        dob: values.dob,
        password: values.password,
      });

      if (!result.ok || !result.data.success) {
        setSubmitError(
          result.data.message ?? result.data.error ?? "Signup failed.",
        );
        return;
      }

      dispatch(
        setCredentials({
          user: result.data.user ?? null,
          token: result.data.token ?? null,
        }),
      );

      if (result.data.token) {
        window.localStorage.setItem("authToken", result.data.token);
      }

      if (result.data.user) {
        window.localStorage.setItem(
          "authUser",
          JSON.stringify(result.data.user),
        );
      }

      router.push("/dashboard");
    } catch {
      setSubmitError("Something went wrong while creating your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-xl border border-white/10 bg-zinc-950/70 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Enter HABRTH
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Forge Character
            </h2>
            <p className="text-sm leading-6 text-zinc-400">
              Create your profile and step into the progression arc.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-zinc-200">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={values.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                placeholder="Enter first name"
                className="h-11 border-white/10 bg-black/35 text-white placeholder:text-zinc-500 transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/5 focus-visible:ring-white/20"
              />
              {errors.firstName && (
                <p className="text-sm text-red-400">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-zinc-200">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={values.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                placeholder="Enter last name"
                className="h-11 border-white/10 bg-black/35 text-white placeholder:text-zinc-500 transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/5 focus-visible:ring-white/20"
              />
              {errors.lastName && (
                <p className="text-sm text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="Enter your email"
              className="h-11 border-white/10 bg-black/35 text-white placeholder:text-zinc-500 transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/5 focus-visible:ring-white/20"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-200">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => onChange("password", e.target.value)}
                placeholder="Create a password"
                className="h-11 pr-11 border-white/10 bg-black/35 text-white placeholder:text-zinc-500 transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/5 focus-visible:ring-white/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-zinc-400 hover:bg-white/5 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-zinc-200">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
              placeholder="Confirm your password"
              className="h-11 border-white/10 bg-black/35 text-white placeholder:text-zinc-500 transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/5 focus-visible:ring-white/20"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-zinc-200">
              Date of Birth
            </Label>
            <Popover open={isDobPickerOpen} onOpenChange={setIsDobPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full justify-start border-white/10 bg-black/35 text-left font-normal text-white shadow-none transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/5 data-[state=open]:bg-white/5 aria-expanded:bg-white/5"
                >
                  <CalendarIcon className="mr-2 size-4 text-zinc-400" />
                  <span className={values.dob ? "text-white" : "text-zinc-500"}>
                    {values.dob
                      ? format(new Date(`${values.dob}T00:00:00`), "PPP")
                      : "Pick your date of birth"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-76 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-0 shadow-2xl shadow-black/60"
                align="start"
                side="bottom"
                sideOffset={12}
              >
                <div className="p-2">
                  <Calendar
                    mode="single"
                    selected={
                      values.dob
                        ? new Date(`${values.dob}T00:00:00`)
                        : undefined
                    }
                    defaultMonth={
                      values.dob
                        ? new Date(`${values.dob}T00:00:00`)
                        : new Date(today.getFullYear() - 18, 0, 1)
                    }
                    onSelect={(date) => {
                      if (!date) {
                        onChange("dob", "");
                        return;
                      }

                      onChange("dob", format(date, "yyyy-MM-dd"));
                      setIsDobPickerOpen(false);
                    }}
                    disabled={(date) => date > today}
                    captionLayout="dropdown"
                    startMonth={earliestDob}
                    endMonth={today}
                    showOutsideDays={false}
                    className="w-full rounded-xl bg-transparent p-0"
                  />
                </div>
              </PopoverContent>
            </Popover>
            {errors.dob && <p className="text-sm text-red-400">{errors.dob}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="premium-auth-cta premium-auth-type h-12 w-full rounded-xl text-base"
          >
            {isSubmitting
              ? "Forging Character..."
              : "Forge Character · Sign Up"}
          </Button>

          {submitError && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {submitError}
            </p>
          )}

          <div className="text-center">
            <Link href="/login" className="premium-auth-link premium-auth-type">
              Enter HABRTH · Log In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function SignupPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 py-10 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
      <section className="max-w-xl text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          HABRTH
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          Forge Your Character
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
          Create your HABRTH account and step into your progression arc.
        </p>
      </section>
      <SignupForm />
    </div>
  );
}
