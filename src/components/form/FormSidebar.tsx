import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type StepProps = {
  isActive?: boolean;
  children: React.ReactNode;
  stepNumber: number;
} & React.HTMLProps<HTMLDivElement>;

function Step({ stepNumber, isActive, children }: StepProps) {
  return (
    <div className="flex items-center gap-3 sm:text-center md:flex-col md:text-center">
      <div
        className={cn(
          "grid min-h-8 min-w-8 place-items-center rounded-full border border-lightGray font-bold text-white",
          isActive && "border-lightBlue bg-lightBlue text-primary",
        )}
      >
        {stepNumber}
      </div>
      <div className="flex flex-col justify-between sm:hidden">
        <p className="text-nowrap text-xs uppercase text-lightGray">Step {stepNumber}</p>
        {children}
      </div>
    </div>
  );
}
type StepperProps = {
  children?: React.ReactNode;
  active: number;
} & React.HTMLProps<HTMLDivElement>;

function Stepper({ active, children, ...props }: StepperProps) {
  return (
    <div {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isActive = index + 1 === active;
          return React.cloneElement(child, { isActive } as StepProps);
        }
        return child;
      })}
    </div>
  );
}

type FormSidebarProps = {
  active: number;
  className: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
};
export default function FormSidebar({ active, className, image, imageWidth, imageHeight }: FormSidebarProps) {
  const steps = ["Your Info", "Select plan", "Add-ons", "Summary"];
  return (
    <div
      className={cn(
        "sm:w-max-full relative z-0 flex h-[568px] w-[274px] min-w-32 justify-start overflow-hidden rounded-lg sm:fixed sm:left-0 sm:top-0 sm:h-[172px] sm:overflow-visible sm:w-full md:justify-center",
        className,
      )}
    >
      <Image
        width={imageWidth}
        height={imageHeight}
        className="absolute z-0 block h-full w-full object-cover"
        src={image}
        alt=""
      />
      <Stepper
        className="absolute z-10 flex flex-col gap-8 px-8 py-10 sm:flex-row sm:gap-2 sm:p-8 md:px-4"
        active={active}
      >
        {steps.map((e, i) => (
          <Step key={i} stepNumber={i + 1}>
            <p className="text-[clamp(0.5rem,1.5vw,0.875rem)] font-bold uppercase tracking-[0.07rem] text-white sm:hidden">
              {e}
            </p>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
