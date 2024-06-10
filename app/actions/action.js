"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
  createBooking as createBookingApi,
} from "../_services/data-service";

import { auth, signIn, signOut } from "../api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import { currentLoggedinUser } from "../_auth/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData) {
  const { currentUser } = await currentLoggedinUser();

  // checking is authenticated user doing action
  if (!currentUser) return;

  // checking values are safe
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalid = formData.get("nationalid");

  if (!nationality) return;

  if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,12}$/.test(nationalid)) return;

  await updateGuest(currentUser.guestId, {
    nationalid,
    nationality,
    countryFlag,
  });

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const { currentUser } = await currentLoggedinUser();

  if (!currentUser) throw new Error("Please login");

  const bookings = await getBookings(currentUser.guestId);
  const bookingIds = bookings.map((b) => b.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("Booking cannot be deleted");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const { currentUser } = await currentLoggedinUser();

  // checking is authenticated user doing action
  if (!currentUser) throw new error("Please login");

  const numGuest = +formData.get("numGuest");
  const maxGuest = +formData.get("maxCapacity");
  const observation = formData.get("observation");
  const bookingId = formData.get("bookingId");

  if (numGuest > maxGuest)
    throw new Error(`No of guest should be less than ${maxGuest}`);

  const updatedBooking = { numGuest, observation };

  await updateBooking(bookingId, updatedBooking);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  console.log(formData, bookingData);

  const { currentUser } = await currentLoggedinUser();

  if (!currentUser) throw new Error("Please Login");

  const booking = {
    ...bookingData,
    numGuest: Number.parseInt(formData.get("numOfGuest")),
    observation: formData.get("observation").slice(0, 700),
    guestId: currentUser.guestId,
    totalPrice: bookingData.price,
    extraPrice: 0,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };

  await createBookingApi(booking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thank-you");
}
