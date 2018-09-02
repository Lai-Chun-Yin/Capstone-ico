import * as React from "react";
import Menu from "./menu";

// export interface ITopNavProps {

// }

// export interface ITopNavState {

// }

class TopNav extends React.Component {
  public render() {
    return (
      <div className="app-top-nav d-none d-md-block">
        <div className="d-flex app-toolbar align-items-center">
          <Menu />
        </div>
      </div>
    );
  }
}

export default TopNav;
