import React from 'react'
import {Route, Switch} from 'react-router'
import pathMap from '@/router/pathMap'


import Login from '@/pages/login'
import App from '@/app'
import NoMatch from '@/pages/404'
// import Common from '@/components/common'
// import Home from '@/pages/home'


import Basic from '@/pages/study/basic'
import Redirects from '@/pages/study/redirects'
import UrlParameters from '@/pages/study/urlParameters'
import CustomLink from '@/pages/study/customLink'
import PreventingTransitions from '@/pages/study/preventingTransitions'
import NoMatch2 from '@/pages/study/noMatch'
import RecursiveExample from '@/pages/study/recursiveExample'
import Sidebar from '@/pages/study/sidebar'
import AnimationTransitions from '@/pages/study/animationTransitions'
import AmbiguousMatches from '@/pages/study/ambiguousMatches'
import RouteConfig from '@/pages/study/routeConfig'
import ModalGallery from '@/pages/study/modalGallery'
import StaticRouterContext from '@/pages/study/staticRouterContext'
import QueryParams from '@/pages/study/queryParams'

const keys = Object.keys(pathMap) 
const routes = (
  <Switch>
    <Route path="/" exact component={App}></Route>
    {/* 学习 */}
    <Route path="/queryParams" component={QueryParams}></Route>
    <Route path="/staticRouterContext" component={StaticRouterContext}></Route>
    <Route path="/modalGallery" component={ModalGallery}></Route>
    <Route path="/routeConfig" component={RouteConfig}></Route>
    <Route path="/ambiguousMatches" component={AmbiguousMatches}></Route>
    <Route path="/animationTransitions" component={AnimationTransitions}></Route>
    <Route path="/sidebar" component={Sidebar}></Route>
    <Route path="/recursiveExample" component={RecursiveExample}></Route>
    <Route path="/noMatch" component={NoMatch2}></Route>
    <Route path="/preventingTransitions" component={PreventingTransitions}></Route>
    <Route path="/customLink" component={CustomLink}></Route>
    <Route path="/redirects" component={Redirects}></Route>
    <Route path="/urlParameters" component={UrlParameters}></Route>
    <Route path="/basic" component={Basic}></Route>
    {/* 学习结束 */}
    {keys.map(key=> <Route key={key} path={pathMap[key].path} component={pathMap[key].component}></Route> )}
    {/* <Route path="/login" component={Login}></Route>
    <Route path="/home" component={Home}></Route>
    <Route path="/common" component={Common}></Route> */}
    <Route component={NoMatch}></Route>
  </Switch>
);

export default routes