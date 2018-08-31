import * as React from "react";
import { connect } from "react-redux";
import * as campaignActions from "../../reducers/campaigns/actions";
import FirstPage from "./FirstPage";
// tslint:disable-next-line:ordered-imports
import FourthPage from "./FourthPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";

export interface ICampaignFormState {
  page: number;
  imageFile: File|null;
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
          <ThirdPage previousPage={this.previousPage} onSubmit={this.nextPage} />
        )}
        {page === 4 && (
          // tslint:disable-next-line:jsx-no-lambda
          <FourthPage previousPage={this.previousPage} onSubmit={(values)=>{
            return this.props.onSubmit(values, this.state.imageFile);
          }} />
        )}
      </div>
    );
  }
  private nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  private fileChangeHandler = (event: any) => {
    this.setState({ imageFile: event.target.files[0] });
  }

  private previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: (values:any,imageFile:File|null) => {
      // tslint:disable-next-line:prefer-const
      let campaign = Object.assign({},values);
      campaign.startDate = new Date(values.startDate);
      campaign.endDate = new Date(values.endDate);
      campaign.softCap = +values.softCap;
      campaign.hardCap = +values.hardCap;
      if(imageFile){campaign.imageFile = imageFile}
      let videoMatch1 = null;
      let videoMatch2 = null;
      if(values.video){
      videoMatch1 = values.video.match(/^https:\/\/youtu\.be\/([\w]+)/);
      videoMatch2 = values.video.match(/^https:\/\/www\.youtube\.com\/watch\?v=([\w]+)/); }
      if (videoMatch1) { campaign.video = videoMatch1[1] }
      else if (videoMatch2) { campaign.video = videoMatch2[1] }
      dispatch(campaignActions.uploadCampaignThunk(campaign));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CampaignForm);
