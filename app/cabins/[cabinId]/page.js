import CabinDetail from "@/app/_components/CabinDetail";
import { getCabin, getCabins } from "@/app/_services/data-service";

export async function generateMetadata({ params }) {
  const { cabinId } = params;
  const { name } = await getCabin(cabinId);

  const metadata = {
    title: `cabin ${name}`,
  };

  return metadata;
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => {
    return { cabinId: String(cabin.id) };
  });

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = params;

  const cabin = await getCabin(cabinId);

  return <CabinDetail cabin={cabin} />;
}
