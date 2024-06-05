import Link from "next/link";
import Image from "next/image";

import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image quality="90" width="60" src={logo} alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Timber Trails
      </span>
    </Link>
  );
}

export default Logo;
