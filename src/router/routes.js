import React from 'react'
import {Route, Switch, Redirect} from 'react-router'
import jsCookie from 'js-cookie'
import { HOME_PATH } from './config'
import { sessionKey } from '@/libs/config'
import App from '@/app'
import NoMatch from '@/pages/404'
import Login from '@/pages/login'



// react router的匹配规则是什么？匹配到第一个之后还会继续匹配吗？
const routes = (
  <Switch>
    {/* 页面跳转规则：
      1. 判断是否登录，如果未登录，前往登录页
      2. 已登录：是否有权限，无权限则进行获取权限：（用户信息还是需要保存到sessionStorage中，因为刷新后会状态丢失）
      3. 判断是否有访问路径，没有则前往主页
     */}
    <Route path="/" exact render={() => {
      const session = jsCookie.get(sessionKey)
      let path = '/login'
      if(session){
        path = HOME_PATH
      }
      return <Redirect to={path} push></Redirect>
    }} />
    <Route path="/login" component={Login} />
    {/* 根据路由匹配规则这样写可以实现，会不会有什么问题 */}
    <Route path='/' component={App} />
    <Route path='/404' component={NoMatch} />
    <Route path='/*' component={NoMatch} />
  </Switch>
);

export default routes