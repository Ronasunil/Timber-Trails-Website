import { auth } from "./app/api/auth/[...nextauth]/route";

export default async function routeProtector(req) {
  const session = await auth();
  console.log(session, "hello");

  if (!session?.user) {
    const url = new URL("/", process.env.BASE_URL);
    return Response.redirect(url);
  }
}

export const config = {
  matcher: ["/account"],
};
