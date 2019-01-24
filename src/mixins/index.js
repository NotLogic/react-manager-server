import {trimArray} from '@/libs/utils'

export function hasPerm(permStr, permissionList=[]){
  // 关闭权限
  // return true
  if(typeof permStr != 'string')return false
  var str = '' + permStr,has=false
  // 处理中文冒号
  if(str.indexOf('：') != -1){
    str = str.replace(/：/g,':')
  }
  var _str = trimArray(str.split(':')).join(':')
  permissionList.forEach(item=>{
    if(item==_str)has = true
  })
  return has
}