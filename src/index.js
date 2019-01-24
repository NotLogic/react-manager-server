// import必须在最顶部，import语句执行完才可以执行其他语句
import React from 'react';
import ReactDOM from 'react-dom';

// antd
import 'antd/dist/antd.css';
import {LocaleProvider} from 'antd'  //  国际化
import zhCN from 'antd/lib/locale-provider/zh_CN';   //  国际化

import './index.css';
import * as serviceWorker from './serviceWorker';

// 引入 window.fetch polyfill
import 'whatwg-fetch' 

// 路由
import MyRouter from '@/router'

// 状态管理
import { Provider } from 'react-redux'
import store from './redux'

// 热重载
import { AppContainer } from 'react-hot-loader';

ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <MyRouter />
      </LocaleProvider>
    </Provider>
  </AppContainer>
  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
