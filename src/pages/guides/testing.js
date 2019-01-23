// 测试

// React Router依赖与React context工作，这影响你如何测试你的组件
// context 上下文
// 如果尝试对渲染<Link>或<Route>等组件之一进行单元测试，将收到一些关于context的错误和警告。
// 虽然你可能会试图自己中断router的上下文，但仍建议将单元测试包装在<StaticRouter>或<MemoryRouter>中
// 待测试的组件
class Sidebar extends Component {
  // ...
  render () {
    <div>
      <button onClick={this.toggleExpand}>expand</button>
      <ul>
        {users.map(user=>(
         <li>
           <Link to={user.path}>{user.name}</Link>
         </li> 
        ))}
      </ul>
    </div>
  }
}

// 错误测试示例
test('it expands when the button is clicked', () => {
  render(<Sidebar />);
  click(theButton);
  expect(theThingToBeOpen);
})

// 正确示例
test('it expands when the button is clicked', () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  click(theButton);
  expect(theThingToBeOpen);
})

// 从特定route开始
// <MemoryRouter>支持 initialEntries 和 initialIndex 属性，因此可以在特定位置启动应用程序(或应用的任何较小部分 )
test('current user is active in sidebar', ()=>{
  render(
    <MemoryRouter initialEntries={['/users/2']}>
      <Sidebar />
    </MemoryRouter>
  );
  expectUserToBeActive(2)
})


// navigation  导航
// 我们做过很多测试，当location改变时路由工作，所以你可能不需要你测试这些东西。
// 但是如果你必须要这样做，在渲染发生之前，我们可以做如下事情：
import { render, unmountComponentAtNode } from 'react-dom'
import React from 'react'
import { Route, Link, MemoryRouter } from 'react-router-dom'
import { Simulate } from 'react-addons-test-utils'

// 一种在MemoryRouter中渲染你的部分APP的方法，是当location改变时，向它传递一盒要执行的步骤列表，
// it will call back to you with stuff like `match` and `loaction`,and `history`,
// 这样你可以控制流，并作出断言
const renderTestSequence = ({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps
}) => {
  const div = document.createElement('div')
  class Assert extends React.Component {
    componentDidMount () {
      this.assert()
    }
    componentDidUpdate () {
      this.assert()
    }
    assert() {
      const nextStep = steps.shift()
      if(nextStep){
        nextStep({...this.props, div})
      }else{
        unmountComponentAtNode(div)
      }
    }
    render () {
      return this.props.children
    }
  }
  class Test extends React.Component {
    render () {
      return (
        <MemoryRouter>
          <Route
            render={props=>(
              <Assert {...props}>
                <Subject />
              </Assert>
            )}
          />
        </MemoryRouter>
      )
    }
  }
  render(<Test />, div)
}

// 
const App = () => (
  <div>
    <Route
      exact
      path='/'
      render={()=>(
        <div>
          <h1>Welcome</h1>
        </div>
      )}
    />
    <Route
      path='/dashboard'
      render={()=>(
        <div>
          <h1>Dashboard</h1>
          <Link to='/' id='click-me'>
            Home
          </Link>
        </div>
      )}
    />
  </div>
)


// 
it('navigates around', done => {
  renderTestSequence({
    // 告诉it你要测试的组件
    subject: App,
    // 每次location变化时要执行的步骤
    steps: [
      // 初始渲染
      ({history, div}) => {
        // 
        console.assert(div.innerHTML.match(/Welcome/))
        // 为了测试，强制进行导航
        history.push('/dashboard')
      },
      // 第二次从新的location渲染
      ({div}) => {
        console.assert(div.innerHTML.match(/Dashboard/));
        // 或者我们可以模拟点击链接而不是使用历史记录
        Simulate.click(div.querySelector("#click-me"), {
          button: 0
        })
      },
      // 最终渲染
      ({location}) => {
        console.assert(location.pathname === '/');
        // 将需要类似“done()”的内容，因此如果从未在此进行测试，则测试将失败
        done();
      }
    ]
  })
})




