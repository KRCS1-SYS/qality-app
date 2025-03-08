"use client";
import AddNewQuality from "@/components/quality/add-new-quality";
import QualityForm from "@/components/quality/add-new-quality";
import { QualityDataTable } from "@/components/quality/quality-table";
import { Card, CardContent } from "@/components/ui/card";
import useGetQuality from "@/hooks/use-get-quality";
import { RootState } from "@/redux/store";
import { MainQuality } from "@/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const [isReloaded, setIsReloaded] = useState(true);

  const token = useSelector((state: RootState) => state.auth.token);
  const { data } = useGetQuality(token, isReloaded, setIsReloaded);

  return (
    <div className="p-6 space-y-4">
      <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 items-center justify-between">
        <div className="flex items-center justify-center sm:justify-start sm:items-start flex-col">
          <h1 className=" text-lg sm:text-2xl font-semibold">
            Sugar Quality Parameters
          </h1>
        </div>

        <AddNewQuality token={token} setReloadedTableData={setIsReloaded} />
      </div>

      <Card>
        <CardContent>
          {data && (
            <QualityDataTable
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
