import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as History from "history";
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

export interface ICampaignFormProps {
  history: History.History
  onSubmit: (values: any, imageFile: File | null) => void
  isAuthenticated: boolean;
  error: Error | null;
}

export interface ICampaignFormState {
  page: number;
  imageFile: File | null;
  dialog: any;
}

class CampaignForm extends React.Component<ICampaignFormProps, ICampaignFormState> {
  constructor(props: ICampaignFormProps) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      imageFile: null,
      dialog: {
        open: false,
        message: ""
      }
    };
  }
  public render() {
    // const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <React.Fragment>
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
                      return this.onUploadCampaign(values);
                    }}
                  />
                )}
              </div>
            </CardBox>
          </div>
        </div>
        <Dialog open={this.state.dialog.open} onClose={this.handleDialogClose}>
          <DialogTitle>Notice</DialogTitle>
          <DialogContent>
            <p>{this.state.dialog.message}</p>
          </DialogContent>
        </Dialog>
      </React.Fragment>
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

  private onUploadCampaign(values: any) {
    this.props.onSubmit(values, this.state.imageFile);
    if (!this.props.error) {
      this.setState({
        dialog: {
          open: true,
          message: "The campaign has been uploaded successfully"
        }
      })

    } else {
      this.setState({
        dialog: {
          open: true,
          message: "Failed to upload the campaign."
        }
      })
    }
  }

  private handleDialogClose = async () => {
    await this.setState({
      dialog: {
        open: false,
        message: ""
      }
    });
    if (!this.props.error) {
      this.props.history.push("/campaign");
    }
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
        videoMatch1 = values.video.match(/^https:\/\/youtu\.be\/([\w-]+)/);
        videoMatch2 = values.video.match(
          /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/
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
    isAuthenticated: state.auth.token !== null,
    error: state.campaign.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignForm);
