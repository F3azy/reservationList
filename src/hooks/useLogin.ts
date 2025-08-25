import { useState } from "react";
import { fetchJSON } from "../utils/api";

type LoginResponseType = {
  refreshToken: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginUser(username: string, pass: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchJSON<LoginResponseType>(
        "https://crs.carnet.pl/api/v1/common/authentication/jwt/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: username, password: pass }),
        }
      );

      return data.refreshToken;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loginUser, loading, error };
};

export default useLogin;
