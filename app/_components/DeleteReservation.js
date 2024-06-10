"use client";

import { useTransition } from "react";

import DeleteContent from "./DeleteContent";

function DeleteReservation({ bookingId, handleDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDeletion() {
    startTransition(() => handleDelete(bookingId));
  }

  return (
    <button
      onClick={handleDeletion}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <DeleteContent isPending={isPending} />
    </button>
  );
}

export default DeleteReservation;
