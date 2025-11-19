import {
  MessageSquarePlus,
  Search,
  Settings
} from "lucide-react";
import * as React from "react";

import { NavHistory } from "@/components/nav-history";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {

  main: [
    {
      name: "Search",
      to: "/chat",
      icon: Search,
    },
    {
      name: "New Chat",
      to: "/chat",
      icon: MessageSquarePlus,
    },
    {
      name: "Settings",
      to: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden sss">
          <SidebarMenu>
            <NavMain links={data.main} />
            <NavHistory />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
