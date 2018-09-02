import * as React from "react";
import { NavLink } from "react-router-dom";

// export interface ISideNavContentProps {

// }

// export interface ISideNavContentState {

// }

class SideNavContent extends React.Component {
  public render() {
    return (
      <ul className="nav-menu">
        <li className="nav-header">create</li>

        <li className="menu no-arrow">
          <NavLink to="/">
            <i className="zmdi zmdi-home zmdi-hc-fw" />
            <span className="nav-text">Main</span>
          </NavLink>
        </li>

        <li className="menu no-arrow">
          <NavLink to="/campaign">
            <i className="zmdi zmdi-archive zmdi-hc-fw" />
            <span className="nav-text">Campaign</span>
          </NavLink>
        </li>

        <li className="menu no-arrow">
          <NavLink to="/news">
            <i className="zmdi zmdi-tap-and-play zmdi-hc-fw" />
            <span className="nav-text">News</span>
          </NavLink>
        </li>

        <li className="menu no-arrow">
          <NavLink to="/aboutus">
            <i className="zmdi zmdi-airplay zmdi-hc-fw" />
            <span className="nav-text">About us</span>
          </NavLink>
        </li>

        <li className="menu no-arrow">
          <NavLink to="/faq">
            <i className="zmdi zmdi-developer-board zmdi-hc-fw" />
            <span className="nav-text">FAQs</span>
          </NavLink>
        </li>

        <li className="nav-header">create</li>

        <li className="menu no-arrow">
          <NavLink to="/campaign/create/basic">
            <i className="zmdi zmdi-format-subject zmdi-hc-fw" />
            <span className="nav-text">create campaign</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default SideNavContent;
