import AppBar from "@material-ui/core/AppBar";
import Button, { ButtonProps } from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Avatar from "@material-ui/core/Avatar";
import { authCheckState } from '../reducers/auth/actions';
import { IRootState } from "../reducers/index";
// import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import SearchBox from "./searchBox";
// import UserInfoPopup from "./userInfoPopup";

interface IHeaderProps {
  [key: string]: any;
  onTryAutoSignup: () => void
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

  public onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    });
  };
  public onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    });
  };
  public onLangSwitcherSelect = (event: any) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher,
      anchorEl: event.currentTarget
    });
  };
  public onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    });
  };
  public onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    });
  };
  public handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false
    });
  };

  public onToggleCollapsedNav = (e: any) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  public updateSearchText(evt: any) {
    this.setState({
      searchText: evt.target.value
    });
  }

  public render() {
    // const {
    //   drawerType,
    //   locale,
    //   navigationStyle,
    //   horizontalNavPosition
    // } = this.props;

    // const drawerStyle = drawerType.includes(FIXED_DRAWER)
    //   ? "d-block d-xl-none"
    //   : drawerType.includes(COLLAPSED_DRAWER)
    //     ? "d-block"
    //     : "d-none";

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

          <Link className="app-logo mr-2 d-none d-sm-block" to="/">
            <img
              src="http://via.placeholder.com/177x65"
              alt="app-logo"
              title="app-logo"
            />
          </Link>

          <SearchBox
            styleName="d-none d-lg-block"
            placeholder=""
          // onChange={this.updateSearchText.bind(this)}
          // value={this.state.searchText}
          />

          <ul className="header-notifications list-inline ml-auto navbar p-0">
            {!this.props.isAuthenticated === true && (
              <React.Fragment>
                <li>
                  <LinkButton
                    size="small"
                    className="text-white d-none d-sm-block"
                    component={Link}
                    to="/login"
                  >
                    login
                  </LinkButton>
                </li>

                <li>
                  <LinkButton
                    size="small"
                    className="text-white d-none d-sm-block"
                    component={Link}
                    to="/register"
                  >
                    register
                  </LinkButton>
                </li>
              </React.Fragment>
            )}
            {this.props.isAuthenticated === true && (
              <li>
                <LinkButton
                  size="small"
                  className="text-white d-none d-sm-block"
                  component={Link}
                  to="/logout"
                >
                  Logout
                </LinkButton>
              </li>
            )}

            {/* <li className="d-inline-block d-lg-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                // isOpen={this.state.searchBox}
                // toggle={this.onSearchBoxSelect.bind(this)}
              > */}
            {/* <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn size-30">
                    <i className="zmdi zmdi-search zmdi-hc-fw" />
                  </IconButton>
                </DropdownToggle> */}

            {/* <DropdownMenu right={true} className="p-0">
                  <SearchBox
                    styleName="search-dropdown"
                    placeholder=""
                    // onChange={this.updateSearchText.bind(this)}
                    // value={this.state.searchText}
                  />
                </DropdownMenu>
              </Dropdown>
            </li> */}

            {/* <li className="list-inline-item">
              <Dropdown
                className="quick-menu"
                // isOpen={this.state.langSwitcher}
                // toggle={this.onLangSwitcherSelect.bind(this)}
              > */}
            {/* <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <div className="d-flex align-items-center pointer pt-1"/>
                </DropdownToggle> 

                <DropdownMenu right={true} className="w-50"/>
              </Dropdown>
            </li>*/}
            {/* <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                // isOpen={this.state.appNotification}
                // toggle={this.onAppNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn size-20 font-size-20">
                    <i className="zmdi zmdi-notifications-active icon-alert animated infinite wobble" />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right={true}/>
              </Dropdown>
            </li> 
            <li className="list-inline-item mail-tour">
              <Dropdown
                className="quick-menu"
                // isOpen={this.state.mailNotification}
                // toggle={this.onMailNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className="icon-btn size-20 font-size-20">
                    <i className="zmdi zmdi-comment-alt-text icon-alert zmdi-hc-fw" />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right={true}/>
              </Dropdown>
            </li>

            <li className="list-inline-item user-nav">
              <Dropdown
                className="quick-menu"
                // isOpen={this.state.userInfo}
                // toggle={this.onUserInfoSelect.bind(this)}
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
                  <UserInfoPopup />
                </DropdownMenu>
              </Dropdown>
            </li>*/}
          </ul>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
