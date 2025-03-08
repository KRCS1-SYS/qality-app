import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createAuthenticatedAxiosInstance } from "@/utils/protected-axios";
import { toast } from "sonner";
import { addQualityAPI } from "@/lib/api";
import useGetSelfInfo from "@/hooks/use-self";

const tagNames = [
  "DS_L1",
  "DS_M1",
  "DS_M2",
  "DS_S1",
  "PHARMA_CONT",
  "REF_L1",
  "REF_M1",
  "REF_S1",
  "REF_25KG",
] as const;

const qualitySchema = z.object({
  tag_name: z.enum(tagNames),
  counter_reading: z.number().min(0, "Counter reading must be non-negative"),
  calculated_quantity_quintal: z
    .number()
    .min(0, "Calculated quantity must be non-negative"),
  last_approved_quantity: z.string(),
  qa_approved_quantity: z.string(),
  calculated_quality_last_reading_time: z.string(),
  qa_approved_quality_last_approved_time: z.string(),
});

type QualityFormValues = z.infer<typeof qualitySchema>;

type Props = {
  setReloadedTableData: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function QualityForm({ token, setReloadedTableData }: Props) {
  const form = useForm<QualityFormValues>({
    resolver: zodResolver(qualitySchema),
    defaultValues: {
      tag_name: undefined,
      counter_reading: undefined,
      calculated_quantity_quintal: undefined,
      last_approved_quantity: "",
      qa_approved_quantity: "",
      calculated_quality_last_reading_time: "",
      qa_approved_quality_last_approved_time: "",
    },
  });

  const [sessionExpired, setSessionExpired] = useState(false);
  const { data: UserData } = useGetSelfInfo(
    token,
    true,
    setReloadedTableData,
    setSessionExpired
  );

  const axiosInstance = createAuthenticatedAxiosInstance({}, token);

  const onSubmit = async (values: QualityFormValues) => {
    try {
      const res = await axiosInstance.post(`${addQualityAPI}`, {
        ...values,
        approved_by: UserData!.id,
      });

      if (res.status === 201) {
        setReloadedTableData(true);
        toast.success("Quality record added successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add quality record");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 w-full"
      >
        {/* Tag Name Dropdown */}
        <FormField
          control={form.control}
          name="tag_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tagNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Counter Reading */}
        <FormField
          control={form.control}
          name="counter_reading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Counter Reading</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                  placeholder="Enter counter reading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Calculated Quantity */}
        <FormField
          control={form.control}
          name="calculated_quantity_quintal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calculated Quantity (Quintal)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                  placeholder="Enter quantity in quintal"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Approved Quantity */}
        <FormField
          control={form.control}
          name="last_approved_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Approved Quantity</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter last approved quantity" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* QA Approved Quantity */}
        <FormField
          control={form.control}
          name="qa_approved_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>QA Approved Quantity</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter QA approved quantity" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Reading Time */}
        <FormField
          control={form.control}
          name="calculated_quality_last_reading_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Reading Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* QA Last Approved Time */}
        <FormField
          control={form.control}
          name="qa_approved_quality_last_approved_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>QA Last Approved Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Add Quality Record
        </Button>
      </form>
    </FormProvider>
  );
}
