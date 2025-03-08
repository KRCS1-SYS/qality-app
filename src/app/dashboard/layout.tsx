"use client";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { NavUser } from "@/components/dashboard/nav-user";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useGetSelfInfo from "@/hooks/use-self";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isReloaded, setIsReloaded] = useState(true);
  const [isSessionExpired, setSessionExpired] = useState(false);

  const {data, loading} = useGetSelfInfo(token, isReloaded, setIsReloaded, setSessionExpired);

  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <SidebarInset className=" h-full overflow-y-auto">
        <header className="flex  h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="flex space-x-3 px-3 items-center justify-center">
            {data && !loading && <NavUser user={data} />}
          </div>
        </header>
        <main className="overflow-y-auto">
          {children}
          {/* {isSessionExpired && (
            <SessionExpiredDialog
              setOpen={setSessionExpired}
              open={isSessionExpired}
            />
          )} */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}