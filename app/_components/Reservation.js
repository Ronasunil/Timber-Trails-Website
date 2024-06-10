import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {
  getBookedDatesByCabinId,
  getSettings,
} from "../_services/data-service";
import { auth } from "../api/auth/[...nextauth]/route";
import { currentLoggedinUser } from "../_auth/auth";

export default async function Reservation({ cabin }) {
  const { currentUser, profileImg } = await currentLoggedinUser();
  const { id } = cabin;

  const [settings, bookingDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(id),
  ]);

  return (
    <div className="grid grid-cols-2 text-xl gap-2 text-primary-50 mt-10 border-2 border-primary-950">
      <DateSelector
        cabin={cabin}
        bookingDates={bookingDates}
        settings={settings}
      />
      <ReservationForm
        cabin={cabin}
        user={currentUser}
        profileImage={profileImg}
      />
    </div>
  );
}
