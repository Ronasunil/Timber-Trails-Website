import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import { Josefin_Sans } from "next/font/google";

import "@/app/_styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: {
    template: "%s | Timber Trails",
    default: "Timber Trails",
  },

  description:
    "Timber Trails offers a range of wooden cabin stays, from premium to affordable, to suit every guest's budget.",
};

const josefin = Josefin_Sans({
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} h-screen relative bg-primary-900 overflow-x-hidden antialiased text-primary-50`}
      >
        <Header>
          <Logo />
          <Navigation />
        </Header>
        <div className="  flex-1  px-8 py-5 h-[80vh]">
          <main className="max-w-7xl mx-auto pb-10 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
