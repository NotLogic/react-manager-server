// 侧边菜单
import SystemUser from '@/pages/authority/systemUser'
import Role from '@/pages/authority/role'
import Authority from '@/pages/authority'

// 键名必须和数据库存储保持一致
// 键名为数据库存储的菜单名称
const config = {
  systemUser: SystemUser,
  role: Role,
  authority_index: Authority,
}
export default config