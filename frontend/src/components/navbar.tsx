import * as React from "react";
import { connect } from "react-redux";
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
  isAuthenticated: boolean
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
    let authButtons = (
      <React.Fragment>
        <NavItem>
          <NavLink href="/login">login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register">signup</NavLink>
        </NavItem>
      </React.Fragment>
    )
    if (this.props.isAuthenticated){
      authButtons = (
        <NavItem>
          <NavLink href="/logout">logout</NavLink>
        </NavItem>
      )
    }
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
            {authButtons}
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