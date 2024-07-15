"use client";

import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import backgroundImage from "@/public/images/background-image.jpg";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { useListModal } from "@/hooks/use-list-modal";

export default function HomePage() {
  const listModal = useListModal();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b h-10 px-2">
        <p className="font-semibold text-xl">List Name</p>
        <div className="flex items-center">
          <Button type="button" variant="ghost">
            <Ellipsis size="20" />
          </Button>
        </div>
      </div>

      <p>Not signed-in page</p>
      <Button onClick={listModal.onOpen} className="w-12 h-8">
        <Plus size={20} />
      </Button>
    </div>
  );
}
