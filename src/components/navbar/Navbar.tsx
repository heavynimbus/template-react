import "./Navbar.scss";
import {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";

const Navbar: FunctionComponent = () => {
  return <nav className="Navbar">
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/counter">Counter</NavLink></li>
    </ul>
  </nav>
}

export default Navbar;
