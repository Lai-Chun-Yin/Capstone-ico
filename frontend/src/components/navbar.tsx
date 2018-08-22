import * as React from "react";
import { connect } from "react-redux";
import { NavLink as RRNavLink } from "react-router-dom";

import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { IRootState } from "../reducers";

interface INavBarProps {
  isAuthenticated: boolean;
}

interface INavBar {
  isOpen: any;
}

class NavBar extends React.Component<INavBarProps, INavBar> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  public render() {
    return (
      <Navbar color="light" light={true} expand="md">
        <NavbarBrand to="/" tag={RRNavLink}>
          App logo
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar={true}>
          <Nav navbar={true}>
            <NavItem>
              <NavLink to="/campaign/create/basic" tag={RRNavLink}>
                Create Campaign
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/news" tag={RRNavLink}>
                news
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog" tag={RRNavLink}>
                blog
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar={true}>
            {!this.props.isAuthenticated === true && (
              <React.Fragment>
                <NavItem>
                  <NavLink to="/login" tag={RRNavLink}>
                    login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/register" tag={RRNavLink}>
                    signup
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
            {this.props.isAuthenticated === true && (
              <React.Fragment>
                <NavItem>
                  <NavLink to="/logout" tag={RRNavLink}>
                    Logout
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
  private toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(NavBar);
