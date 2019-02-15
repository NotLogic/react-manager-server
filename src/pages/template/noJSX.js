import React from 'react'
const c = React.createElement
class MyComponent extends React.Component {
  render () {
    return c('div', null, '我的组件')
  }
}
export default MyComponent
// 编写React的时候，JSX并不是必须的。
// 当你不想在构建环境中安装相关编译工具的时候，不使用JSX编写React会比较方便。
// 每一个JSX元素都是React.createElement(component, props, ...children)的语法糖。
// 因此，任何时候使用JSX语法写的代码也可以用普通JavaScript语法写出来
// 例如如下JSX代码：
// class Hello extends React.Component {
//   render () {
//     return <div>Hello {this.props.toWhat}</div>
//   }
// }
// ReactDOM.render(
//   <Hello toWhat='World' />,
//   document.getElementById('root')
// )
// 可以编译成下面这段不使用JSX的代码
// class Hello extends React.Component {
//   render () {
//     return React.createElement('div', null, `Hello ${this.props.toWhat}`)
//   }
// }
// ReactDOM.render(
//   React.createElement(Hello, {toWhat: 'World'}, null),
//   document.getElementById('root')
// )
// 想要了解更多关于JSX如何被转换为JavaScript的例子，可以尝试下在线Babel编译器https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D
// 一个组件可以是一个字符串，也可以是React.Component的子类。当组件是无状态的时候，它也可以是一个普通函数。
// 如果对于每次都要输入React.createElement感到非常厌倦，这是一种常用的简写形式
// const e = React.createElement;
// ReactDOM.render(
//   e('div', null, 'Hello World'),
//   document.getElementById('root')
// )
// 如果使用React.createEleme的简写形式，这将很方便的区编写不使用JSX的React
// 其他的选择的话，可以参考社区上的项目react-hyperscript(https://github.com/mlmorg/react-hyperscript)和hyperscript-helpers(https://github.com/ohanhi/hyperscript-helpers)。