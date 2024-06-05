import ReservationProvider from "../_context/ReservationContext";

export default function layout({ children }) {
  return <ReservationProvider>{children}</ReservationProvider>;
}
