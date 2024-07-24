"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, isEditing]);

  async function onCheck(itemId: string) {
    try {
      setIsLoading(itemId);

      // determine the new isDone value based on the current item state
      const itemToUpdate = listItems.find((item) => item.id === itemId);
      const isDone = itemToUpdate ? !itemToUpdate.isDone : false;

      await axios.patch(`/api/${params.listId}/items/${itemId}`, {
        isDone: isDone,
      });

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setIsLoading(null);
        setIsEditing(null);
      }, 700);
    }
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
      }, 1000);
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
    <div className="mt-2 pl-8">
      {listItems.map((item, index) => (
        <div key={item.id} className="flex flex-row items-center gap-2 group">
          <Checkbox
            disabled={isLoading === item.id}
            checked={item.isDone}
            onCheckedChange={() => onCheck(item.id)}
          />
          {isEditing === index ? (
            <div className="flex flex-row items-center gap-2 ">
              <Input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                disabled={isLoading === item.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSave(item.id);
                  }
                }}
                className="text-base"
              />
              {isLoading === item.id ? (
                <CircularProgress size="sm" />
              ) : (
                <Button
                  variant="ghost"
                  type="submit"
                  onClick={() => onSave(item.id)}
                  disabled={isLoading === item.id}
                >
                  Save
                </Button>
              )}

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
                      item.isDone ? "line-through" : ""
                    } ${isLoading === item.id ? "text-gray-500" : ""}`}
                  >
                    {item.item}
                  </p>
                </div>
              </Button>
              {isLoading === item.id ? (
                <CircularProgress size="sm" />
              ) : (
                <button
                  onClick={() => onDelete(item.id)}
                  className="group-hover:opacity-100 opacity-0"
                >
                  <X size={20} />
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
