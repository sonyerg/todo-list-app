"use client";

import { Button } from "@/components/ui/button";
import { Item } from "@prisma/client";
import { useState } from "react";
import ListItemForm from "./list-item-form";
import { Checkbox } from "@/components/ui/checkbox";

export default function ListItems({ listItems }: { listItems: Item[] }) {
  const [isAdding, setIsAdding] = useState(true);

  const onAddClick = () => {
    setIsAdding(true);
  };

  return (
    <div className="mt-2">
      {listItems.map((list) => (
        <div key={list.id} className="flex flex-row items-center gap-2 py-2">
          <Checkbox />
          <p className="text-base">{`${list.item}`}</p>
        </div>
      ))}
      {isAdding && <ListItemForm setIsAdding={setIsAdding} />}
      <div className="pt-4">
        <Button variant="default" onClick={onAddClick}>
          + Add an item
        </Button>
      </div>
    </div>
  );
}
