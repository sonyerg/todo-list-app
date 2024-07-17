import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { item } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!item) {
      return new NextResponse("Todo Item Required", { status: 400 });
    }

    const listItem = await prismadb.item.create({
      data: {
        item,
        listId: params.listId,
      },
    });

    return NextResponse.json(listItem);
  } catch (error) {
    console.log("[LIST_ITEM_POST]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
