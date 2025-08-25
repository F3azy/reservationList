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

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // fetch each reservation in parallel
        const results = await Promise.all(
          ids.map((id) =>
            fetchJSON<Reservation>(
              `https://crs.carnet.pl/api/v1/os/rental/reservations/${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + accessToken,
                },
              }
            )
          )
        );

        setReservations(results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [accessToken]);

  return { reservations, loading, error };
}
