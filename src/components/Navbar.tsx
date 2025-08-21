import { CarNetLogo } from "../assets";
import FormField from "./FormField";


const Navbar = () => {
  return (
    <nav className="w-full bg-dark-300 flex items-center justify-between px-40 py-4">
      <img src={CarNetLogo} alt="logo" />
      <div className="flex gap-x-4">
        <FormField id="login"  name="login" placeholder="Login" type="text" />
        <FormField id="pass" name="password" placeholder="Password" type="password"/>
      </div>
    </nav>
  );
};

export default Navbar;
