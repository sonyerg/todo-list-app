import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { SignInButton } from "./sign-in-button";
import Lists from "./lists";

import NewListButton from "./new-list-button";
import { Separator } from "./ui/separator";

export default async function SideBar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const lists = await prismadb.list.findMany({
    where: {
      userId,
    },
  });

  return (
    <aside className="w-full px-4 h-screen mt-2 space-y-2">
      <div className="mt-4">
        {!userId && <SignInButton />}
        {userId && <UserButton />}
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase md:text-lg">
          <Link href={"/"}>Todo Lists</Link>
        </h2>
        <NewListButton />
      </div>
      <Lists lists={lists} />
    </aside>
  );
}
