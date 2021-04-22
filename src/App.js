import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./component/login/login";
import Home from "./component/home/home";
import Register from "./component/register/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path={"/register"} component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
