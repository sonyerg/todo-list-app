"use client";

import Link from "next/link";
import { List } from "@prisma/client";

import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export default function Lists({ lists }: { lists: List[] }) {
  return (
    <div className="flex flex-col gap-1 border rounded-md overflow-auto py-2 pr-2">
      {lists.length === 0 && (
        <div className="flex justify-center items-center w-full my-10">
          <p className="font-medium">No Lists Available</p>
        </div>
      )}
      {lists.map((list) => (
        <div key={list.id} className="group flex justify-between items-center">
          <Link href={`/${list.id}`}>
            <Button variant="link" className="flex justify-start w-full">
              <p className="text-base font-medium">{list.name}</p>
            </Button>
          </Link>

          <Button
            variant="destructive"
            size="sm"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 p-0"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
