import * as React from "react";
import { connect } from "react-redux";
import { NavLink as RRNavLink } from "react-router-dom";

import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import { IRootState } from "../reducers";

interface INavBarProps {
  isAuthenticated: boolean;
  user: {
    [key: string]: any;
  };
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
            <NavItem>
              <NavLink to="/test" tag={RRNavLink}>
                test
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
                <UncontrolledDropdown nav={true} inNavbar={true}>
                  <DropdownToggle nav={true} caret={true}>
                    {this.props.user.alias}
                  </DropdownToggle>
                  <DropdownMenu right={true}>
                    <DropdownItem>Setting</DropdownItem>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem divider={true} />
                    <DropdownItem>other fucking option</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(NavBar);
