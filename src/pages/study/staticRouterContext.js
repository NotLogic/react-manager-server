import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'

function RouteStatus (props) {
  return (
    <Route 
      render={({staticContext}) => {
        console.log('RouteStatus arguments:',arguments)
        console.log('staticContext:',staticContext)
        console.log('props:',props)
        if(staticContext){
          staticContext.statusCode = props.statusCode;
        }
        return <div>{props.children}</div>;
      }}
    />
  );
}
function PrintContext (props) {
  return <p>Static context: {JSON.stringify(props.staticContext)}</p>;
}

class StaticRouterContext extends React.Component {
  staticContext = {};

  render () {
    return (
      <StaticRouter location="/foo" context={this.staticContext}>
        <div>
          <RouteStatus statusCode={404}>
            <p>Route with statusCode 404</p>
            <PrintContext staticContext={this.staticContext} />
          </RouteStatus>
        </div>
      </StaticRouter>
    );
  }
}
export default StaticRouterContext