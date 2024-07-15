"use client";

import { ScrollText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full h-[50%]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <ScrollText size={50} />
          <p className="font-semibold">Select a List</p>
        </div>
      </div>
    </div>
  );
}
