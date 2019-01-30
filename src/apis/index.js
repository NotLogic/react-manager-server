// 系统用户
import systemUser from './systemUser'
// 角色
import role from './role'
// 权限列表
import authority from './authority'
// 退出登录
const logout = {
  params: {
    url: 'web/sys/user/quit'
  },
}
// 获取侧边菜单
const getMenu = {
  params: {
    url: 'web/sys/perm/dataAllGrid'
  },
}

const apis = {
  logout,
  getMenu,
  systemUser,
  role,
  authority,
}
export default apis