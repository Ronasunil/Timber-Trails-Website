import { currentLoggedinUser } from "../_auth/auth";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const { currentUser } = await currentLoggedinUser();
  return (
    <h2 className="font-semibold text-2xl  text-accent-400 mb-7">
      Welcome, {currentUser.name}
    </h2>
  );
}
