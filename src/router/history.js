// react-router升级后location被叫做history，由"history"包导入它们，不再从react-router导入
// createBrowserHistory, createHashHistory, createMemoryHistory
import {createBrowserHistory as History} from 'history'
let history = new History()
export default history