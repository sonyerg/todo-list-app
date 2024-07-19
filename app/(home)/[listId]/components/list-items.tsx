"use client";

import { Item } from "@prisma/client";

import ListItemForm from "./list-item-form";
import { Checkbox } from "@/components/ui/checkbox";

//TODO: add edit and delete function for items.
//TODO: add initial data in list-item-form and make if-else whether to patch or to post.

export default function ListItems({ listItems }: { listItems: Item[] }) {
  return (
    <div className="mt-2">
      {listItems.map((list) => (
        <div key={list.id} className="flex flex-row items-center gap-2 py-2">
          <Checkbox />
          <div className="md:w-[300px] w-[350px]">
            <p className="text-base overflow-hidden overflow-ellipsis">{`${list.item}`}</p>
          </div>
        </div>
      ))}
      <ListItemForm />
    </div>
  );
}
