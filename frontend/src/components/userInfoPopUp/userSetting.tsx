import { Button } from "@material-ui/core";
import * as React from "react";
import ContainerHeader from "../common/containerHeader";

// export interface IUserProfileProps {

// }

// export interface IUserProfileState {

// }

class UserSetting extends React.Component {
  public render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="Account setting" />

        <div className="row">
          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <form>
                  Old password:
                  <br />
                  <input
                    className="form-control-sm m-2"
                    type="password"
                    name="firstname"
                  />
                  <br />
                  New password:
                  <br />
                  <input
                    className="form-control-sm m-2"
                    type="password"
                    name="lastname"
                  />
                  <br />
                  New username:
                  <br />
                  <input
                    className="form-control-sm m-2"
                    type="text"
                    name="lastname"
                  />
                  <br />
                  <Button
                    className="jr-btn bg-primary text-white m-2"
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSetting;
