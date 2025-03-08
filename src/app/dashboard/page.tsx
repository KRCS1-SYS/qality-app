"use client";
import AddNewMachine from "@/components/machine/add-new-machine";
import { MachineDataTable } from "@/components/machine/machine-table";
import { Card, CardContent } from "@/components/ui/card";
import useGetMachines from "@/hooks/use-get-machines";
import { RootState } from "@/redux/store";
import { MACHINE } from "@/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const machines: MACHINE[] = [];

export default function Page() {
  const [isReloaded, setIsReloaded] = useState(true);

  const token = useSelector((state: RootState) => state.auth.token);

  const { data } = useGetMachines(token, isReloaded, setIsReloaded);

  return (
    <div className="p-6 space-y-4">
      <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 items-center justify-between">
        <div className="flex items-center justify-center sm:justify-start sm:items-start flex-col">
          <h1 className=" text-lg sm:text-2xl font-semibold">
            Machine Configuration
          </h1>
        </div>

        <AddNewMachine token={token} setReloadedTableData={setIsReloaded} />
      </div>
      <Card>
        <CardContent>
          {data && (
            <MachineDataTable
              data={data}
              token={token}
              setIsReloaded={setIsReloaded}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
