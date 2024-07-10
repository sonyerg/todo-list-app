import Image from "next/image";
import { Ellipsis } from "lucide-react";

import backgroundImage from "@/public/images/background-image.jpg";
import { Button } from "@/components/ui/button";

export default function RootPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b h-10 px-2">
        <p className="font-semibold text-xl px-4">List Name</p>
        <Button type="button" variant="ghost">
          <Ellipsis size="20" />
        </Button>
      </div>
      <div className="sm:h-56 h-72 relative object-cover">
        <Image src={backgroundImage} alt="" fill className="object-cover" />
      </div>
      <p>View the selected lists</p>
    </div>
  );
}
