"use client"

import {
  type LucideIcon
} from "lucide-react"

import {
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"

export function NavMain({
  links,
}: {
  links: {
    name: string
    to: string
    icon: LucideIcon
  }[]
}) {

  return (
    <>
     {links.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <NavLink to={item.to}>
                <item.icon />
                <span>{item.name}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
    </>
  )
}
