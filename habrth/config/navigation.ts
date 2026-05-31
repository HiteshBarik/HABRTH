import {
  LucideIcon,
  LayoutDashboard,
  Target,
  Sword,
  BarChart3,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Habits",
    href: "/dashboard/habits",
    icon: Target,
  },
  {
    label: "Quests",
    href: "/dashboard/quests",
    icon: Sword,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
