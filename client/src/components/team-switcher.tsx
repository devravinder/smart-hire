import {
  DropdownMenu
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { APP } from "@/constants"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export function TeamSwitcher() {

  
  return (
    <SidebarMenu>
        <DropdownMenu>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={"/favicon.png"} alt={"Smart-Hire"} />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{APP.name}</span>
                <span className="truncate text-xs">{APP.tagLine}</span>
              </div>
            </SidebarMenuButton>
       </DropdownMenu>
    </SidebarMenu>
  )
}
