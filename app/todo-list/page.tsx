"use client";

import { ScrollText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="justify-center w-full h-96 flex items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <ScrollText size={50} />
        <p className="font-semibold">Select a List</p>
      </div>
    </div>
  );
}
