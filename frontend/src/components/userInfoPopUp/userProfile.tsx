import { Avatar } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import ContainerHeader from "../common/containerHeader";
import LinkButton from "../common/linkButton";
import BackedTable from "./table/backedTable";
import CreatedTable from "./table/createdTable";
import FollowedTable from "./table/followedTable";

// export interface IUserProfileProps {

// }

// export interface IUserProfileState {

// }

class UserProfile extends React.Component {
  public render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="User Profile" />

        <div className="row">
          <div className="col-md-4 col-sm-5 col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <Avatar
                  className="size-120 m-auto"
                  alt=" user image"
                  src="http://via.placeholder.com/150x150"
                />
                <h2 className="text-center mb-2 mt-2">max</h2>

                <h2 className="text-center mb-2 mt-2">abc@email.com</h2>

                <div className="text-center">
                  <LinkButton
                    className="jr-btn bg-deep-purple text-white"
                    component={Link}
                    variant="raised"
                    to="/userSetting"
                  >
                    Edit
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <CreatedTable />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <BackedTable />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <FollowedTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
