"use client";

import { useState } from "react";
import { List } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import { useParams, useRouter } from "next/navigation";

export default function Lists({ lists }: { lists: List[] }) {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    try {
      setLoading(true);

      await axios.delete(`/api/lists/${params.listId}`);
      window.location.assign("/");
      router.refresh();
      toast.success("Store deleted");
    } catch (error: any) {
      toast.error("Error deleting list.");
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="flex flex-col gap-1 border rounded-md overflow-auto py-2 pr-2">
        {lists.length === 0 && (
          <div className="flex justify-center items-center w-full my-10">
            <p className="font-medium">No Lists Available</p>
          </div>
        )}
        {lists.map((list) => (
          <div
            key={list.id}
            className="group flex justify-between items-center"
          >
            <Link href={`/${list.id}`}>
              <Button variant="link" className="flex justify-start w-full">
                <p className="text-base font-medium">{list.name}</p>
              </Button>
            </Link>

            <Button
              variant="destructive"
              size="sm"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 p-0"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
