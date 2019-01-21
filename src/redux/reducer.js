import { combineReducers } from 'redux'
import * as types from './actions/type'
// reducer必须是一个纯函数
// reducer必须是一个纯函数
// reducer必须是一个纯函数
// 类似于vuex中的mutation,不管之前经过什么样的操作，触发指定mutation时，更改对应的state；且对于相同的输入，多次触发结果必定相同
// reducer接收旧的state和action，返回新的state
// 根reducer应该把多个子reducer输出合并成一个单一的state树
function login (previousState={}, action) {
  let {type, isLogining, sessionId, sysUser, menuList, permissionList} = action
  switch(type){
    case types.SUBMIT_LOGIN :
      return {
        ...previousState,
        isLogining,
        sessionId,
        sysUser,
        menuList,
        permissionList,
      }
    case types.LOGOUT :
      return {
        ...previousState,
        isLogining: false,
        sessionId: '',
        sysUser: {},
        menuList: [],
        permissionList: []
      }
    default :
      return previousState
  }
}

// 使用自定义根reducer
// const rootReducer = function(previousState={}, action){
//   let nextState = {}
//   return nextState  
// }

// 使用redux提供的reducer合并函数combineReducers(options)
// options  object: 键名为存放于state对象中的键名，键值为需要合并reducer函数
const rootReducer = combineReducers({
  login,
})

export default rootReducer