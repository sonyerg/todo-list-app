"use client";

import axios from "axios";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import Modal from "@/components/ui/modal";
import { useListModal } from "@/hooks/use-list-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

export default function ListModal() {
  const listModal = useListModal();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      await axios.post("/api/lists", values);
      toast.success("List created!");

      router.refresh();
      listModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Create List"
      description="Add a new List"
      isOpen={listModal.isOpen}
      onClose={listModal.onClose}
    >
      <div>
        <div
          className="
        space-y-4 
        py-2 
        pb-4"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>List Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="List Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className="
              pt-6 
              space-x-2 
              flex 
              items-center 
              justify-end"
              >
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={listModal.onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
