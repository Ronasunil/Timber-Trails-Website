import ReservationReminder from "@/components/ReservationReminder";
import ReservationProvider from "../_context/ReservationContext";

const { default: CabinCard } = require("@/components/CabinCard");
const { getCabins } = require("../_services/data-service");

export default async function CabinList({ size }) {
  const cabins = await getCabins();
  let displayedCabin = cabins;

  if (!cabins.length) return null;

  if (size === "small") {
    // prettier-ignore
    displayedCabin = cabins.filter((cabin) => cabin.maxCapacity >= 1 && cabin.maxCapacity <= 2);
  }

  if (size === "medium") {
    // prettier-ignore
    displayedCabin = cabins.filter(cabin => cabin.maxCapacity > 2 && cabin.maxCapacity <= 6);
  }

  if (size === "large") {
    displayedCabin = cabins.filter((cabin) => cabin.maxCapacity > 6);
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabin.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
      <ReservationReminder />
    </>
  );
}
