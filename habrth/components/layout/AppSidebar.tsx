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

type Props = {};

const AppSidebar = (_props: Props) => {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      style={{ "--sidebar-width": "11.2rem" } as React.CSSProperties}
    >
      <SidebarHeader className="px-4 py-3 border-b border-white/10">
        <p className="text-lg font-semibold tracking-tight">HABRTH</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>{item.label}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
