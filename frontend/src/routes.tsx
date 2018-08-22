import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import App from "./App";
import campaignForm from "./components/campaignForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import SignupForm from "./components/signupForm";

const Routes = () => {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/campaign/create/basic" component={campaignForm} />
          <Route path="/register" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact={true} component={App} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default Routes;
