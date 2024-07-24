import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";
import MobileMenu from "./mobile-menu";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

export default async function MobileNavBar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const lists = await prismadb.list.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="h-12 w-full flex flex-row items-center justify-between">
      <MobileMenu lists={lists} />
      <div className="flex flex-row items-center pr-2 gap-x-3">
        <ThemeToggle />
        <div className="mt-2">
          {!userId && <SignInButton />}
          {userId && <UserButton />}
        </div>
      </div>
    </div>
  );
}
