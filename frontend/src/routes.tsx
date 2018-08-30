import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CampaignForm from "./components/campaign-form/CampaignForm";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import HomePage from "./components/homePage";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import News from "./components/news";
import NotFound from "./components/notFound";
import SignupForm from "./components/signupForm";
import { TestApi } from "./components/testApi_ck";
import TestWeb3 from "./components/testWeb3";

const Routes = () => {
  return (
    <main className="app-main-content-wrapper">
      <div className="app-main-content">
        <div className="app-wrapper">
          <Switch>
            <Route path="/campaign/create/basic" component={CampaignForm} />
            <Route path="/news" component={News} />
            <Route path="/faq" component={FAQ} />
            <Route path="/register" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/test" component={TestApi} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Routes;
