import * as types from './type'
import http from '@/plugins/axios'
import jsCookie from 'js-cookie'
import {sysUserKey, sessionKey} from '@/libs/config'
import {deepcopy} from '@/libs/utils'
import apis from '@/apis'


// 通过使用指定的中间件，action创建函数除了返回action对象外，还可以返回函数。这时，这个action创建函数就成了thunk
// 标准的做法是使用redux-thunk中间件
// 当action创建函数返回函数时，这个函数会被(Redux  Thunk)中间件执行。这个函数并不需要保持纯净；
// 它还可以带有副作用，包括执行异步API请求。这个函数还可以dispatch action，就像dispatch前面定义的同步action一样

// 用户登录
// 先调登陆接口，拿到sessionId,设置到cookie中，然后才可以获取用户权限，后端从sessionId中获取用户信息
export const submitLogin = (loginParams, authParams) => dispatch => {
  return new Promise(function(resolve, reject){
    dispatch(isLogined({isLogining: true}))
      http(loginParams).then(res=>{
        // 缓存用户信息，设置cookie
        let { sessionId, sysUser } = res.data
        sessionStorage[sysUserKey] = JSON.stringify(sysUser)
        jsCookie.set(sessionKey,sessionId,{ path: '' })
        // 获取用户权限
        http(authParams).then(res2=>{
          let {menuList,permissionList} = res2.data
          if(!menuList.length || !permissionList.length){
            // 无权访问
            reject({noAuth: true})
          }
          dispatch(isLogined({
            isLogining: false,
            menuList,
            permissionList,
            sessionId,
            sysUser
          }))
          resolve()
        }).catch(() => {
          //  授权失败
          reject({getAuthError: true})
        })
      }).catch(()=>{
        dispatch(isLogined({
          isLogining: false,
        }))
        // 登录失败
        reject({isLoginError: true})
      })
  })
}
function isLogined ({ isLogining, sessionId, sysUser, menuList, permissionList }) {
  let action = {
    type: types.SUBMIT_LOGIN,
    menuList,
    permissionList,
    isLogining,
    sessionId,
    sysUser
  }
  return action
}

// 退出登录
export const submitLogout = () => dispatch => {
  return new Promise(function(resolve, reject){
    const {params} = apis.logout
    http(params).then(res=>{
      if(res.code==1){
        dispatch(logout)
        resolve(res)
      }else{
        reject({message: '退出失败'})
      }
    }).catch(err=>reject(err))
  })
}

function logout () {
  let action = {
    type: types.LOGOUT
  }
  return action
}

// 获取侧边栏菜单
export const requestMenuData = () => dispatch => {
  return new Promise(function(resolve, reject){
    const {params} = apis.getMenu
    // 设置缓存，如果缓存中有从缓存拿
    if(sessionStorage.menuData){
      const menuData = JSON.parse(sessionStorage.menuData)
      const res = {
        code: 1,
        data: menuData
      }
      dispatch(setMenuData(menuData))
      resolve(res)
      return
    }
    http(params).then(res=>{
      if(res.code==1){
        const menuData = resultMenuData(res.data)
        sessionStorage.menuData = JSON.stringify(menuData)
        dispatch(setMenuData(menuData))
        resolve(res)
      }
    }).catch(err=>reject(err))
  })
}
function resultMenuData (data) {
  let parentMenuData=[],childrenMenuData=[]
  data.forEach(item=>{
    // permTypeMap: { 
    //   1: '菜单',
    //   2: '按钮',
    //   3: '接口',
    //   4: '特殊',
    // },
    // 是否子节点
    // isLeafMap: {
    //   '0': '不是',
    //   '1': '是'
    // },
    let _item = deepcopy(item)
    let {id, permType, isLeaf, permName, permValue, parentName, parentValue} = item
    // 筛选所有的菜单： permType=1 的；isLeaf=0父菜单，isLeaf=1子菜单
    // 筛选所有的按钮： permType=2 的；所有的isLeaf=1
    if(permType==1){
      if(isLeaf==0){
        _item.children = []
        parentMenuData.push(_item)
      }else if(isLeaf==1){
        childrenMenuData.push(_item)
      }
    }
  })
  childrenMenuData.forEach(child=>{
    parentMenuData.forEach(parent=>{
      if(child.parentValue == parent.permValue){
        parent.children.push(child)
      }
    })
  })
  return parentMenuData
}
function setMenuData(data=[]) {
  let action = {
    type: types.SET_MENU_DATA,
    menuData: data
  }
  return action
}

// 页面列表
export const changePager = (pager) => dispatch => {
  const {current, size} = pager
  if(current){

  }
  if(size){

  }
}
export const paging = (params) => dispatch => {
  dispatch({
    type: types.SET_PAGE_DATA,
    pageLoading: true
  })
  return new Promise(function(resolve, reject){
    http(params).then(res=>{
      dispatch({
        type: types.SET_PAGE_DATA,
        data: res.data,
        pageLoading: true,
        current: res.current,
        total: res.total
      })
      resolve(res)
    }).catch(err=>{
      dispatch({
        type: types.SET_PAGE_DATA,
        pageLoading: true
      })
      reject(err)
    })
  })
}

export default {

}