import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="z-10  border-b border-primary-900 px-8 py-5  w-screen">
      <div className="flex items-center justify-between max-w-7xl ml-auto mr-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
