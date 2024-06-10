import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { checkUserExist } from "@/app/_services/data-service";

export async function POST(req) {
  const { email, password } = await req.json();

  // prettier-ignore
  if(!email || !password) return NextResponse.json({status:"fail", message:"Please provide email or password"}, {status:401})

  const user = await checkUserExist(email);

  console.log(!user, user);
  // prettier-ignore
  if(!user) return NextResponse.json({status:"Fail", message:"Invalid email or password"}, {status:401})

  const isPasswordCorrect = await compare(password, user.password);
  // prettier-ignore
  if (!isPasswordCorrect) return NextResponse.json({status:"Fail", message:"Invalid email or password"}, {status:401})

  const accessToken = sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30min",
  });
  const refreshToken = sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const response = NextResponse.json(
    { status: "Success", refreshToken, accessToken },
    { status: 200 }
  );

  const cookieStore = cookies(response);

  const now = new Date();
  const thrithDay = new Date(now);
  thrithDay.setDate(now.getDate() + 30);

  const refreshTokenExpire = thrithDay;

  cookieStore.set("refreshToken", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: refreshTokenExpire,
  });

  return response;
}
