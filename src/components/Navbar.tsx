import { useState, type FormEvent } from "react";
import { CarNetLogo } from "../assets";
import FormField from "./FormField";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [username, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const { login, loading, error } = useAuth();

  async function SignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.trim() === "" || pass.trim() === "") {
      return;
    }

    await login(username, pass);
    setPass("");
    setLogin("");
  }

  return (
    <nav className="w-full bg-dark-300 flex flex-col lg:flex-row gap-y-4 items-center justify-between px-2 lg:px-40 py-4">
      <img src={CarNetLogo} alt="logo" />
      <form className="w-full lg:w-auto flex flex-col lg:flex-row gap-x-4 gap-y-4" onSubmit={(e) => SignIn(e)}>
        {error && <p className="text-red-500 text-sm hidden">{error}</p>}
        <FormField
          id="login"
          name="login"
          placeholder="Login"
          type="text"
          value={username}
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
        <button className="bg-brand-primary rounded-sm px-3 py-2 w-full sm:w-auto" type="submit">
          {loading ? "Loading..." : "Create Table"}
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
