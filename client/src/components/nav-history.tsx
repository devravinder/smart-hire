import { History, MoreVertical, Trash2 } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apiClient from "@/services/apiClient";
import { NavLink, useLoaderData, useNavigate, useRevalidator } from "react-router";

export function NavHistory() {
  const { isMobile } = useSidebar();
  const conversations = useLoaderData<string[]>();
  const revalidator = useRevalidator();
  const navigate = useNavigate()

  const deleteConversation = async (conversationId: string) => {
    await apiClient.DELETE("/api/conversations/{conversationId}", {
      params: {
        path: {
          conversationId,
        },
      },
    });
    await navigate("/chat")
    // revalidator.revalidate() will not trigger the loader if shouldRevalidate returns false in the route
    await revalidator.revalidate();
  
  };
  const deleteAllConversations = async () => {
    await apiClient.DELETE("/api/conversations");
    await navigate("/chat")
    await revalidator.revalidate();
  };

  return (
    <Collapsible asChild defaultOpen={true} className="group/collapsible">
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={"History"}
         
          asChild={true}
        >
          <div  className="group/top">
            <CollapsibleTrigger className="flex flex-row items-center gap-2 w-full cursor-pointer">
              <History className="w-5 h-5" />
              <span>{"History"}</span>
            </CollapsibleTrigger>
            <SubDropdownMenu
              isMobile={isMobile}
              onClick={deleteAllConversations}
              className=" invisible group-hover/top:visible group-hover/top:bg-sidebar-accent cursor-pointer"
            />
          </div>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {conversations?.map((threadId) => (
              <SidebarMenuSubItem key={threadId}>
                <SidebarMenuSubButton asChild className="group/sub">
                  <span>
                    <NavLink to={`/chat/${threadId}`} className="truncate">
                      <span>{threadId}</span>
                    </NavLink>
                    <SubDropdownMenu
                      isMobile={isMobile}
                      onClick={() => deleteConversation(threadId)}
                      className="invisible group-hover/sub:visible group-hover/sub:bg-sidebar-accent cursor-pointer"
                    />
                  </span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

const SubDropdownMenu = ({
  isMobile,
  className,
  onClick,
}: {
  isMobile: boolean;
  className?: string;
  onClick?: VoidFunction;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction className={className}>
          <MoreVertical />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
          <Trash2 className="text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
