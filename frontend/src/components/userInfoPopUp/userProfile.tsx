import * as React from "react";
import ContainerHeader from "../common/containerHeader";

// export interface IUserProfileProps {

// }

// export interface IUserProfileState {

// }

class UserProfile extends React.Component {
  public render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="User Profile" />
      </div>
    );
  }
}

export default UserProfile;
