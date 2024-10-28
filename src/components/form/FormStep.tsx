import { cn } from "@/lib/utils";
interface FormStepProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function FormStep({ children, className }: FormStepProps) {
  return (
    <div
      className={cn(
        "flex min-w-[450px] flex-col justify-center gap-10 pt-9 sm:pt-0 sm:w-full sm:gap-6 md:min-w-[60vw] md:max-w-[100%] ",
        className,
      )}
    >
      {children}
    </div>
  );
}
