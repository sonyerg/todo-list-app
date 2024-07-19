import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { listId: string; itemId: string } }
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

    if (!params.listId) {
      return new NextResponse("List id is required", { status: 400 });
    }

    if (!params.itemId) {
      return new NextResponse("Item id is required", { status: 400 });
    }

    const listItem = await prismadb.item.updateMany({
      where: {
        id: params.itemId,
        listId: params.listId,
      },

      data: {
        item,
      },
    });

    return NextResponse.json(listItem);
  } catch (error) {
    console.log("[ITEM_PATCH]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listId: string; itemId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.itemId) {
      return new NextResponse("Item id is required", { status: 400 });
    }

    const item = await prismadb.item.deleteMany({
      where: {
        id: params.itemId,
        listId: params.listId,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log("[ITEM_DELETE]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
