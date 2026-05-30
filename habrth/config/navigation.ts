import {
  LucideIcon,
  Home,
  Zap,
  ScrollText,
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
    icon: Home,
  },
  {
    label: "Habits",
    href: "/dashboard/habits",
    icon: Zap,
  },
  {
    label: "Quests",
    href: "/dashboard/quests",
    icon: ScrollText,
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
