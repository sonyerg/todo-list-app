import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name Required", { status: 400 });
    }

    const list = await prismadb.list.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(list);
  } catch (error) {}
}
