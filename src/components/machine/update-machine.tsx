import { MACHINE } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import MachineForm from "./machine-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReloadedTableData: Dispatch<SetStateAction<boolean>>;
  token: string;
  data: MACHINE;
};

export default function UpdateMachineDailog({
  data,
  setOpen,
  setReloadedTableData,
  token,
  open,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Update Machine</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {data && (
          <MachineForm
            data={data}
            setReloadedTableData={setReloadedTableData}
            setOpen={setOpen}
            token={token}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
