import { auth } from "./app/api/auth/[...nextauth]/route";

import { getAccessToken, getUser } from "@/app/_auth/auth";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const localAuthCheck = async function (accessToken, refreshToken) {
  if (!refreshToken) return;

  // no access token get access token
  if (!accessToken) accessToken = await getAccessToken(refreshToken);

  // prettier-ignore
  if(!accessToken) return false;

  const decoded = jwtDecode(accessToken);
  // check is there avialable user
  const user = await getUser(decoded.email);

  return { user, accessToken };
};

export default async function middleware(req) {
  const session = await auth();

  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";

  console.log(accessToken, "j", refreshToken, "jujj");

  const localSession =
    refreshToken || accessToken
      ? await localAuthCheck(accessToken, refreshToken)
      : null;

  if (localSession && !accessToken) {
    const response = NextResponse.next();
    response.cookies.set("accessToken", localSession.accessToken);
    return response;
  }

  if (!session && !localSession) {
    const url = new URL("/", process.env.BASE_URL);

    return Response.redirect(url);
  }
}

export const config = {
  matcher: ["/account"],
};
