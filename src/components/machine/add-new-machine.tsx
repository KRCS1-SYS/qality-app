import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import MachineForm from "./machine-form";
import { Dispatch, SetStateAction } from "react";

type Props = {
  token :string;
  setReloadedTableData: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewMachine({token, setReloadedTableData}:Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          Add <PlusCircle className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Add New Machine</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <MachineForm token={token} setOpen={undefined} setReloadedTableData={setReloadedTableData}  data={undefined} />
      </SheetContent>
    </Sheet>
  );
}
