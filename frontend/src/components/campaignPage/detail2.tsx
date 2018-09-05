// import * as React from "react";
// import { connect } from "react-redux";
// import { Link, match } from "react-router-dom";
// import web3 from "../../ethereum/web3";
// import { IRootState } from "../../reducers";
// import Youtube from "../Youtube";
// import { getCampaign } from "../../services/campaign";

// interface ICampaignDetailsProps {
//   campaigns: CapstoneICO.ICampaign[];
//   match: match<ICampaignIdPathParam>;
// }
// interface ICampaignDetailsState {
//   campaign: CapstoneICO.ICampaign | null;
//   balance: string | null;
// }
// interface ICampaignIdPathParam {
//   campaignId: number;
// }

// class CampaignDetails extends React.Component<
//   ICampaignDetailsProps,
//   ICampaignDetailsState
// > {
//   constructor(props: ICampaignDetailsProps) {
//     super(props);
//     const targetCampaign = props.campaigns.filter(
//       campaign => campaign.id === +props.match.params.campaignId
//     );
//     this.state = {
//       campaign: targetCampaign[0],
//       balance: ""
//     };
//   }

//   public async componentDidMount() {
//     if (!this.state.campaign) {
//       const token = localStorage.getItem("token");
//       await getCampaign(this.props.match.params.campaignId, token, );
//     }

//     // get campaign balance
//     const tokenAddr = this.state.campaign
//       ? this.state.campaign.token_address
//       : null;
//     const balance = await web3.eth.getBalance(tokenAddr);
//     this.setState({
//       balance: web3.utils.fromWei(balance, "ether")
//     });
//   }

//   public onSupportHandler(event: any) {
//     // event.preventDefault();
//   }

//   public render() {
//     let projectPic: any;
//     if (this.state.campaign) {
//       projectPic = this.state.campaign.project_photo ? (
//         <img
//           src={
//             "https://s3.ap-northeast-2.amazonaws.com/capstone-ico/" +
//             this.state.campaign.project_photo
//           }
//           className="img-fluid img-thumbnail"
//           alt="logo"
//         />
//       ) : null;
//     } else {
//       projectPic = null;
//     }
//     let videoPlayer: any;
//     if (this.state.campaign) {
//       videoPlayer = this.state.campaign.video_url ? (
//         <Youtube videoId={this.state.campaign.video_url} />
//       ) : null;
//     } else {
//       videoPlayer = null;
//     }

//     let campaignHeader: any;
//     let campaignContent: any;
//     if (this.state.campaign) {
//       campaignHeader = (
//         <React.Fragment>
//           <div className="page-header">
//             <h2 className="display-4">{this.state.campaign.title}</h2>
//           </div>
//           <h3>{this.state.balance} Raised, Eth</h3>
//           <Link to={`/campaign/details/${this.state.campaign.id}/contribute`}>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={this.onSupportHandler}
//             >
//               Support Campaign
//             </button>
//           </Link>
//         </React.Fragment>
//       );
//       campaignContent = (
//         <React.Fragment>
//           <section>
//             {videoPlayer}
//             {projectPic}

//             <h4>{this.state.campaign.short_description}</h4>
//             <p>{this.state.campaign.long_description}</p>
//           </section>
//         </React.Fragment>
//       );
//     }

//     return (
//       <React.Fragment>
//         <div className="jumbotron jumbotron-fluid">
//           <div className="container">{campaignHeader}</div>
//         </div>
//         <div className="container">
//           <div className="row">
//             <div className="col-12">{campaignContent}</div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state: IRootState) => {
//   return {
//     campaigns: state.campaign.campaigns
//   };
// };

// export default connect(mapStateToProps)(CampaignDetails);