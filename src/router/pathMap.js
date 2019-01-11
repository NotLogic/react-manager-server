import Common from '@/components/common'
import Login from '@/pages/login'
import Home from '@/pages/home'

export const _login = {
  path: '/login',
  component: Login
}
export const _home = {
  path: '/home',
  component: Home
}
export const _common = {
  path: '/common',
  component: Common
}
//export const _login = {}

const map = {
  login: _login,
  home: _home,
  common: _common,
}

export default map