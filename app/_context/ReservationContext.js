"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: null, to: null };

export default function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const value = useContext(ReservationContext);
  if (value === undefined)
    throw new Error(`Can't use context out side provider`);

  return value;
}

export { useReservation };
