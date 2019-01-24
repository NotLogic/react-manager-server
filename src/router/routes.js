import React from 'react'
import {Route, Switch, Redirect} from 'react-router'
import { HOME_PATH } from '@/router/config'


import App from '@/app'
import NoMatch from '@/pages/404'
import Login from '@/pages/login'
import Home from '@/pages/home'

// react router的匹配规则是什么？匹配到第一个之后还会继续匹配吗？
const routes = (
  <Switch>
    <Route path="/" exact render={() => (
      <Redirect to={HOME_PATH} push></Redirect>
    )} />
    <Route path="/login" component={Login} />
    {/* 根据路由匹配规则这样写可以实现，会不会有什么问题 */}
    <Route path='/' component={App} />
    <Route path='/404' component={NoMatch} />
    <Route path='/*' component={NoMatch} />
  </Switch>
);

export default routes