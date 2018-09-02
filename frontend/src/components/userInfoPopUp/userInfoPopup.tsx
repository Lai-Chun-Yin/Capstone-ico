import * as React from "react";
import { NavLink } from "react-router-dom";

export interface IUserInfoPopupProps {
  user: {
    [key: string]: any;
  };
}

// export interface UserInfoPopupState {

// }

class UserInfoPopup extends React.Component<IUserInfoPopupProps> {
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
            <h4 className="user-name mb-0">{this.props.user.alias}</h4>

            {/* TODO: add user's email later */}
            <small>abc@123.com</small>
          </div>
        </div>
        <NavLink className="dropdown-item text-muted" to="/userProfile">
          <i className="zmdi zmdi-face zmdi-hc-fw mr-1" />
          <span>Profile</span>
        </NavLink>
        <NavLink className="dropdown-item text-muted" to="/userSetting">
          <i className="zmdi zmdi-settings zmdi-hc-fw mr-1" />
          <span>Setting</span>
        </NavLink>
        <NavLink className="dropdown-item text-muted" to="/logout">
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1" />
          <span>Logout</span>
        </NavLink>
      </div>
    );
  }
}

export default UserInfoPopup;
