import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { refreshToken } = await req.json();

  //   prettier-ignore
  if(!refreshToken) return NextResponse.json({status:"fail", message:"Please provide a refresh token"}, {status: 401})

  try {
    const payload = verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = sign({ email: payload.email }, process.env.JWT_SECRET, {
      expiresIn: "30min",
    });

    return NextResponse.json({ status: "Success", accessToken });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "fail", message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
