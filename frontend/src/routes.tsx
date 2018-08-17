import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/notFound";

import App from "./App";
import ContactForm from "./components//form";

const Routes = () => {
  return (
    <Switch>
      <Route path="/create" exact={true} component={ContactForm} />
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact={true} component={App} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
