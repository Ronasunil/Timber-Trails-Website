import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    cookies().delete("refreshToken");
    cookies().delete("accessToken");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: err });
  }

  return NextResponse.json({ status: "success" });
}
