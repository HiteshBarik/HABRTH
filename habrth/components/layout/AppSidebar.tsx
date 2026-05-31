"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { navItems } from "@/config/navigation";

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      className="border-r border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_22%,rgba(0,0,0,0.55)_100%)] backdrop-blur-2xl"
    >
      <SidebarHeader className="border-b border-white/10 px-4 py-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
            System
          </p>
          <p className="text-lg font-semibold tracking-tight text-white">
            HABRTH
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="h-10 rounded-xl border border-transparent text-zinc-300 transition-all duration-200 hover:border-white/10 hover:bg-white/8 hover:text-white data-[active=true]:border-white/15 data-[active=true]:bg-white/10 data-[active=true]:text-white"
              >
                <Link href={item.href} className="flex items-center gap-2.5">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span className="text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
