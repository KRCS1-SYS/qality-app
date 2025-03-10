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
import { Dispatch, SetStateAction } from "react";
import QualityForm from "./quality-form";

type Props = {
  token: string;
  setReloadedTableData: Dispatch<SetStateAction<boolean>>;
};

export default function AddNewQuality({ token, setReloadedTableData }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        /** <Button variant="secondary">
          Add <PlusCircle className="w-5 h-5" />
        </Button> **/
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Add New Quality Parameters</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <QualityForm
          token={token}
          setReloadedTableData={setReloadedTableData}
        />
      </SheetContent>
    </Sheet>
  );
}
