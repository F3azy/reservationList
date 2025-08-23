import { useState, type FormEvent } from "react";
import { CarNetLogo } from "../assets";
import FormField from "./FormField";
import { useTableData } from "../context/TableDataContext";

const Navbar = () => {
  const [username, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const { login, loading, error } = useTableData();

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
    <nav className="w-full bg-dark-300 flex items-center justify-between px-40 py-4">
      <img src={CarNetLogo} alt="logo" />
      <form className="flex gap-x-4" onSubmit={(e) => SignIn(e)}>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
        <button className="bg-brand-primary rounded-sm px-3" type="submit">
          {loading ? "Loading..." : "Create Table"}
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
