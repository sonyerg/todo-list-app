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
    const { item, isDone } = body;

    console.log("Request Body:", body); // Log the request body
    console.log("Params:", params); // Log the parameters

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if (!item) {
    //   return new NextResponse("Todo Item Required", { status: 400 });
    // }

    if (!params.listId) {
      return new NextResponse("List id is required", { status: 400 });
    }

    if (!params.itemId) {
      return new NextResponse("Item id is required", { status: 400 });
    }

    const dataToUpdate: any = {};
    if (item !== undefined) dataToUpdate.item = item;
    if (isDone !== undefined) dataToUpdate.isDone = isDone;

    const listItem = await prismadb.item.update({
      where: {
        id: params.itemId,
        listId: params.listId,
      },
      data: dataToUpdate,
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
