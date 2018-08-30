import * as React from "react";

// export interface UserInfoPopupProps {

// }

// export interface UserInfoPopupState {

// }

class UserInfoPopup extends React.Component {
  public render() {
    return (
      <div>
        <div className="user-profile">
          <img
            className="user-avatar border-0 size-40 rounded-circle"
            src="http://via.placeholder.com/150x150"
            alt="User"
          />
          <div className="user-detail ml-2">
            <h4 className="user-name mb-0">Chris Harris</h4>
            <small>Administrator</small>
          </div>
        </div>
        <a className="dropdown-item text-muted" href="javascript:void(0)">
          <i className="zmdi zmdi-face zmdi-hc-fw mr-1" />
          <p>Profile</p>
        </a>
        <a className="dropdown-item text-muted" href="javascript:void(0)">
          <i className="zmdi zmdi-settings zmdi-hc-fw mr-1" />
          <p>Setting</p>
        </a>
        <a
          className="dropdown-item text-muted"
          //   href="javascript:void(0)"
          //   onClick={() => {
          //     console.log("Try to logoput");
          //     this.props.userSignOut();
          //   }}
        >
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1" />
          <p>Logout</p>
        </a>
      </div>
    );
  }
}

export default UserInfoPopup;
