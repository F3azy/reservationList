import useFetchLetOutId from "./useFetchLetOutId";
import useFetchReturnId from "./useFetchReturnId";
import useFetchReservationsByIds from "./useFetchReservationsByIds";
import type { Reservation } from "../types/reservation";

export function useTodayReservations() {
  // 1. get today's let-out & return IDs
  const { letOuts, loading: loadingLetOutIds, error: errorLetOutIds } = useFetchLetOutId();
  const { returns, loading: loadingReturnIds, error: errorReturnIds } = useFetchReturnId();

  // 2. fetch reservation details by ID
  const { reservations: letOutReservations, loading: loadingLetOuts, error: errorLetOuts } =
    useFetchReservationsByIds(letOuts);

  const { reservations: returnReservations, loading: loadingReturns, error: errorReturns } =
    useFetchReservationsByIds(returns);

  // 3. combine results
  const loading = loadingLetOutIds || loadingReturnIds || loadingLetOuts || loadingReturns;
  const error =
    errorLetOutIds || errorReturnIds || errorLetOuts || errorReturns || null;

  return {
    letOutReservations: letOutReservations as Reservation[],
    returnReservations: returnReservations as Reservation[],
    loading,
    error,
  };
}
