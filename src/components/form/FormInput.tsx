import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
type FormInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  label: string;
  placeholder: string;
  name: Path<TFieldValues>;
  type: string;
};

export default function FormInput<TFieldValues extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  type,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <FormLabel>{label}</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} className="hover:border-purplishBlue" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
