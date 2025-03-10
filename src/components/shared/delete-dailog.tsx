"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  deleteHandler: (id: string) => void;
  loader?: boolean;
};

export default function DeleteDialog({
  open,
  setOpen,
  id,
  deleteHandler,
  loader,
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to approve this?
          </AlertDialogTitle>
          <AlertDialogDescription>
            When approving, the data will be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={() => deleteHandler(id)}
            disabled={loader}
          >
            {loader ? "Approving..." : "Approve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
