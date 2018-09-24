import React from "react";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      var active = match ? "active abc" : "";
      return (
        <li className={active}>
          <NavLink to={to} className="my-link">
            {label}
          </NavLink>

        </li>
      )
    }} />
  )
}
class App extends React.Component {

  render() {

    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-default">
            <a className="navbar-brand">User Manager</a>
            <ul className="nav navbar-nav">

              <MenuLink label="Home" to="/" activeOnlyWhenExact={true}></MenuLink>



            </ul>
          </nav>
          <Route path="/" exact component={Home} />

        </div>
      </Router>

    );
  }
}
export default App;
