// 处理更新阻塞

// React Router有许多location-aware组件，这些组件使用当前location对象来确定它们渲染什么。
// 默认情况下，使用react的context模型将当前location隐式传递给组件。
// 当location改变时，这些组件将使用来自context的新location重新渲染。

// React 提供了两种优化应用程序渲染性能的方法：shouldComponentUpdate 生命周期方法和 PureComponent 组件。
// 两种方式都会阻止组件的重新渲染，除非满足正确的条件。
// 不幸的是，如果组织了React Router的重新渲染，那么他们的location-aware组件可能会与当前组件不同步。

// 问题示例  从阻止组件更新开始
class UpdateBlocker extends React.PureComponent {
  render () {
    return (
      <div>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/faq'>F.A.Q</NavLink>
      </div>
    );
  }
}

// 当<UpdateBlocker>在mount时，任何location-aware的子组件都将使用当前location和match对象渲染
// location = { pathname: '/about' }
<UpdateBlocker />
// <div>
//    <a href='/about' class='active'>About</a>
//    <a href='/faq'>F.A.Q</a>
// </div>

// 当location改变时， <UpdateBlocker>不会检测到任何prop或state改变，所以不会重新渲染其子组件。
// location = { pathname: 'faq' }
<UpdateBlocker />
// link将不被重新渲染，因此他们展示之前的属性
// <div>
//    <a href='/about' class='active'>About</a>
//    <a href='/faq'>F.A.Q</a>
// </div>




// shouldComponentUpdate
// 为了实现shouldComponentUpdate的组件知道它应该在location更改时更新，它的shouldComponentUpdate方法需要能够检测location更改
// 如果正在实现shouldComponentUpdate，那么可以比较当前和下一个context.router对象的location。但是作为用户，不应该直接使用context。
// 相反，如果可以在不接触context的情况下比较当前和下一个location，这将是最理想的选择

// 第三方代码
// 在位置更改后，你可能遇到组件未更新的问题，尽管你没有调用shouldComponentUpdate。
// 这很可能是因为第三方代码(如：react redux的connect和mobx react的observer)正在调用shouldComponentUpdate。
// react-redux
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)
// mobx-react
const MyObservedComponent = observer(MyComponent)

// 对于第三方代码，你甚至无法控制shouldComponentUpdate的实现。
// 相反，你必须重构代码，使这些方法的位置更改变得明显。
// connect和observer都创建了组件，其中shouldComponentUpdate方法对当前的props和下一个props进行了较浅的比较。
// 只有在至少一个属性发生改变时，这些组件才会重新渲染。 这意味着，为了确保他们在location更改时更新，需要为它们提供一个在位置更改是更改的属性。



// pureComponent
// React 的 PureComponent 不实现 shouldComponentUpdate ，但它采用了类似的方法来组织更新。当一个“纯”组件更新时
// 它将对当前的属性和状态与下一个属性和状态做一个简单的比较。如果没有检测到任何差异，组件将不会更新。
// 与shouldComponentUpdate类似，这意味着在location更改时强制“纯”组件更新，它需要具有已更改的属性或状态。


// 如果在使用高阶组件(如connect或observer)时遇到此问题，则可以将改组件包装在withRouter中以删除被阻止的更新。
// redux  before
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)
// redux after
const MyConnectedComponent = withRouter(connect(mapStateToProps)(MyComponent))

// mobx before
const MyConnectedComponent = observer(MyComponent)
// mobx after
const MyComponentedComponent = withRouter(observer(MyComponent))

// 这不是最有效的解决方案，但是可以防止被阻止的更新问题。
// 有关此解决方案的更多信息，请阅读Redux指南。
// 要理解为什么这不是最理想的解决方案，请阅读以下：

// 推荐解决方案
// The key to avoiding blocked re-renders after location changes is to pass the blocking component the location object as a prop. 
// This will be different whenever the location changes, so comparisons will detedt that the current and next location are different.
// 避免在location更改后重新渲染被阻止的关键是将location作为属性传递给阻塞组件。
// 每当location发生改变时，这将是不同的，因此比较将检测到当前和下一个location是不同的。

// location = { pathname: '/about' }
<UpdateBlocker location={location} />
// <div>
//    <a href='/about' class='active'>About</a>
//    <a href='/faq'>F.A.Q</a>
// </div>

// location = { pathname: '/faq' }
<UpdateBlocker location={location} />
// <div>
//    <a href='/about' class='active'>About</a>
//    <a href='/faq'>F.A.Q</a>
// </div>


// 获取location
// 要将当前location作为属性传递给组件，必须具有对其的访问权限。
// 组件访问location的主要方式是通过<Route>组件。
// 当<Route>匹配时（或者如果使用子属性，则始终如此），它将当前location传递给它渲染的子元素
<Route path='/here' component={Here} />
const Here = (props) => {
  // props.location = { pathname: '/here', ... }
  return <div>You are here</div>
}

<Route path='/there' render={props => {
  // props.location = { pathname: '/there', ... }
  return <div>You are there</div>
}} />

<Route path='/everythere' children={props => {
  // props.location = { pathname: '/everythere', ... }
  return <div>You are everythere</div>
}} />

// 这意味着，给定一个阻止更新的组件，你可以通过以下方式轻松地将location作为prop传递给它

// Blocker是一个“纯”组件，因此它只有收到信props时才会更新
class Blocker extends React.PureComponent {
  render () {
    return (
      <div>
        <NavLink to='/oz'>Oz</NavLink>
        <NavLink to='/kansas'>Kansas</NavLink>
      </div>
    );
  }
}

//1. 由<Route>直接渲染的组件不必担心被阻止更新，因为它将location作为prop注入
// <Blocker>的location prop将在location改变时改变
<Route path='/:place' component={Blocker} />


//2. 一个由<Route>直接渲染的组件及由它创建的子元素都将会收到location prop
<Route path='/parent' component={Parent} />
const Parent = props => {
  // <Parent>接收location作为prop，任何它创建的子元素都将收到location
  return (
    <SomeComponent>
      <Blocker location={props.location} />
    </SomeComponent>
  )
}


// 如果组件不是由<Router>渲染，而且渲染组件的组件在其variable scope(变量范围)内没有位置
// 会发生什么？有两种方法可与作为组件的支撑自动注入location
// 1.渲染无路径的<Route>。虽然<Route>通常用于匹配特定的路径，但是无path属性的<Route>将始终匹配，因此它将始终渲染其组件
// 无路径的<Route> = <Blocker> 将始终被渲染
const MyComponent = () => (
  <SomeComponent>
    <Route component={Blocker} />
  </SomeComponent>
)


// 2. 你可以使用withRouter高阶组件包裹你的组件，它将接收到当前location作为一个prop
const BlockAvoider = withRouter(Blocker)
cosnt MyComponent = () => (
  <SomeComponent>
    <BlockAvoider />
  </SomeComponent>
)





