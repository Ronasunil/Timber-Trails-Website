import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[18rem_1fr] gap-12 h-[80vh]">
      <aside>
        <SideNavigation />
      </aside>
      <main>{children}</main>
    </div>
  );
}
