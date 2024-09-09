import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX } from "react/jsx-runtime";

export default function Home(): JSX.Element {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <Button> Submit</Button>
    </div>
  );
}
