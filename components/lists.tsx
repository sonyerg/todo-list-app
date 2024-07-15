import Link from "next/link";
import { List } from "@prisma/client";

import { Button } from "./ui/button";

export default async function Lists({ lists }: { lists: List[] }) {
  return (
    <div className="flex flex-col gap-1">
      {lists.map((list) => (
        <Link key={list.id} href={`/${list.id}`}>
          <Button variant="link" className="flex justify-start w-full">
            <p className="text-base font-medium">{list.name}</p>
          </Button>
        </Link>
      ))}
    </div>
  );
}
