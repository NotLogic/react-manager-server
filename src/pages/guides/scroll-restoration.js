// 滚动复原

// 浏览器开始使用history.pushState自己处理复原，其他处理方式与普通浏览器导航相同。
// 在chrome中实现的很好，这是scroll restoration规范：


// 因为浏览器开始处理“默认情况”，并且应用程序有不同的滚动需求（比如：）
// 我们不提供默认的滚动管理。
// 本指南将帮助你实现所需的任何滚动

// 滚动到头部
// 大多数情况下，我们有一个长页面，滚动到下边，在导航发生时我们需要滚动到顶部
// 这很容易用一个将在每次导航时向上滚动窗口的<ScrollToTop>组件来处理，
// 确保用withRouter将其包裹起来，使其能够访问路由的属性

class ScrollToTop extends Component {
  componentDidUpdate (prevProps) {
    if(this.props.location !== prevProps.location){
      window.scrollTo(0, 0)
    }
  }
  render () {
    return this.props.children
  }
}

// 然后在你的app中使用，需要在<Router>以下
const App = () => (
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
)
// 或者用在任何你想用的地方
<ScrollToTop />


// 在特定的地方才滚动到顶部
class ScrollToTopOnMount extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }
  render () {
    return null
  }
}

class LongContent extends Component {
  render () {
    <div>
      <ScrollToTopOnMount />
      <h1>这里是一个长内容的页面</h1>
    </div>
  }
}

<Route path='/long-content' component={LongContent} />


// 通用解决方案 就是没有所谓的通用解决方案
// 通用解决方案 就是没有所谓的通用解决方案
// 通用解决方案 就是没有所谓的通用解决方案

// 对于通用解决方案（以及那些浏览器开始本机实现），我们讨论以下两点：
// 在导航上向上滚动，这样就不会启动滚动到底部的新屏幕
// 在“后退”和“前进”点击时恢复窗口和溢出元素的滚动位置（但不恢复链接点击！）
// 有一次我们想发布一个通用的API。我们的目标是：
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>
      <RestoredScroll id="bunny">
        <div style={{height: '200px', overflow: 'auto'}}>I will overflow</div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>

// 首先，ScrollRestoration 将在导航时向上滚动；
// 其次，它将使用 location.key 将窗口滚动位置和RestoredScroll组件保存到sessionStorage。
// 然后，当ScrollRestoration或RestoreScroll组件mount，它们可以从sessionStorage中查找它们的位置。

// 