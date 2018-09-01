import axios from "axios";
import * as React from "react";
import { connect } from 'react-redux';
import { match } from 'react-router-dom'
import { IRootState } from "../reducers/index"
import Youtube from "./Youtube";

interface ICampaignDetailsProps {
    campaigns: CapstoneICO.ICampaign[];
    match: match<ICampaignIdPathParam>
}
interface ICampaignDetailsState {
    campaign: CapstoneICO.ICampaign | null;
}
interface ICampaignIdPathParam {
    campaignId: number
}

class CampaignDetails extends React.Component<ICampaignDetailsProps, ICampaignDetailsState> {
    constructor(props: ICampaignDetailsProps) {
        super(props);
        const targetCampaign = props.campaigns.filter((campaign) => campaign.id === (+props.match.params.campaignId))
        this.state = {
            campaign: targetCampaign[0]
        }
    }

    public componentDidMount() {
        if (!this.state.campaign) {
            const token = localStorage.getItem('token');
            this.fetchCampaign(token);
        }
        console.log(this.state.campaign);
    }

    public onSupportHandler(event:any){
        event.preventDefault();
    }

    public render() {
        let projectPic: any;
        if (this.state.campaign) {
            projectPic = this.state.campaign.project_photo ?
                <img src={'https://s3.ap-northeast-2.amazonaws.com/capstone-ico/' + this.state.campaign.project_photo} 
                className="img-fluid img-thumbnail"
                alt="logo" /> : null
        } else {
            projectPic = null;
        }
        let videoPlayer: any;
        if (this.state.campaign) {
            videoPlayer = this.state.campaign.video_url ?
                <Youtube videoId={this.state.campaign.video_url} /> : null
        } else { videoPlayer = null; }

        let campaignHeader: any;
        let campaignContent: any;
        if (this.state.campaign) {
            campaignHeader = (
                <React.Fragment>
                    <div className="page-header">
                        <h2 className="display-4">{this.state.campaign.title}</h2>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.onSupportHandler}>Support Campaign</button>
                </React.Fragment>
            )
            campaignContent = (
                <React.Fragment>
                    <section>
                        {videoPlayer}
                        {projectPic}

                        <h4>{this.state.campaign.short_description}</h4>
                        <p>{this.state.campaign.long_description}</p>
                    </section>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        {campaignHeader}
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {campaignContent}
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

    private async fetchCampaign(token: string | null) {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/campaign/${this.props.match.params.campaignId}`,
                { headers: { Authorization: `Bearer ${token}` } });
            this.setState({
                campaign: result.data[0]
            })
        } catch (err) {
            console.log(err);
        }
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        campaigns: state.campaign.campaigns
    }
};

export default connect(mapStateToProps)(CampaignDetails);