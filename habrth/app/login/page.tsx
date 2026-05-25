"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCredentials } from "@/store/features/auth/authSlice";
import { loginUser } from "@/services/auth.service";
import { useDispatch } from "react-redux";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof loginSchema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });
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

    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await loginUser({
        email: values.email.trim(),
        password: values.password,
      });

      if (!result.ok || !result.data.success) {
        setSubmitError(
          result.data.message ?? result.data.error ?? "Login failed.",
        );
        return;
      }

      dispatch(
        setCredentials({
          user: result.data.user ?? null,
          token: result.data.token ?? null,
        }),
      );

      router.push("/dashboard");
    } catch {
      setSubmitError("Something went wrong while logging in.");
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
              Welcome Back to HABRTH
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Enter Your Realm
            </h2>
            <p className="text-sm leading-6 text-zinc-400">
              Log in to continue your progression arc.
            </p>
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
                placeholder="Enter your password"
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="premium-auth-cta premium-auth-type h-12 w-full rounded-xl text-base"
          >
            {isSubmitting ? "Entering Realm..." : "Enter Realm · Log In"}
          </Button>

          {submitError && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {submitError}
            </p>
          )}

          <div className="text-center">
            <Link
              href="/signup"
              className="premium-auth-link premium-auth-type"
            >
              Forge Character · Sign Up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 py-10 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
      <section className="max-w-xl text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          HABRTH
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          Welcome Back
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
          Log in to your HABRTH account and continue your progression arc.
        </p>
      </section>
      <LoginForm />
    </div>
  );
}
