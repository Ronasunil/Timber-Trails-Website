"use client";

import { differenceInDays, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import { useReservation } from "../_context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, settings, bookingDates }) {
  const { setRange, range, resetRange } = useReservation();

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  const displayRange = isAlreadyBooked(range, bookingDates) ? {} : range;

  const { price, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from) + 1;
  const totalPrice = (price - discount) * numNights;

  // SETTINGS
  const { minBookingLength } = settings;
  const { maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        numberOfMonths={2}
        excludeDates={bookingDates}
        disabled={[...bookingDates, { before: tommorow }]}
        onSelect={(selectedDate) => {
          setRange({ from: selectedDate?.from, to: selectedDate?.to });
        }}
        selected={displayRange}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${price}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${totalPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
