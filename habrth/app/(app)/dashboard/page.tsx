"use client";

import {
  Activity,
  BookOpen,
  Dumbbell,
  Eye,
  Flame,
  ScrollText,
  Shield,
} from "lucide-react";
import { useSelector } from "react-redux";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import KeyStatCard from "@/components/dashboard/KeyStatCard";
import XPProgressCard from "@/components/dashboard/XPProgressCard";
import AttributeCard from "@/components/dashboard/AttributeCard";
import EmptyStateCard from "@/components/dashboard/EmptyStateCard";
import type { RootState } from "@/store/store";

export default function DashboardPage() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const rpgUser = useSelector((state: RootState) => state.user);
  const displayName = authUser?.name?.trim() || rpgUser.profile.name;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <WelcomeCard />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <XPProgressCard />
          <KeyStatCard
            title="Streak"
            value={`${rpgUser.progression.streak} Days`}
            subtitle="Consistency chain"
            icon={Flame}
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <AttributeCard
            attribute="Discipline"
            value={rpgUser.attributes.discipline}
            icon={Shield}
            description="Consistency & Habits"
          />
          <AttributeCard
            attribute="Strength"
            value={rpgUser.attributes.strength}
            icon={Dumbbell}
            description="Physical Growth"
          />
          <AttributeCard
            attribute="Focus"
            value={rpgUser.attributes.focus}
            icon={Eye}
            description="Deep Work"
          />
          <AttributeCard
            attribute="Knowledge"
            value={rpgUser.attributes.knowledge}
            icon={BookOpen}
            description="Learning & Skill"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <EmptyStateCard
            title="Recent Activity"
            description={`No activities yet for ${displayName}. Complete your first habit to begin.`}
            icon={Activity}
          />
          <EmptyStateCard
            title="Active Quests"
            description="Quests unlock in Module 5. This section is ready for future content."
            icon={ScrollText}
          />
        </section>
      </div>
  );
}
