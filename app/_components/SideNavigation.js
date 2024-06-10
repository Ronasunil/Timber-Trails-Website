"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOutAction } from "../actions/action";
import { logout } from "../utils/helpers";
import { useTransition } from "react";
import SpinnerMini from "@/components/SpinnerMini";

function handleLogout() {
  signOutAction?.();
  logout?.();
}

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const path = usePathname();
  const [isPending, startTransition] = useTransition();

  console.log(path);
  return (
    <nav className="border-r border-x-primary-800 h-full">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`${
                path === link.href && "bg-primary-950"
              } py-3 px-5 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <form
            action={() => {
              startTransition(() => handleLogout());
            }}
          >
            <SignOutButton>
              {isPending ? <SpinnerMini /> : "Sign out"}
            </SignOutButton>
          </form>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
