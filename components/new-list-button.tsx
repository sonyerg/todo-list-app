"use client";

import { useListModal } from "@/hooks/use-list-modal";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function NewListButton() {
  const listModal = useListModal();

  return (
    <Button onClick={listModal.onOpen} className="w-12 h-8">
      <Plus size={20} />
    </Button>
  );
}
