import { useState, type FormEvent } from "react";
import { CarNetLogo } from "../assets";
import FormField from "./FormField";

const Navbar = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const [loading, setLoading] = useState(false);

  async function SignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (login === "" || pass === "") {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://crs.carnet.pl/api/v1/common/authentication/jwt/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: login, password: pass }),
        }
      );

      if (!response.ok) throw new Error("\nCode: " + response.status);

      const json = await response.json();

      console.log(json);

      const response2 = await fetch(
        "https://crs.carnet.pl/api/v1/common/authentication/jwt/accessToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json.refreshToken),
        }
      );

      if (!response2.ok) throw new Error("\nCode: " + response2.status);

      const json2 = await response2.json();

      console.log(json2);
    } catch (error) {
      console.log(error);
    } finally {
      setPass("");
      setLogin("");
      setLoading(false);
    }
  }

  return (
    <nav className="w-full bg-dark-300 flex items-center justify-between px-40 py-4">
      <img src={CarNetLogo} alt="logo" />
      <form className="flex gap-x-4" onSubmit={SignIn}>
        <FormField
          id="login"
          name="login"
          placeholder="Login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <FormField
          id="pass"
          name="password"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="bg-brand-primary rounded-sm px-3" type="submit">
          {loading ? "Loading..." : "Create Table"}
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
