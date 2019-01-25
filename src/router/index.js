import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes'

// 这里要导出一个React组件，函数式或声明式都可以
// 错误示例：直接导出react-router的Router组件
// const MyRouter = (
//   <Router>
//     {routes}
//   </Router>
// )
const MyRouter = () => (
  <Router>
    {routes}
  </Router>
)

export default MyRouter