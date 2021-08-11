import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

import Login from "./components/login";
import Account from "./components/account";

function App() {
  const [loggedIn, setloggedIn] = useState({ isLogged: false, userId: -1 });

  const hundleLoginChange = (loginData: {
    isLogged: boolean;
    userId: number;
  }) => {
    setloggedIn(loginData);
  };

  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login hundleLoggingIn={hundleLoginChange} />
          </Route>
          <Route path="/account">
            {loggedIn.isLogged ? (
              <Account id={loggedIn.userId} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
