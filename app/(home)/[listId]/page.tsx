import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import backgroundImage from "@/public/images/background-image.jpg";
import { Button } from "@/components/ui/button";
import ListItems from "./components/list-items";

export default async function HomePage({
  params,
}: {
  params: { listId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const list = await prismadb.list.findUnique({
    where: {
      userId,
      id: params.listId,
    },
    include: {
      items: true,
    },
  });

  return (
    <div className="w-full">
      {/* <div className="flex items-center justify-between border-b h-10 px-2">
        <div className="flex items-center">
          <Button type="button" variant="ghost">
            <Ellipsis size="20" />
          </Button>
        </div>
      </div> */}
      <div className="sm:h-64 h-72 relative object-cover">
        <Image src={backgroundImage} alt="" fill className="object-cover" />
      </div>
      <div className="md:ml-36 lg:ml-44 ml-8 md:mt-20 mt-12">
        <p className="font-bold text-4xl">{list?.name}</p>
        <ListItems listItems={list?.items ?? []} />
      </div>
    </div>
  );
}
