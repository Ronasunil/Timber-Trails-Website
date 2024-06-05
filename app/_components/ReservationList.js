"use client";
import { useOptimistic } from "react";

import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../actions/action";

export default function ReservationList({ bookings }) {
  const [optimisticState, addOptimistic] = useOptimistic(
    bookings,
    (curState, bookingId) => {
      return curState.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDelete = async function (bookingId) {
    addOptimistic(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticState.map((booking) => (
        <ReservationCard
          handleDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
