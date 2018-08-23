import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import App from "./App";
import CampaignForm from "./components/campaign-form/CampaignForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NavBar from "./components/navbar";
import News from "./components/news";
import NotFound from "./components/notFound";
import SignupForm from "./components/signupForm";
import { TestApi } from "./components/testApi_ck";

const Routes = () => {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/campaign/create/basic" component={CampaignForm} />
          <Route path="/news" component={News} />
          <Route path="/register" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact={true} component={App} />
          <Route path="/test" component={TestApi} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default Routes;
