import { FC, HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  required?: boolean;
  description?: string;
  form: any;
}

const FormInputElement: FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  required = false,
  description,
  form,
  name,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input type={type} className="h-[45px] rounded-[4px]" placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};

export default FormInputElement;