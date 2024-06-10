// "use client";
import Image from "next/image";
import Link from "next/link";
import { currentLoggedinUser } from "../_auth/auth";

export default async function UserProfile() {
  // deciding who is currently loggedin
  const { currentUser, profileImg } = await currentLoggedinUser();
  console.log(currentUser);
  return (
    <>
      <div
        className={`relative ${currentUser?.image && "w-10 h-10"} rounded-full`}
      >
        {currentUser?.image && (
          <Image
            src={profileImg || currentUser?.image}
            fill
            className="object-cover rounded-full"
            alt={`profile image of user`}
          />
        )}
      </div>
      {!currentUser && (
        <Link
          href="/login"
          className="hover:text-accent-400 transition-colors self-center"
        >
          Login
        </Link>
      )}{" "}
      {currentUser && (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors self-center"
        >
          {currentUser.name}
        </Link>
      )}
    </>
  );
}
