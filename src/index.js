// import必须在最上部，不可以在执行其他语句后import文件
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
// 引入 window.fetch polyfill
import 'whatwg-fetch' 

// 路由
// import MyRouter from '@/router'
import {BrowserRouter as Router} from 'react-router-dom'
import routes from '@/router/routes'
// console.log('MyRouter: ',MyRouter)
// 状态管理


ReactDOM.render((
  <Router>
    {routes}
  </Router>
  // <MyRouter />
  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
