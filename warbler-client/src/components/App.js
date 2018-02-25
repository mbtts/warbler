import { Redirect, Route, Switch } from "react-router-dom";

import Authenticated from "../containers/Authenticated";
import Login from "./Login";
import Logout from "./Logout";
import Messages from "./Messages";
import Nav from "./Nav";
import NewPost from "./NewPost";
import React from "react";
import Registration from "./Registration";
import Unauthenticated from "../containers/Unauthenticated";

const App = props => {
  return (
    <React.Fragment>
      <Route component={Nav} />
      <div className="app">
        <Authenticated>
          <Switch>
            <Route exact path="/" component={Messages} />
            <Route path="/new" component={NewPost} />
            <Route path="/logout" component={Logout} />
            <Redirect from="/(login|register)" to="/" />
          </Switch>
        </Authenticated>
        <Unauthenticated>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Redirect to="/login" />
          </Switch>
        </Unauthenticated>
      </div>
    </React.Fragment>
  );
};

export default App;
