"use client";

import { Button } from "@/components/ui/button";
import { Item } from "@prisma/client";
import { useState } from "react";
import ListItemForm from "./list-item-form";
import { Checkbox } from "@/components/ui/checkbox";

/*TODO: 
  1. Add button to add a new item.
  2. Use useState to show an "input bar" where you can input the new item.
  3. Hide the "input bar" when submitted.
  4. Add an api route to add new item to the current selected list.
*/

export default function ListItems({ listItems }: { listItems: Item[] }) {
  const [isAdding, setIsAdding] = useState(false);

  const onAddClick = () => {
    setIsAdding(true);
  };

  return (
    <div className="p-10">
      {listItems.map((list) => (
        <div
          key={list.id}
          className="flex flex-row items-center  gap-2 space-y-2"
        >
          <Checkbox />
          <p>{`${list.item}`}</p>
        </div>
      ))}
      {isAdding && <ListItemForm />}
      <div>
        <Button variant="ghost" onClick={onAddClick}>
          + Add an item
        </Button>
      </div>
    </div>
  );
}
