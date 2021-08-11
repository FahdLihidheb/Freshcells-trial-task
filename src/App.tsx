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

  const handleLoginChange = (loginData: {
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
            <Login handleLoggingIn={handleLoginChange} />
          </Route>
          <Route path="/account">
            {loggedIn.isLogged ? (
              <Account
                id={loggedIn.userId}
                handleLoggingIn={handleLoginChange}
              />
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
