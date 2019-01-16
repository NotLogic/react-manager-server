import { combineReducers } from 'redux'
// import actionTypes from './actionTypes'
// import store from './index'
// reducer就是一个纯函数，接收旧的state和action，返回新的state
// 根reducer应该把多个子reducer输出合并成一个单一的state树
function submitLogin (previousState={}, action) {
  return previousState
}

// 使用自定义根reducer
// const rootReducer = function(previousState={}, action){
//   return previousState
// }

// 使用redux提供的reducer合并函数combineReducers(options)
// options  object: 键名为存放于state对象中的键名，键值为需要合并reducer函数
const rootReducer = combineReducers({
  login: submitLogin
})

export default rootReducer