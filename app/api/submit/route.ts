import { save } from "@/app/(app)/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  save(body.id, body.data);

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
};
