// 保存文件配置
import file from './file'
// 省市区数据配置
import address from './address'
// 百度富文本配置
import editor from './editor'
// 错误提示
import errorPrompt from './error-prompt'
// 将用户权限信息保存到cookie中的key
export const sessionKey = 'JSESSIONID'
// 登录时将用户密码保存到sessionStorage中的key
// todo：将对象转为JSON字符串然后进行base64转码保存
export const savePasswordKey = 'SPK'
// 将系统用户信息保存到sessionStorage中的key
export const sysUserKey = 'SUK'
// 默认当前页的key
export const defaultCurrentKey = 'current'
// 默认每个页数的key
export const defaultPageSizeKey = 'size'

const config = {
  file,
  // 省市区数据
  address,
  editor,
  // 错误提示
  errorPrompt
}
export default config