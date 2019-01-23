// redux 衔接/集成

// Redux是React生态中的一个重要部分；我们想为需要同时使用React Router和Redux的人尽可能无缝衔接它们

// Blocked Updates  阻塞更新
// 一般来说，React Router和Redux可以很好的协同工作。
// 不过有时候，应用程序可以有一个组件，当location改变时不会更新(子路由或活动导航链接不更新)
// 这通常发生在：
//  1. 组件通过connect()(Comp)连接到Redux
//  2. 组件不是路由组件，这意味着它不是这样渲染的： <Route component={OneComponent} />
// 问题是，Redux实现了shouldComponentUpdate，并且如果没有从router收到props，那么将不会有任何东西发生改变
// 这很容易解决，找到你connect组件的位置，并使用withRouter将其包括起来即可
// 之前
export default connect(mapStateToProps)(OneComponent)
// withRouter包裹之后
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(OneComponent))

// Deep Integration  深度集成
// 有些人想
//  1. 将路由数据与store同步，并从store访问
//  2. 能够通过dispatch action进行导航
//  3. 支持Redux devtools中路由更改的时间旅行调试
// 上述的这些都需要更深度的集成
// 我们的建议是不要把你的路由放到Redux store 中，理由如下：
//  1. 路由数据已经作为prop在大部分组件中存在了，无论他来自store还是router，你组件中的代码基本相同
//  2. 编程式导航：推荐在组件中获取history对象，将其作为有效荷载传给需要调用的函数
//  3. 路径更改对于时间旅行调试不太重要。唯一明显的情况是router/store同步的问题，如果根本不同步，则没有问题

// 如果你非常希望将router和store同步，可以尝试 Connected React Router(https://github.com/supasate/connected-react-router),这是一个React Router v4和Redux的第三方绑定库


















