import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchJSON } from "../utils/api";
import type { Reservation } from "../types/reservation";

export default function useFetchReservationsByIds(ids: string[]) {
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!accessToken || ids.length === 0) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          ids.map((id) =>
            fetchJSON<Reservation>(
              `https://crs.carnet.pl/api/v1/os/rental/reservations/${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + accessToken,
                },
                signal, // pass signal to fetchJSON if it supports it
              }
            )
          )
        );

        if (!signal.aborted) {
          setReservations(results);
        }
      } catch (err: any) {
        if (!signal.aborted) setError(err.message || "Error fetching reservations");
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    fetchData();

    // cleanup: abort fetch if dependencies change
    return () => controller.abort();
  }, [accessToken, ids]);

  return { reservations, loading, error };
}
