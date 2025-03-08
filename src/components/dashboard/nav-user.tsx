"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/auth-slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { USER } from "@/types";

export function NavUser({ user }: { user: USER }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logOut());
    router.replace("/");
    toast.success("User Logged out!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center w-[100x] sm:w-[200px] space-x-2">
        {user && (
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={""} alt={user.fullName || ""} />
            <AvatarFallback className="rounded-lg uppercase">
              {user.email.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="grid flex-1 text-left text-sm leading-tight">
          {user && <span className="truncate font-semibold">{user.email}</span>}
          {user && <span className="truncate text-xs">{user.email}</span>}
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {user && (
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={""} alt={user.fullName || ""} />
                <AvatarFallback className="rounded-lg uppercase">
                  {user.email.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="grid flex-1 text-left text-sm leading-tight">
              {user && (
                <span className="truncate font-semibold">
                  {user.fullName || ""}
                </span>
              )}
              {user && <span className="truncate text-xs">{user.email}</span>}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => logoutHandler()}>
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
