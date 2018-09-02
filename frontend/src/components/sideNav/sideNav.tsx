import Drawer from "@material-ui/core/Drawer";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "../../reducers";
import { toggleCollapsedNav } from "../../reducers/sideNav/action";
import SideNavContent from "./slideNavContent";

export interface ISideNavProps {
  sideNav: {
    [key: string]: any;
  };
  toggleSideNav: (val: boolean) => void;
}

// export interface ISideNavState {

// }

class SideNav extends React.Component<ISideNavProps> {
  public render() {
    return (
      <div className="app-sidebar d-none">
        <Drawer
          className="app-sidebar-content"
          variant="temporary"
          open={this.props.sideNav.navCollapsed}
          onClose={this.onToggleCollapsedNav}
          classes={{
            paper: "side-nav"
          }}
        >
          <SideNavContent linkClick={this.onToggleCollapsedNav} />
        </Drawer>
      </div>
    );
  }
  private onToggleCollapsedNav = () => {
    const val = !this.props.sideNav.navCollapsed;
    this.props.toggleSideNav(val);
  };
}

const mapStateToProps = (state: IRootState) => {
  return {
    sideNav: state.sideNav
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleSideNav: (val: boolean) => dispatch(toggleCollapsedNav(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
