import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "../../reducers";
import ContainerHeader from "../common/containerHeader";
import LinkButton from "../common/linkButton";
import BackedTable from "./table/backedTable";
import CreatedTable from "./table/createdTable";
import FollowedTable from "./table/followedTable";
import UserChangePic from "./userChangePic";

export interface IUserProfileProps {
  profilePic: string;
  user: any;
}

export interface IUserProfileState {
  editPic: boolean;
  createdCampaigns: CapstoneICO.ICampaign[];
}

class UserProfile extends React.Component<
  IUserProfileProps,
  IUserProfileState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      editPic: false,
      createdCampaigns: []
    };
  }

  public render() {
    const profilePic = this.props.profilePic
      ? `https://s3.ap-northeast-2.amazonaws.com/capstone-ico/${
          this.props.profilePic
        }`
      : "http://via.placeholder.com/150x150";
    let avatar;
    if (this.state.editPic) {
      avatar = <UserChangePic />;
    } else {
      avatar = (
        <React.Fragment>
          <Avatar className="size-120 m-auto" alt="usrImg" src={profilePic} />
          <div className="text-center mt-3 mb-4">
            <Button
              variant="fab"
              color="secondary"
              aria-label="Edit"
              onClick={this.openEdit}>
              <Icon>edit_icon</Icon>
            </Button>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title="User Profile" />

        <div className="row">
          <div className="col-md-6 col-sm-8 col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                {avatar}
                <h2 className="text-center mb-2 mt-2">
                  {this.props.user.alias}
                </h2>

                <h2 className="text-center mb-2 mt-2">
                  {this.props.user.email}
                </h2>

                <div className="text-center">
                  <LinkButton
                    className="jr-btn bg-deep-purple text-white"
                    component={Link}
                    variant="raised"
                    to="/userSetting">
                    Edit
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="jr-card">
              <div className="jr-card-body ">
                <CreatedTable createdCampaigns={this.state.createdCampaigns} />
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

  private openEdit = (event: any) => {
    event.preventDefault();
    this.setState({
      editPic: true
    });
  };
}

const mapStateToProps = (state: IRootState) => {
  return {
    profilePic: state.auth.user.photo,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(UserProfile);
