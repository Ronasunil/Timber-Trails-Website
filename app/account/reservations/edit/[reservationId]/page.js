import { getBooking, getCabin } from "@/app/_services/data-service";

import UpdateReservation from "@/app/_components/UpdateReservation";

export default async function Page({ params }) {
  const { reservationId } = params;
  console.log(await getBooking(reservationId), "helloop");
  const { cabinId, observation, numGuest } = await getBooking(reservationId);

  const { maxCapacity } = await getCabin(cabinId);

  const reservationDetails = {
    observation,
    numGuest,
    maxCapacity,
    reservationId,
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <UpdateReservation reservationDetails={reservationDetails} />
    </div>
  );
}
