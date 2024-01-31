import { NavLink } from "react-router-dom";
import style from "./Navbar.module.scss";
import Logo from "../../assets/Logo.png";

export const Navbar = () => {
  return (
    <nav className={style.navbarStyle}>
      <div>
        <img src={Logo} alt="Mediesuset-logo" />
        <h4>4 - 7 Juli 2022</h4>
      </div>

      <ul>
        <li>
          <NavLink to="/forside">FORSIDE</NavLink>
        </li>
        <li>
          <NavLink to="/events">EVENTS</NavLink>
        </li>
        <li>
          <NavLink to="/camps">CAMPS</NavLink>
        </li>
        <li>
          <NavLink to="/billetter">BILLETTER</NavLink>
        </li>
        <li>
          <NavLink to="/info">PRAKTISK INFO</NavLink>
        </li>
        <li>
          <NavLink to="/login">LOGIN</NavLink>
        </li>
      </ul>
    </nav>
  );
};
