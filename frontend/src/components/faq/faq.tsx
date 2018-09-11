import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as React from "react";
import ContainerHeader from "../common/containerHeader";

export interface IFaqProps {
  match: any;
}

export interface IFaqState {
  expanded: any;
}

class FAQ extends React.Component<IFaqProps, IFaqState> {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  public render() {
    const { expanded } = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3 mb-5">
        <ContainerHeader title="FAQ" />
        <div className="row mb-5">
          <div className="col-md-11 col-12 m-auto">
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={this.handleChange("panel1")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                How to create a campaign on StarToken?
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  To create a campaign on the platform you need to sign in or
                  register, and then fill in the required data in the campaign
                  creation page.
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={this.handleChange("panel2")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Conditions and Requisites to launch at StarToken:
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  1. The company is required to provide a complete campaign page
                  created in compliance with the platform requirements. The
                  campaign shall primarily be submitted in the English language.
                  The business model shall be based on utility-token
                  implementation, which excludes any form of:
                  <ul>
                    <li>dividend or equity,</li>
                    <li>loans and buy-back,</li>
                    <li>
                      backers having any voting or decision-making right based
                      on the token ownership.
                    </li>
                  </ul>
                  2. In order to successfully launch a campaign on StarToken,
                  the campaign's author is required to go through the KYC
                  procedure in his/her account profile.
                  <br />
                  <br />
                  3. Each campaign is required have their tokensale soft cap and
                  hard cap established and declared to public. In case the soft
                  cap is not reached by the end of the respective tokensale, the
                  company is obliged to offer every backer a full refund
                  including fees and commissions applied.
                  <br />
                  <br />
                  4. We recommend to follow the ratio of 1:5 for the soft cap /
                  hard cap proportion, though deviations might be applicable in
                  some cases.
                  <br />
                  <br />
                  5. Campaigns chosen for launch from the Community Choice
                  section can only be launched exclusively on StarToken
                  <br />
                  <br />
                  6. The company needs to be registered in an appropriate legal
                  domain to ensure the ICO compliance with the legal
                  requirements of the domain. Currently US, Chinese, Japanese
                  and Russian companies are unacceptable.
                  <br />
                  <br />
                  7. On the date of the commencement of token sale, StarToken
                  announces the start of campaign to users via channels such as
                  email, Telegram, Facebook, Twitter, Reddit, Bitcointalk thread
                  and article on Medium.
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={this.handleChange("panel3")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                How long does a campaign go?
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  Different campaigns have specific goals, hype levels and
                  expectations. Usually, they take a week to a month, but the
                  most anticipated ones can close their soft or even hardcaps in
                  hours.
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={this.handleChange("panel4")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                What is the purpose of launching a campaign?
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  The goal of any fundraising campaigns is to raise funds. In
                  case of ICOs, the ultimate goal is to distribute the maximum
                  amount of tokens possible, not only attracting funds in
                  exchange for them, but to form a community of token holders,
                  able to support the project even after the campaign success.
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === "panel5"}
              onChange={this.handleChange("panel5")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                In case I need tokensale launch / promotion services, what
                regions and markets do you support?
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  We have a pool of experts and contractors we can recommend,
                  and StarToken platform itself can provide marketing support
                  via Asian and European media and advertising platforms.
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </div>
    );
  }

  private handleChange = (panel: any) => (event: any, expanded: any) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
}

export default FAQ;
