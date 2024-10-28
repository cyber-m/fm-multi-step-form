import { MultiForm } from "@/components/form/MultiForm";

export default function Home() {
  return (
    <div className="flex justify-center [@media(max-height:600px)]:items-start p-4 [@media(max-height:600px)]:h-full items-center sm:items-start h-[100svh] sm:h-[unset]  font-[family-name:var(--font-ubuntu)] md:relative md:px-4 sm:pt-24">
      <MultiForm />
    </div>
  );
}
