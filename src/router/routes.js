import React from 'react'
import {Route, Switch, Redirect} from 'react-router'
// import config, {study} from '@/router/config'


import App from '@/app'
import NoMatch from '@/pages/404'
import Login from '@/pages/404'
import Home from '@/pages/home'

// react router的匹配规则是什么？匹配到第一个之后还会继续匹配吗？
const routes = (
  <>
    <Route path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path='/*' component={NoMatch} />
  </>
);

export default routes