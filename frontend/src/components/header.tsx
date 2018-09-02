import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button, { ButtonProps } from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { authCheckState } from "../reducers/auth/actions";
import { IRootState } from "../reducers/index";
import { toggleCollapsedNav } from "../reducers/sideNav/action";
import SearchBox from "./common/searchBox";
import UserInfoPopup from "./userInfoPopUp/userInfoPopup";

interface IHeaderProps {
  isAuthenticated: boolean;
  onTryAutoSignup: () => void;
  toggleSideNav: (val: boolean) => void;
  user: {
    [key: string]: any;
  };
  sideNav: {
    navCollapsed: boolean;
  };
}

interface IHeaderstate {
  [key: string]: any;
}

interface ILinkButtonProps extends ButtonProps {
  to?: string;
}

// create a new LinkButton component for connect react router dom and material ui button
const LinkButton: React.ReactType<ILinkButtonProps> = Button;

class Header extends React.Component<IHeaderProps, IHeaderstate> {
  public constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false
    };
  }

  public componentDidMount() {
    this.props.onTryAutoSignup();
  }

  public render() {
    return (
      <AppBar className="app-main-header app-main-header-top">
        <Toolbar className="app-toolbar" disableGutters={false}>
          <div
            className="d-block d-md-none pointer mr-3"
            onClick={this.onToggleCollapsedNav}
          >
            <span className="jr-menu-icon">
              <span className="menu-icon" />
            </span>
          </div>

          <Link className="app-logo mr-2" to="/">
            <img
              src="http://via.placeholder.com/177x65"
              alt="app-logo"
              title="app-logo"
            />
          </Link>

          <SearchBox
            styleName="d-none d-lg-block"
            placeholder=""
            // tslint:disable-next-line:jsx-no-bind
            onChange={this.updateSearchText.bind(this)}
            value={this.state.searchText}
          />

          <ul className="header-notifications list-inline ml-auto navbar p-0">
            <li className="d-inline-block d-lg-none list-inline-item mr-0">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={this.state.searchBox}
                toggle={this.onSearchBoxSelect}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn size-30">
                    <i className="zmdi zmdi-search zmdi-hc-fw" />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right={true} className="p-0">
                  <SearchBox
                    styleName="search-dropdown"
                    placeholder=""
                    // tslint:disable-next-line:jsx-no-bind
                    onChange={this.updateSearchText.bind(this)}
                    value={this.state.searchText}
                  />
                </DropdownMenu>
              </Dropdown>
            </li>

            {!this.props.isAuthenticated === true && (
              <React.Fragment>
                <li className="nav-450-p-0">
                  <LinkButton
                    size="small"
                    className="text-white"
                    component={Link}
                    to="/login"
                  >
                    login
                  </LinkButton>
                </li>

                <li className="nav-450-p-0">
                  <LinkButton
                    size="small"
                    className="text-white"
                    component={Link}
                    to="/register"
                  >
                    register
                  </LinkButton>
                </li>
              </React.Fragment>
            )}

            {this.props.isAuthenticated === true && (
              <React.Fragment>
                <li>
                  <LinkButton
                    size="small"
                    className="text-white text-lowercase d-none d-md-block"
                    component={Link}
                    to="/campaign/create/basic"
                  >
                    Create Campaign
                  </LinkButton>
                </li>

                <li className="list-inline-item user-nav">
                  <Dropdown
                    className="quick-menu"
                    isOpen={this.state.userInfo}
                    // tslint:disable-next-line:jsx-no-bind
                    toggle={this.onUserInfoSelect.bind(this)}
                  >
                    <DropdownToggle
                      className="d-inline-block"
                      tag="span"
                      data-toggle="dropdown"
                    >
                      <IconButton className="icon-btn size-30">
                        <Avatar
                          alt="..."
                          src="http://via.placeholder.com/150x150"
                          className="size-30"
                        />
                      </IconButton>
                    </DropdownToggle>

                    <DropdownMenu right={true}>
                      <UserInfoPopup user={this.props.user} />
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </React.Fragment>
            )}
          </ul>
        </Toolbar>
      </AppBar>
    );
  }

  private onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    });
  };
  private onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    });
  };

  private onToggleCollapsedNav = (e: any) => {
    const val = !this.props.sideNav.navCollapsed;
    this.props.toggleSideNav(val);
  };

  private updateSearchText(evt: any) {
    this.setState({
      searchText: evt.target.value
    });
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
    sideNav: state.sideNav
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
    toggleSideNav: (val: boolean) => dispatch(toggleCollapsedNav(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
