import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

function CustomLink () {
  return (
    <Router>
      <div>
        <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home"></OldSchoolMenuLink>
        <OldSchoolMenuLink to="/about" label="About"></OldSchoolMenuLink>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}
function OldSchoolMenuLink ({label, to, activeOnlyWhenExact}){
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({match}) => (
        <div className={match ? 'active' : ''}>
          {match ? '>' : ''}
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
  );
}
function Home (){
  return (
    <h3>Home</h3>
  );
}
function About (){
  return (
    <h3>About</h3>
  );
}
export default CustomLink
 