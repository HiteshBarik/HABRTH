"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Flame, LogOut, Settings, User } from "lucide-react";
import { navItems } from "@/config/navigation";
import type { AppDispatch, RootState } from "@/store/store";
import { clearAuth } from "@/store/features/auth/authSlice";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const rpgUser = useSelector((state: RootState) => state.user);

  const userName =
    authUser?.name?.trim() || rpgUser.profile.name || "User Name";
  const currentPage =
    navItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.label ?? "Dashboard";

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // proceed with client-side logout even if the server request fails
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    dispatch(clearAuth());
    router.replace("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[linear-gradient(180deg,rgba(12,12,12,0.82)_0%,rgba(5,5,5,0.64)_100%)] px-3 backdrop-blur-2xl md:px-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-white/10 md:hidden" />
        <p className="text-xs font-medium tracking-[0.3em] text-zinc-200 uppercase">
          HABRTH
        </p>
      </div>

      <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5 shadow-[0_12px_48px_rgba(0,0,0,0.35)] md:flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-white/12 text-white"
                  : "text-zinc-300 hover:bg-white/8 hover:text-white"
              }`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 sm:flex">
          <Flame className="h-4 w-4 text-orange-300" />
          <span>{rpgUser.progression.xp} XP</span>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 sm:block">
          Level {rpgUser.progression.level}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full border border-white/15 bg-white/6 p-0 hover:bg-white/12"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-zinc-700 text-xs font-semibold text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-white/10 bg-zinc-950/95 text-zinc-100 backdrop-blur-xl"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {authUser?.email?.trim() || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
