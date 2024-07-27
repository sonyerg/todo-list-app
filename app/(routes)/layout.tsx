import React from "react";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const list = await prismadb.list.findFirst({
    where: {
      userId,
    },
  });

  if (list) {
    redirect(`/todo-list/${list.id}`);
  }

  return <>{children}</>;
}
