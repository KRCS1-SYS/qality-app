"use client";

import * as React from "react";
import {
  FileCheckIcon,
  Boxes,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";

const data = {
  navMain: [
    {
      title: "Machine Configuration",
      url: "/dashboard",
      icon: Boxes,
      isActive: true,
    },
    {
      title: "Quality parameters",
      url: "/dashboard/quality",
      icon: FileCheckIcon,
    },
  ],
  //   others: [
  //     {
  //       title: "Settings",
  //       url: "/dashboard/settings",
  //       icon: Settings,
  //     },
  //   ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
