import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchJSON } from "../utils/api";
import { letOutFIlter } from "../const/fetchFilters";
import { filterTodayLetOuts } from "../utils/dataFilter";
import type { ApiResponse, SlimReservation } from "../types/reservation";

const useFetchLetOut = () => {
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [letOuts, setLetOuts] = useState<SlimReservation[]>([]);

  useEffect(() => {
    if (!accessToken) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchJSON<ApiResponse>(
          "https://crs.carnet.pl/api/v1/os/rental/reservations/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(letOutFIlter),
          }
        );

        setLetOuts(filterTodayLetOuts(data.data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [accessToken]);

  return { letOuts, loading, error };
};

export default useFetchLetOut;
