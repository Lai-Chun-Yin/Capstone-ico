import axios from "axios";
import * as React from "react";
import { connect } from 'react-redux';
import { IRootState } from "../reducers/index"

interface ICampaignDetailsProps {
    campaigns: CapstoneICO.ICampaign[];
    campaignId: number;
}
interface ICampaignDetailsState {
    campaign: CapstoneICO.ICampaign|null;
}

class CampaignDetails extends React.Component<ICampaignDetailsProps,ICampaignDetailsState> {
    constructor(props: ICampaignDetailsProps) {
        super(props);
        const targetCampaign = props.campaigns.filter((campaign)=> campaign.id===props.campaignId)
        this.state = {
            campaign: targetCampaign[0]
        }
    }

    public componentDidMount() {
        if(!this.state.campaign){
        const token = localStorage.getItem('token');
        this.fetchCampaign(token);}
    }

    public render() {
        let projectPic:any;
        if(this.state.campaign){ projectPic = 
        <img src={'https://s3.ap-northeast-2.amazonaws.com/capstone-ico/' + this.state.campaign.project_photo} alt="logo" />
         } else {
            projectPic = null;
        }
            
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12" />
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {projectPic}
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

    private async fetchCampaign(token:string|null){
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/campaign/${this.props.campaignId}`,
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