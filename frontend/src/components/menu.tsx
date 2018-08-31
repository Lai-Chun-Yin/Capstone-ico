import * as React from "react";
import { Link, NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// export interface IMenuProps {

// }

// export interface IMenuState {

// }

class Menu extends React.Component {
  public render() {
    return (
      <div className="app-main-menu d-none d-md-block">
        <ul className="navbar-nav navbar-nav-mega">
          <li className="nav-item active">
            <Link to="/">
              <span>Main</span>
            </Link>
          </li>
          <li className="nav-item">
            <NavLink to="/campaign">
              <span>Campaign</span>
            </NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/campaign/create/basic">
                <span>Create Campaign</span>
              </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/news">
              <span>News</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about-us">
              <span>About us</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/faq">
              <span>FAQs</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
