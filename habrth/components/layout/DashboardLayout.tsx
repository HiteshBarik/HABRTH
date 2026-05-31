"use client";

import React from "react";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar";

function DashboardContent({ children }: React.PropsWithChildren) {
  const { open } = useSidebar();

  return (
    <div
      className="flex h-svh flex-col overflow-hidden pt-16 transition-[margin] duration-200 ease-linear"
      style={{ marginLeft: open ? "13.2rem" : "0" }}
    >
      <Navbar />
      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {children}
      </main>
    </div>
  );
}

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
};

export default DashboardLayout;
