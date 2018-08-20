import * as React from "react";

import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";

interface INavBar {
  isOpen: any;
}

class NavBar extends React.Component<any, INavBar> {
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
        <NavbarBrand href="/">App logo</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar={true}>
          <Nav navbar={true}>
            <NavItem>
              <NavLink href="/campaign/create/basic">Create Campaign</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/news">news</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/blog">blog</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink href="/login">login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">signup</NavLink>
            </NavItem>
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

export default NavBar;
