import Paper from "@material-ui/core/Paper";
// tslint:disable-next-line:no-var-requires
const withStyles = require("@material-ui/core/styles").withStyles;
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import Youtube from "../Youtube";
import Comment from "./comment";

const styles = (theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

function TabContainer({ children, dir }: any) {
  return (
    <div dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </div>
  );
}

interface ICenteredTabsProps {
  campaign: CapstoneICO.ICampaign;
  comments: CapstoneICO.IComment[];
  user: any;
  isAuthenticated: boolean;
}

class CenteredTabs extends React.Component<ICenteredTabsProps> {
  public state = {
    value: 0
  };

  public handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  public render() {
    const { campaign, comments } = this.props;

    let videoPlayer: any;
    if (campaign) {
      videoPlayer = campaign.video_url ? (
        <Youtube videoId={campaign.video_url} />
      ) : null;
    } else {
      videoPlayer = null;
    }

    return (
      <Paper className="w-100">
        <Tabs
          className="border-bottom"
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable={true}
          scrollButtons="on"
        >
          <Tab label="overview" />
          <Tab label="comments" />
        </Tabs>
        <SwipeableViews
          axis="x"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir="x">
            <section>
              {videoPlayer}

              <div
                dangerouslySetInnerHTML={{ __html: campaign.long_description }}
              />
            </section>
          </TabContainer>
          <TabContainer dir="x">
            <Comment
              comments={comments}
              user={this.props.user}
              isAuthenticated={this.props.isAuthenticated}
              campaignId={this.props.campaign.id}
            />
          </TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
  private handleChangeIndex = (index: any) => {
    this.setState({ value: index });
  };
}

export default withStyles(styles)(CenteredTabs);
