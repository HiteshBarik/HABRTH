"use client";

import React from "react";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { SidebarProvider, useSidebar } from "../ui/sidebar";

type Props = {};

function DashboardContent({ children }: React.PropsWithChildren) {
  const { open } = useSidebar();

  return (
    <div
      className="flex flex-col min-h-screen transition-[margin] duration-200 ease-linear"
      style={{ marginLeft: open ? "11.2rem" : "0" }}
    >
      <Navbar />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 mt-16">
        {children}
      </main>
    </div>
  );
}

const DashboardLayout = ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
};

export default DashboardLayout;
