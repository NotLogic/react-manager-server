import file from './file'
import address from './address'
import editor from './editor'
import errorPrompt from './error-prompt'

export const sessionKey = 'JSESSIONID'
export const savePasswordKey = 'SPK'
export const sysUserKey = 'SUK'
export const defaultCurrentKey = 'current'
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