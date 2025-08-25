import { useState } from "react";
import { fetchJSON } from "../utils/api";

const useAccessToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAccessToken(refreshToken: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchJSON<string>(
        "https://crs.carnet.pl/api/v1/common/authentication/jwt/accessToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refreshToken),
        }
      );

      return data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { fetchAccessToken, loading, error };
};

export default useAccessToken;
