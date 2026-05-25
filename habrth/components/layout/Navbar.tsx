"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { navItems } from "@/config/navigation";
import type { RootState } from "@/store/store";

type Props = {};

const Navbar = (_props: Props) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const userName = user?.name?.trim() || "User Name";
  const userEmail = user?.email?.trim() || "user@example.com";

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const handleLogout = () => {
    // Clear persisted auth data and force a full reload so in-memory auth state is reset
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.location.replace("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/50 px-3 backdrop-blur-md md:px-6">
      {/* Left side - Sidebar trigger (mobile) and logo */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-white/10 md:hidden" />
        <p className="text-sm font-medium tracking-widest text-zinc-200 uppercase">
          HABRTH
        </p>
      </div>

      {/* Center - Menu items (desktop only) */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 hover:bg-white/10"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-zinc-700 text-xs font-semibold text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
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
