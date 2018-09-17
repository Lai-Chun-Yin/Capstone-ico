import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AboutUs from "./components/aboutUs/aboutUs";
import PendingCampaigns from "./components/admin/pendingCampaigns";
import PendingDetails from "./components/admin/pendingDetails";
import Blog from "./components/blog";
import CampaignForm from "./components/campaignForm";
import Campaigns from "./components/campaignPage";
import CampaignDetails from "./components/campaignPage/campaignDetails";
import ContributeForm from "./components/campaignPage/contribute";
import FAQ from "./components/faq/faq";
import Footer from "./components/footer";
import HomePage from "./components/homePage";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import News from "./components/news";
import NotFound from "./components/notFound";
import SignupForm from "./components/signupForm";
import GenerateToken from "./components/tokenPage/generate";
import UserProfile from "./components/userInfoPopUp/userProfile";
import UserSetting from "./components/userInfoPopUp/userSetting";
import ScrollToTop from "./services/scrollToTopService";

const Routes = () => {
  return (
    <main className="app-main-content-wrapper">
      <div className="app-main-content">
        <div className="app-wrapper">
          <ScrollToTop />
          <Switch>
            <Route
              path="/campaign/pending/:campaignId/details"
              component={PendingDetails}
            />
            <Route
              path="/campaign/pending"
              exact={true}
              component={PendingCampaigns}
            />
            <Route
              path="/campaign/:campaignId/contribute"
              component={ContributeForm}
            />
            <Route
              path="/campaign/:campaignId/details"
              exact={true}
              component={CampaignDetails}
            />
            <Route path="/campaign/:campaignId/generate" component={GenerateToken} />
            <Route path="/campaign/create/basic" component={CampaignForm} />
            <Route path="/campaign" component={Campaigns} />
            <Route path="/userProfile" component={UserProfile} />
            <Route path="/userSetting" component={UserSetting} />
            <Route path="/news" component={News} />
            <Route path="/faq" component={FAQ} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/blog" component={Blog} />
            <Route path="/register" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact={true} component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Routes;
