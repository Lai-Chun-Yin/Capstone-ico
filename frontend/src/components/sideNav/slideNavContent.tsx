import Divider from "@material-ui/core/Divider";
import * as React from "react";
import { NavLink } from "react-router-dom";
import CustomScrollbar from "../common/customScrollbar";

export interface ISideNavContentProps {
  linkClick: () => void;
}

// export interface ISideNavContentState {

// }

class SideNavContent extends React.Component<ISideNavContentProps> {
  public render() {
    const { linkClick } = this.props;

    return (
      <CustomScrollbar className="scrollbar">
        <ul className="nav-menu">
          <li className="nav-header">pages</li>

          <li className="menu no-arrow">
            <NavLink to="/" onClick={linkClick}>
              <i className="zmdi zmdi-home zmdi-hc-fw" />
              <span className="nav-text">Main</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/campaign" onClick={linkClick}>
              <i className="zmdi zmdi-case-play zmdi-hc-fw" />
              <span className="nav-text">Campaign</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/news" onClick={linkClick}>
              <i className="zmdi zmdi-tap-and-play zmdi-hc-fw" />
              <span className="nav-text">News</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/blog" onClick={linkClick}>
              <i className="zmdi zmdi-comment-text zmdi-hc-fw" />
              <span className="nav-text">Blog</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/aboutus" onClick={linkClick}>
              <i className="zmdi zmdi-airplay zmdi-hc-fw" />
              <span className="nav-text">About us</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/faq" onClick={linkClick}>
              <i className="zmdi zmdi-developer-board zmdi-hc-fw" />
              <span className="nav-text">FAQs</span>
            </NavLink>
          </li>

          <Divider light={true} />

          <li className="nav-header">create</li>

          <li className="menu no-arrow">
            <NavLink to="/campaign/create/basic" onClick={linkClick}>
              <i className="zmdi zmdi-format-subject zmdi-hc-fw" />
              <span className="nav-text">create campaign</span>
            </NavLink>
          </li>
        </ul>
      </CustomScrollbar>
    );
  }
}

export default SideNavContent;
