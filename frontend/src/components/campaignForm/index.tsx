import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as campaignActions from "../../reducers/campaigns/actions";
import { IRootState } from "../../reducers/index";
import CardBox from "../common/cardBox";
import ContainerHeader from "../common/containerHeader";
import FirstPage from "./FirstPage";
// tslint:disable-next-line:ordered-imports
import FourthPage from "./FourthPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";

export interface ICampaignFormState {
  page: number;
  imageFile: File | null;
}

class CampaignForm extends React.Component<any, ICampaignFormState> {
  constructor(props: any) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      imageFile: null
    };
  }
  public render() {
    // const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        {!this.props.isAuthenticated && <Redirect to="/login" />}

        <ContainerHeader title="Create Campaign" />
        <div className="row">
          <CardBox styleName="col-lg-12" headerOutside={true}>
            <div>
              {page === 1 && <FirstPage onSubmit={this.nextPage} />}
              {page === 2 && (
                <SecondPage
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                  onFileChange={this.fileChangeHandler}
                />
              )}
              {page === 3 && (
                <ThirdPage
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              {page === 4 && (
                <FourthPage
                  previousPage={this.previousPage}
                  // tslint:disable-next-line:jsx-no-lambda
                  onSubmit={values => {
                    return this.props.onSubmit(values, this.state.imageFile);
                  }}
                />
              )}
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
  private nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  private fileChangeHandler = (event: any) => {
    this.setState({ imageFile: event.target.files[0] });
  };

  private previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: (values: any, imageFile: File | null) => {
      // tslint:disable-next-line:prefer-const
      let campaign = Object.assign({}, values);
      campaign.startDate = new Date(values.startDate);
      campaign.endDate = new Date(values.endDate);
      campaign.softCap = +values.softCap;
      campaign.hardCap = +values.hardCap;
      if (imageFile) {
        campaign.imageFile = imageFile;
      }
      let videoMatch1 = null;
      let videoMatch2 = null;
      if (values.video) {
        videoMatch1 = values.video.match(/^https:\/\/youtu\.be\/([\w]+)/);
        videoMatch2 = values.video.match(
          /^https:\/\/www\.youtube\.com\/watch\?v=([\w]+)/
        );
      }
      if (videoMatch1) {
        campaign.video = videoMatch1[1];
      } else if (videoMatch2) {
        campaign.video = videoMatch2[1];
      }
      dispatch(campaignActions.uploadCampaignThunk(campaign));
    }
  };
};

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignForm);
