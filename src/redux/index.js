import { createStore, applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
// 使用redux-thunk中间件，可以在action中包含异步操作

// 数据流
// 1. 调用store.dispatch(action)
// 2. Redux store 调用传入的reducer函数
// 3. 根reducer应该把多个子reducer输出合并成一个单一的state树
// 4. Redux store 保存了根reducer返回的完整state树

let store = createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware
  )
)

export default store