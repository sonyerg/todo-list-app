"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Item } from "@prisma/client";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import CircularProgress from "@mui/joy/CircularProgress";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListItemForm from "./list-item-form";

export default function ListItems({ listItems }: { listItems: Item[] }) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(listItems.length).fill(false)
  );
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const params = useParams();
  const router = useRouter();

  function onCheck(index: number) {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    // Toggle checked state for the specific item

    setCheckedItems(newCheckedItems);
  }

  function onEditClick(index: number, currentItem: string) {
    setIsEditing(index);
    setEditValue(currentItem);
  }

  async function onSave(itemId: string) {
    try {
      setIsLoading(itemId);

      await axios.patch(`/api/${params.listId}/items/${itemId}`, {
        item: editValue,
      });

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setIsLoading(null);
      setIsEditing(null);
      }, 500);
    }
  }

  async function onDelete(itemId: string) {
    try {
      setIsLoading(itemId);

      await axios.delete(`/api/${params.listId}/items/${itemId}`);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-2">
      {listItems.map((item, index) => (
        <div key={item.id} className="flex flex-row items-center gap-2 group">
          <Checkbox onCheckedChange={() => onCheck(index)} />
          {isEditing === index ? (
            <div className="flex flex-row items-center gap-2 ">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="text-base"
              />
              <Button
                variant="ghost"
                onClick={() => onSave(item.id)}
                disabled={isLoading === item.id}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(null)}
                disabled={isLoading === item.id}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                className="flex justify-between"
                onClick={() => onEditClick(index, item.item)}
              >
                <div className="md:w-[350px] w-[320px]">
                  <p
                    className={`text-base text-left overflow-hidden overflow-ellipsis ${
                      checkedItems[index] ? "line-through" : ""
                    } ${isLoading === item.id ? "text-gray-500" : ""}`}
                  >
                    {item.item}
                  </p>
                </div>
              </Button>
              {isLoading === item.id ? (
                <CircularProgress size="sm" />
              ) : (
                <button onClick={() => onDelete(item.id)}>
                  <X size={20} className="group-hover:opacity-100 opacity-0" />
                </button>
              )}
            </>
          )}
        </div>
      ))}
      <ListItemForm />
    </div>
  );
}
