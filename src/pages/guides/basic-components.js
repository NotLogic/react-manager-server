// 公共组件

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// React Router中有三种组件： 路由组件、路由匹配组件和路由导航组件，这些组件你需要从react-router-dom包导入

// 每一个React Router 项目的核心应该只有一个router组件；对于所有的web项目，react-router-dom提供了<BrowserRouter>和<HashRouter>
// 两种路由。它们都将为你创建一个特殊的historyt对象。通常来说，你应该使用<BrowserRouter>，如果你的项目是需要前后台交互的话，
// 如果是静态文件服务器，则可以使用<HashRouter>


// 路由匹配
// 有两种路由匹配组件  <Route>和<Switch>

// 路由匹配是通过将<Route>的path属性与当前location的pathname比较来完成的。当<Route>匹配时，它将呈现其内容，不匹配时，渲染null，没有路径则始终匹配
// 当 location = { pathname: '/about' }
<Route path='/about' component={About} />  //  渲染 <About  />
<Route path='/contact' component={Contach} />  //  渲染 null
<Route component={Always} /> //  渲染  <Always />


// 你可以在任何希望基于location渲染内容的地方市容<Route>
// 经常有必要在彼此旁边列出一些可能的<Route>. <Switch>组件用于将<Route>分组在一起
<Switch>
  <Route exact path='/' component={Home} />
  <Route path='/about' component={About} />
  <Route path='/contact' component={Contact} />
</Switch>


// 对<Route>分组，<Switch>不是必须的，但是会很有用。
// <Switch>将迭代它所有的子元素<Route>并且只渲染与当前location匹配的第一个元素。
// 当多个路由的路径匹配相同的pathname时，在路由之间设置转换动画以及标识没有路由匹配当前location时(以便渲染‘404’组件)将很有帮助
<Switch>
  <Route exact path='/' component={Home} />
  <Route path='/about' component={About} />
  <Route path='/contact' component={Contact} />
  {/* 当前边的都没有匹配时渲染NoMatch */}
  <Route component={NoMatch} />
</Switch>

// 路由渲染属性
// 对于如何渲染给定的<Route>：我们有component、render和children三个属性选择
// 这里我们重点介绍component和render，因为这两个是们们最常用的
// 当要渲染现有组件(React.Component或无状态功能组件)时，使用component
// 只有在必须将范围变量传递给需要渲染的组件时，才应该采用内联函数的render
// 不应该使用带有内联函数的组件属性来传递范围变量，因为或获取到并不需要的组件 unmounts/remounts

const Home = () => <div>Home</div>;
cosnt App = () => {
  const someVariable = true;
  return (
    <Switch>
      {/* 这样很好 */}
      <Route exact path='/' component={Home} />
      <Route path='/about' render={
        props => <About {...props} extra={someVariable} />
      } />
      {/* 不要这样做 */}
      <Route
        path='/contact'
        component={
          props => <Contact {...props} extra={someVariable} />
        }
      />
    </Switch>
  );
};


// 导航
// React Router提供<Link>组件在你的项目中创建链接
<Link to='/'>Home</Link>

// <NavLink>是一种特殊类型的<Link>，当其to prop与当前位置匹配时，可以将其自身设置为‘active’
// location = {pathname: '/react'}
<NavLink to='/react' activeClassName='hurray'>
  React
</NavLink>

// 当你想要强制导航（重定向），可以渲染一个<Redirect>。当渲染一个<Redirect>时，他将使用它的to属性进行导航
<Redirect to='/login' />