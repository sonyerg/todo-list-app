import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import backgroundImage from "@/public/images/background-image.jpg";
import ListItems from "./components/list-items";
import { Edit } from "lucide-react";
import ListNameForm from "./components/list-name-form";

export default async function ListPage({
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

  if (!list) {
    redirect("/");
  }

  const listItems = await prismadb.item.findMany({
    where: {
      listId: params.listId,
    },
    orderBy: {
      createdAt: "asc",
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
      <div className="md:ml-36 lg:ml-32 ml-8 md:mt-20 mt-12 mr-20">
        <ListNameForm listName={list?.name || ""} />
        <ListItems listItems={listItems} />
      </div>
    </div>
  );
}
