import { NavLink } from "react-router-dom";
import style from "./Navbar.module.scss";
import Logo from "../../assets/Logo.png";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Navbar = () => {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData();
  };

  return (
    <nav className={style.navbarStyle}>
      <div className={style.navbarGrid}>
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
        {!userData ? (
          <li>
            <NavLink to="/login">LOGIN</NavLink>
          </li>
        ) : (
          <div className={style.dropDown}>
            <li className={style.dropDownButton}>
              <NavLink to="/">MIN SIDE</NavLink>
            </li>
            <div className={style.dropDownContent}>
              <li>
                <NavLink to="/">MIT PROGRAM</NavLink>
              </li>
              <li>
                <NavLink onClick={() => logout()}>LOG UD</NavLink>
              </li>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};
