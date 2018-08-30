import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CampaignForm from "./components/campaign-form/CampaignForm";
import HomePage from "./components/homePage";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import News from "./components/news";
import NotFound from "./components/notFound";
import SignupForm from "./components/signupForm";
import { TestApi } from './components/testApi_ck';
import TestWeb3 from "./components/testWeb3";

const Routes = () => {
  return (
    <main className="container">
      <Switch>
        <Route path="/campaign/create/basic" component={CampaignForm} />
        <Route path="/news" component={News} />
        <Route path="/register" component={SignupForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/test" component={TestWeb3} />
        <Route path="/testApi" component={TestApi} />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
};

export default Routes;
