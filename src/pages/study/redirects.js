import React from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'

function AuthExample (){
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </li>
        </ul>
        <Route path="/public" component={Public}></Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/protected" component={Protected}></PrivateRoute>
      </div>
    </Router>
  );
}
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb){
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb){
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
const AuthButton = withRouter(
  ({history}) => 
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={
            () => {
              fakeAuth.signout(() => history.push('/'));
            }
          }
        >Sign out</button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  
)
function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        props => 
          fakeAuth.isAuthenticated ? (<Component {...props} />) : (
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}></Redirect>
          )
        
      }
    ></Route>
  );
}
function Public(){
  return (
    <h3>Public</h3>
  );
}
function Protected(){
  return (
    <h3>Protected</h3>
  );
}
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(
      ()=> {
        this.setState({
          redirectToReferrer: true
        })
      }
    )
  }
  render () {
    let {from} = this.props.location.state || {from: {pathname: '/'}}
    let {redirectToReferrer} = this.state
    if(redirectToReferrer){
      return <Redirect to={from} />
    }
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Login in</button>
      </div>
    );
  }
}
export default AuthExample