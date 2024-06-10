import Link from "next/link";

import UserProfile from "./UserProfile";

export default async function Navigation() {
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
          <UserProfile />
        </li>
      </ul>
    </nav>
  );
}
