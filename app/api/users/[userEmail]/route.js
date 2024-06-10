import { NextResponse } from "next/server";

import { getGuest } from "@/app/_services/data-service";

export async function GET(_, { params }) {
  const { userEmail } = params;

  try {
    const res = await getGuest(userEmail);

    if (!res?.name)
      return NextResponse.json(
        { status: "fail", message: "User not founded in database" },
        { status: 404 }
      );

    return NextResponse.json({ status: "Success", data: res });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "fail", message: "User will not found in database" },
      { status: 404 }
    );
  }
}
