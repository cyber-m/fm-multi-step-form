import { FormDescription } from "@/components/ui/form";
type FormHeaderProps = {
  title: string;
  description: string;
};

export default function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[2rem] font-bold text-marineBlue sm:text-2xl">{title}</h1>
      <FormDescription id="step-description" className="text-coolGray">
        {description}
      </FormDescription>
    </div>
  );
}
