// 代码拆分

// 代码拆分可以让访问者在使用之前不必下载整个应用。可以将代码拆分视为增量下载应用程序
// 为此，我们将使用 webpack, @babel/plugin-syntax-dynamic-import和react-loadable

// webpack 内置了对动态导入的支持；
// 但是如果你使用Babel(例如：将JSX编译为JavaScript)，
// 那么你需要使用@babel/plugin-syntax-dynamic-import插件。
// 这是一个仅用于动态语法的插件， 这意味着Babel不会进行任何额外的转换
// 这个插件只允许babel解析动态导入，这样webpack就可以将它们打包成拆分的代码
// 使用代码查分，你的 .babelrc 应该有以下部分
// {
//   "presets": ["@babel/react"],
//   "plugins": ["@babel/plugin-syntax-dynamic-import"]
// }

// react-loadable是用于加载具有动态导入的组件的高阶组件。
// 它自动处理各种边缘情况，是代码拆分变得简单！
// 如何使用react-loadable的例子：
import Loadable from 'react-loadable'
import Loading from './loading'

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})

export default class LoadableComponent extends React.Component {
  render () {
    return <LoadableComponent />
  }
}

// 只需使用 LoadableDashboard(或者你命名的组件) 便可以实现自动加载和渲染。
// loader是一个实际加载组件的函数，
// loading是loader在加载组件时展示的组件


// 代码拆分和服务端渲染
// react-loadable 包括服务器端渲染指南。
// 你需要做的是字啊你的.babelrc中包含 babel-plugin-import-inspector
// 并且只在服务端渲染起作用
{
  "presets": ["@babel/react"],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "import-inspector",
      {
        "serverSideRequirePath":  true
      }
    ]
  ]
}















