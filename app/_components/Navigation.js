import Link from "next/link";
import Image from "next/image";

import { auth } from "../api/auth/[...nextauth]/route";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl text-primary-50">
      <ul className="flex gap-10 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li className="flex justify-center  gap-1">
          <div
            className={`relative ${
              session?.user?.image && "w-10 h-10"
            } rounded-full`}
          >
            {session?.user?.image && (
              <Image
                src={session.user.image}
                fill
                className="object-cover rounded-full"
                alt={`profile image fo ${session.user.name}`}
              />
            )}
          </div>
          {!session?.user && (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors self-center"
            >
              Countinue with google
            </Link>
          )}
          {session?.user && (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors self-center"
            >
              Profile
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
