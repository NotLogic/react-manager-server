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

import Login from '@/pages/login'
import Home from '@/pages/home'


import menuConfig from './menuConfig'


/* 学习 */
export const queryParams = {
  path: '/queryParams',
  component: QueryParams
}
export const staticRouterContext = {
  path: '/staticRouterContext',
  component: StaticRouterContext
}
export const modalGallery = {
  path: '/modalGallery',
  component: ModalGallery
}
export const routeConfig = {
  path: '/routeConfig',
  component: RouteConfig
}
export const ambiguousMatches = {
  path: '/ambiguousMatches',
  component: AmbiguousMatches
}
export const animationTransitions = {
  path: '/animationTransitions',
  component: AnimationTransitions
}
export const sidebar = {
  path: '/sidebar',
  component: Sidebar
}
export const recursiveExample = {
  path: '/recursiveExample',
  component: RecursiveExample
}
export const noMatch = {
  path: '/noMatch2',
  component: NoMatch2
}
export const preventingTransitions = {
  path: '/preventingTransitions',
  component: PreventingTransitions
}
export const customLink = {
  path: '/customLink',
  component: CustomLink
}
export const redirects = {
  path: '/redirects',
  component: Redirects
}
export const urlParameters = {
  path: '/urlParameters',
  component: UrlParameters
}
export const basic = {
  path: '/basic',
  component: Basic
}
export const study = {
  basic,
  urlParameters,
  redirects,
  customLink,
  preventingTransitions,
  noMatch,
  recursiveExample,
  sidebar,
  animationTransitions,
  ambiguousMatches,
  routeConfig,
  modalGallery,
  staticRouterContext,
  queryParams,
}

/* 学习结束 */

export const login = {
  path: '/login',
  component: Login
}
export const HOME_PATH = '/app/home'
export const home = {
  path: HOME_PATH,
  component: Home
}


export default {
  login,
  home,
  menuConfig
}