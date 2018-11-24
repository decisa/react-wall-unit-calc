import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import WallUnitSelection from "./WallUnitSelection";
import App from "../App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={WallUnitSelection} />
      <Route path="/wall/:wallUnitId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
