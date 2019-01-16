import { createStore } from 'redux'
import reducer from './reducer'

// 数据流
// 1. 调用store.dispatch(action)
// 2. Redux store 调用传入的reducer函数
// 3. 根reducer应该把多个子reducer输出合并成一个单一的state树
// 4. Redux store 保存了根reducer返回的完整state树

let store = createStore(reducer)

export default store