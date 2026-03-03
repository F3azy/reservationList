import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchJSON } from "../utils/api";
import { returnFilter } from "../const/fetchFilters";
import type { ApiResponse } from "../types/reservation";
import { getReturnId } from "../utils/dataFilter";
import { useDate } from "../context/useDateContext";

const useFetchReturnId = () => {
  const { accessToken } = useAuth();

    const {date} = useDate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [returns, setReturns] = useState<string[]>([]);

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
            body: JSON.stringify(returnFilter),
          }
        );

        setReturns(getReturnId(data.data, date));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [accessToken, date]);

  return { returns, loading, error };
};

export default useFetchReturnId;
