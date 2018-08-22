import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
// import RegisterForm from "./components/registerForm";
import SignupForm from "./components/signupForm";

import App from "./App";
import ContactForm from "./components//form";

const Routes = () => {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/campaign/create/basic" component={ContactForm} />
          <Route path="/register" component={SignupForm}/>
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
