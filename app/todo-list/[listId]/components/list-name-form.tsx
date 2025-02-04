"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Check, Edit, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1).max(20),
});

type ListNameFormValue = z.infer<typeof formSchema>;

export default function ListNameForm({ listName }: { listName: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<ListNameFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: ListNameFormValue) => {
    try {
      setLoading(true);

      await axios.patch(`/api/lists/${params.listId}`, data);
      toast.success("List Name Edited!");

      router.push(`/${params.listId}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsEditing(false);
      }, 500);
    }
  };

  function onEdit() {
    setIsEditing(true);
  }

  return (
    <div className="flex flex-row items-center gap-2">
      {/** TODO: fix overflow */}
      {!isEditing && (
        <>
          <Button variant="ghost" onClick={onEdit} className="p-6 ml-0">
            <p className="font-bold text-3xl overflow-hidden">{listName}</p>
          </Button>
        </>
      )}

      {isEditing && (
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-2 items-center ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={listName}
                          {...field}
                          className="h-12 md:w-[350px] w-[250px] text-3xl font-bold"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  type="submit"
                  disabled={loading}
                >
                  <Check size={30} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={loading}
                  onClick={() => setIsEditing(false)}
                >
                  <X size={30} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
