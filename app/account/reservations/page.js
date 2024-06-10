import { currentLoggedinUser } from "@/app/_auth/auth";
import ReservationList from "@/app/_components/ReservationList";
import { getBookings } from "@/app/_services/data-service";

export const metadata = {
  title: "reservation",
};

export default async function Page() {
  const { currentUser } = await currentLoggedinUser();

  console.log(currentUser, "lop");

  const bookings = await getBookings(currentUser?.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
