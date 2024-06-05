"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Filter({ filterOption, filters }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const handleClick = function (filterValue) {
    const param = new URLSearchParams(searchParams);
    param.set(filterOption, filterValue);
    router.push(`${path}/?${param.toString()}`);
  };

  let activeFilter = searchParams?.get(filterOption) ?? "all";

  return (
    <div className="flex flex-wrap   border border-primary-950 ">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          filter={filter}
          filterFn={handleClick}
          activeFilter={activeFilter}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}

function Button({ children, filterFn, filter, activeFilter }) {
  return (
    <button
      onClick={() => filterFn(filter.value)}
      className={`hover:bg-primary-950 border-l-2 px-5 py-3 border-primary-950 text-primary-50 ${
        activeFilter === filter.value && "bg-primary-950 "
      } `}
      key={filter.value}
    >
      {children}
    </button>
  );
}
