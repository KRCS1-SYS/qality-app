import { MainQuality, QUALITY } from "@/types";
import { Row } from "@tanstack/react-table";
import React, { HTMLInputTypeAttribute, useState } from "react";
import { Input } from "../ui/input";

type Props = {
  row: Row<QUALITY>;
  inputText: string;
  type: HTMLInputTypeAttribute;
  qualityKey?: keyof QUALITY;
};

export default function CellWrapper({
  row,
  inputText,
  type,
  qualityKey,
}: Props) {
  const [value, setValue] = useState(inputText);

  return (
    <div>
      <Input
        type={type}
        onChange={(e) => {
          setValue(e.target.value);
          if (qualityKey) {
            (row.original[qualityKey] as unknown as string) = e.target.value;
          }
        }}
        value={value}
      />
    </div>
  );
}
