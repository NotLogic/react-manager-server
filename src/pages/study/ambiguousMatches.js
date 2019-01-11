import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

function AmbiguousMatches () {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/about">About Us (static)</Link>
          </li>
          <li>
            <Link to="/company">Company (static)</Link>
          </li>
          <li>
            <Link to="/kim">Kim (dynamic)</Link>
          </li>
          <li>
            <Link to="/chris">Chris (dynamic)</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/company" component={Company} />
          <Route path="/:user" component={User} />
        </Switch>
      </div>
    </Router>
  );
}
function About () {
  return <h2>About</h2>;
}
function Company () {
  return <h2>Company</h2>;
}
function User ({match}) {
  return (
    <div>
      <h2>User: {match.params.user}</h2>
    </div>
  );
}
// 模糊匹配
export default AmbiguousMatches