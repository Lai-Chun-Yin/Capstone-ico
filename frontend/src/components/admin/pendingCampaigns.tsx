import List from "@material-ui/core/List";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "../../reducers";
import { loadPendingCampaignsThunk } from "../../reducers/campaigns/actions";
import ContainerHeader from "../common/containerHeader";
import PendingList from "./pendingList";

interface IPendingCampaignsProps {
    pendingCampaigns: CapstoneICO.ICampaign[];
    loadPendingCampaigns: () => void;
}

class PendingCampaigns extends React.Component<IPendingCampaignsProps>{
    constructor(props:IPendingCampaignsProps){
        super(props);
    }

    public componentDidMount=()=>{
        this.props.loadPendingCampaigns();
    }

    public render() {
        const { pendingCampaigns } = this.props;

        return (
            <div className="animated slideInUpTiny animation-duration-3">
                <ContainerHeader title="All Pending Campaigns" />
                <div>
                    <List>
                        {pendingCampaigns.map((e: CapstoneICO.ICampaign) => (
                            <PendingList
                                key={e.id}
                                title={e.title}
                                description={e.short_description}
                                creator={e.full_name}
                                startD={e.start_date}
                                endD={e.end_date}
                                soft={e.soft_cap}
                                id={e.id}
                                image={e.project_photo}
                            />
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        pendingCampaigns: state.campaign.pendingCampaigns
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadPendingCampaigns: () => dispatch(loadPendingCampaignsThunk())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingCampaigns);