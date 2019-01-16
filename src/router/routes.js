import React from 'react'
import {Route, Switch} from 'react-router'
import config, {study} from '@/router/config'


import App from '@/app'
import NoMatch from '@/pages/404'


const routes = (
  <Switch>
    <Route path="/" exact component={App} />
    {Object.keys(config).map(
      key => {
        let val = config[key]
        if(val.children && val.children instanceof Object){
          // return Object.keys(val.children).map(_key =>
          //   <Route
          //     key={_key}
          //     path={val.children[_key].path}
          //     component={val.children[_key].component}
          //   ></Route>
          // )
        }else{
          return <Route
            key={key} 
            path={val.path}
            component={val.component} 
          />
        }
      }
    )}
    <Route component={NoMatch} />
  </Switch>
);

export default routes