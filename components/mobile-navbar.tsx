import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";
import MobileMenu from "./mobile-menu";
import prismadb from "@/lib/prismadb";

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
      {!userId && (
        <div className="mr-4">
          <SignInButton />
        </div>
      )}
      {userId && (
        <div className="mr-4 mt-2">
          <UserButton />
        </div>
      )}
    </div>
  );
}
