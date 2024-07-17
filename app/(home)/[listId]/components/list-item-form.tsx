"use client";

//TODO: add an edit feature for the item and api route for patch

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  item: z.string().min(1).max(50),
});

type ListItemFormValue = z.infer<typeof formSchema>;

interface ListItemFormProps {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ListItemForm({ setIsAdding }: ListItemFormProps) {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const form = useForm<ListItemFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
    },
  });

  const onSubmit = async (data: ListItemFormValue) => {
    try {
      setLoading(true);

      await axios.post(`/api/${params.listId}/items`, data);

      router.push(`/${params.listId}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsAdding(false);
    }
  };

  return (
    <div className="md:grid grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Add a to-do"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" variant="ghost" type="submit" disabled={loading}>
              <Check size={15} />
            </Button>
            <Button size="sm" variant="ghost" type="reset" disabled={loading}>
              <X size={15} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
