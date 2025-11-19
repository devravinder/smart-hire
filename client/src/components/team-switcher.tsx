import * as React from "react"

import {
  DropdownMenu
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { APP } from "@/constants"
import { GalleryVerticalEnd } from "lucide-react"

export function TeamSwitcher() {

  
  return (
    <SidebarMenu>
        <DropdownMenu>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{APP.name}</span>
                <span className="truncate text-xs">{APP.tagLine}</span>
              </div>
            </SidebarMenuButton>
       </DropdownMenu>
    </SidebarMenu>
  )
}
