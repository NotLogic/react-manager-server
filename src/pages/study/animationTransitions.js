import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/*
  .fade-enter {
    opacity: 0;
    z-index: 1;
  }
  .fade-enter .fade-enter-active{
    opcity: 1;
    transition: opacity 250ms ease-in;
  }
*/

function AnimationTransitions () {
  return (
    <Router>
      <Route 
        render={({location}) => (
          <div style={StyleSheet.fill}>
            <Route 
              exact
              path="/"
              render={() => <Redirect to="/hsl/10/90/50" />}
            />

            <ul style={styles.nav}>
              <NavLink to="/hsl/10/90/50">Red</NavLink>
              <NavLink to="/hsl/120/100/40">Green</NavLink>
              <NavLink to="/rgb/33/150/243">Blue</NavLink>
              <NavLink to="/rgb/240/98/146">Pink</NavLink>
            </ul>
            <div style={styles.content}>
              <TransitionGroup>
                {/*  */}
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={300}
                >
                  <Switch>
                    <Route exact path="/hsl/:h/:s/:l" component={HSL} />
                    <Route exact path="/rgb/:r/:g/:b" component={RGB} />
                    {/*  */}
                    <Route render={() => <div>Not Found</div>} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        )}
      />
    </Router>
  );
}

function NavLink (props) {
  return (
    <li style={styles.navItem}>
      <Link {...props} style={{color: 'inherit'}} />
    </li>
  );
}
function HSL ({match: {params}}) {
  let bgColor = `hsl(${params.h}, ${params.s}%, ${params.l}%)`
  return (
    <div
      style={{
        background: bgColor,
        ...styles.fill,
        ...styles.hsl
      }}
    >
      hsl({params.h}, {params.s}%, {params.l}%)
    </div>
  );
}
function RGB ({match: {params}}) {
  let bgColor = `rgb(${params.r}, ${params.g}, ${params.b})`
  return (
    <div
      style={{
        background: bgColor,
        ...styles.fill,
        ...styles.rgb
      }}
    >
      rgb({params.r}, {params.g}, {params.b})
    </div>
  );
}
const styles = {}
styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}
styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center'
}
styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}
styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}
styles.hsl = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}
styles.rgb = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}
export default AnimationTransitions