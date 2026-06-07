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
    href: "/habits",
    icon: Target,
  },
  {
    label: "Quests",
    href: "/quests",
    icon: Sword,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
