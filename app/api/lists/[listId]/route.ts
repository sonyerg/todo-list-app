import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Todo Item Required", { status: 400 });
    }

    if (!params.listId) {
      return new NextResponse("List id is required", { status: 400 });
    }

    const list = await prismadb.list.updateMany({
      where: {
        userId,
        id: params.listId,
      },

      data: {
        name,
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.log("[LIST_PATCH", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.listId) {
      return new NextResponse("List id is required", { status: 400 });
    }

    const list = await prismadb.list.deleteMany({
      where: {
        userId,
        id: params.listId,
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.log("[LIST_DELETE]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
