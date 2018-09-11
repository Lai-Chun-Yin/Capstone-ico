import * as React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { IRootState } from "../../reducers";
// import { NavLink } from "react-router-dom";

export interface IMenuProps {
  user: {
    [key: string]: any;
  };
}

// export interface IMenuState {

// }

class Menu extends React.Component<IMenuProps> {
  public render() {
    let bar: JSX.Element = (
      <div className="app-main-menu d-none d-md-block">
        <ul className="navbar-nav navbar-nav-mega">
          <li className="nav-item">
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
            <NavLink to="/news">
              <span>News</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blog">
              <span>Blog</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/aboutus">
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
    if (this.props.user.is_admin) {
      bar = (
        <div className="app-main-menu d-none d-md-block">
          <ul className="navbar-nav navbar-nav-mega">
            <li className="nav-item">
              <Link to="/campaign/pending">
                <span>Pending</span>
              </Link>
            </li>
            <li className="nav-item">
              <NavLink to="/campaign">
                <span>Approved</span>
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }
    return <React.Fragment>{bar}</React.Fragment>;
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Menu);
