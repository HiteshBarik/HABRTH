"use client";

import Link from "next/link";
import { Brain, BookOpen, Dumbbell, Flame } from "lucide-react";
import { useSelector } from "react-redux";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import XPCard from "@/components/dashboard/XPCard";
import type { RootState } from "@/store/store";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-4xl">
        <WelcomeCard />
        <div className="mt-6">
          <XPCard />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <StatCard
            title="Discipline"
            value={user?.discipline ?? 1}
            icon={Flame}
            description="Consistency"
          />
          <StatCard
            title="Strength"
            value={user?.strength ?? 1}
            icon={Dumbbell}
            description="Fitness"
          />
          <StatCard
            title="Focus"
            value={user?.focus ?? 1}
            icon={Brain}
            description="Deep work"
          />
          <StatCard
            title="Knowledge"
            value={user?.knowledge ?? 1}
            icon={BookOpen}
            description="Learning"
          />
        </div>

        <Link
          href="/"
          className="inline-block pb-8 text-sm text-zinc-300 underline underline-offset-4 mt-3"
        >
          Return home
        </Link>
      </div>
    </DashboardLayout>
  );
}
