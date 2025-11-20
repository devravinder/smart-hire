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
import { deleteAllConversations, deleteConversation } from "@/services/chatService";
import {
  NavLink,
  useLoaderData,
  useNavigate,
} from "react-router";

export function NavHistory() {
  const { isMobile } = useSidebar();
  const conversations = useLoaderData<string[]>();
  const navigate = useNavigate();

  const removeConversation = async (conversationId: string) => {
    await deleteConversation(conversationId);
    await navigate("/chat?refetch=true");
  };
  const removeConversations = async () => {
    await deleteAllConversations();
    await navigate("/chat?refetch=true");
  };

  return (
    <Collapsible asChild defaultOpen={true} className="group/collapsible">
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={"History"} asChild={true}>
          <div className="group/top">
            <CollapsibleTrigger className="flex flex-row items-center gap-2 w-full cursor-pointer">
              <History className="w-5 h-5" />
              <span>{"History"}</span>
            </CollapsibleTrigger>
            <SubDropdownMenu
              isMobile={isMobile}
              onClick={removeConversations}
              className=" invisible group-hover/top:visible group-hover/top:bg-sidebar-accent cursor-pointer"
            />
          </div>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {conversations?.map((threadId) => (
              <NavLink
              key={threadId}
                to={`/chat/${threadId}`}
                className={({ isActive }) =>
                  `rounded-md ${
                    isActive ? "bg-sidebar-accent" : ""
                  }`
                }
              >
                <SidebarMenuSubItem >
                  <SidebarMenuSubButton asChild className="group/sub">
                    <span>
                      <span className="truncate">{threadId}</span>
                      <SubDropdownMenu
                        isMobile={isMobile}
                        onClick={() => removeConversation(threadId)}
                        className="invisible group-hover/sub:visible group-hover/sub:bg-sidebar-accent cursor-pointer"
                      />
                    </span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </NavLink>
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
