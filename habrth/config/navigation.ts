import { LucideIcon, Home, Zap, User } from "lucide-react";

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
    href: "/habits",
    icon: Zap,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];
