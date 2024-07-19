"use client";

import { Item } from "@prisma/client";

import ListItemForm from "./list-item-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

//TODO: add edit and delete function for items.
//TODO: add initial data in list-item-form and make if-else whether to patch or to post.

export default function ListItems({ listItems }: { listItems: Item[] }) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(listItems.length).fill(false)
  );

  function onCheck(index: number) {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    // Toggle checked state for the specific item

    setCheckedItems(newCheckedItems);
  }

  return (
    <div className="mt-2">
      {listItems.map((list, index) => (
        <div key={list.id} className="flex flex-row items-center gap-2 py-2">
          <Checkbox onCheckedChange={() => onCheck(index)} />
          <div className="md:w-[300px] w-[350px]">
            <p
              className={`text-base overflow-hidden overflow-ellipsis ${
                checkedItems[index] ? "line-through" : ""
              }`}
            >{`${list.item}`}</p>
          </div>
        </div>
      ))}
      <ListItemForm />
    </div>
  );
}
