// 哲学，哲理，哲学思想，生活信条

// 本指南是介绍React Router的动态路由
// 动态路由与之前接触的静态路由很不同


// 静态路由

// 如果你使用Rails,Express,Ember,Angular等，你使用的是静态路由，
// 在这些工程中，你需要在渲染前声明你的路由。
// React Router在 V4.0之前，也使用静态路由

// Express风格的路由
app.get('/',handleIndex)
app.get('/invoices', handleInvoices)
app.get('/invoices/:id', handleInvoice)
app.get('/invoices/:id/edit', handleInvoicesEdit)

app.listen();


// 

// Angular风格的路由
const appRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisListComponent
  },
  {
    path: 'hero/:id',
    component: HeroDetailComponent,
    
  },
  {
    path: 'heros',
    component: HeroListComponent,
    data: {title: 'Heros List'}
  },
  {
    path: '',
    redirectTo: '/heros',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppModule {  }



// Ember风格的路由
Router.map(function(){
  this.route("about")
  this.route('contact')
  this.route('rentails', function(){
    this.route('show', {path: '/:rental_id'})
  })
})


// 尽管API不同，但他们都共享“静态路由”模型。
// 成功使用React Router，请谨记一下这些：




// 动态路由
// 当我们说动态路由时，是指在应用程序渲染时发生的路由，而不是在正在运行的应用程序之外的配置或约定中。
// 这意味着几乎所有东西都是React Router中的一个组件。
// 首先，为目标环境准备Router组件，并将其渲染到应用程序的顶部。
// react-native
import {NativeRouter as Router} from 'react-router-native'
// react-router-dom
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
// 然后，使用<Link>组件链接到新导航
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)
// 最后，当用户访问'/dashboard'时，用<Route>来展示一些内容
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
  <div>
    <Route path='/dashboard' component={Dashboard} />
  </div>
)



// 嵌套路由

// 很多路由都有嵌套路由的概念；当从静态路由配置迁移到动态渲染路由时，如何嵌套路由？就像嵌套div一样
const App = () => (
  <Router>
    <div>
      <Route path='/tacos' component={Tacos} />
    </div>
  </Router>
)
// 当url匹配 '/tacos'时，Tacos将被渲染
const Tacos = ({ match }) => (
  <div>
    <Route path={match.url + '/carnitas'} component={Carnitas} />
  </div>
)


// Responsive Routes

// 当用户导航到'/invoices'，你的应用可以适应不同屏幕大小

// 小屏幕  url:  /invoices
// +---------------+
// |               |
// |   Dashboard   |
// |               |
// +---------------+
// |               |
// |  Invoice 01   |
// |               |
// +---------------+
// |               |
// |  Invoice 02   |
// |               |
// +---------------+
// |               |
// |  Invoice 03   |
// |               |
// +---------------+
// |               |
// |  Invoice 04   |
// |               |
// +---------------+

// 在更大的屏幕上，我们可以显示一些更详细的信息
// 其中导航位于左侧，内容位于右侧

// 大屏幕   url: /invoices/dashboard
// +---------------+--------------------------+
// |               |                          |
// |   Dashboard   |                          |
// |               |  Unpaid:           5     |
// +---------------+                          |
// |               |  Balance: ￥53,543.00    |
// |  Invoice 01   |                          |
// |               |  Past Due:          2    |
// +---------------+                          |
// |               |                          |
// |  Invoice 02   |                          |
// |               |                          |
// +---------------+     +--------------+     |
// |               |     |              |     |
// |  Invoice 03   |     | 一些其他内容  |     |
// |               |     |              |     |
// +---------------+     +--------------+     |
// |               |                          |
// |  Invoice 04   |                          |
// |               |                          |
// +---------------+--------------------------+

// 思考一下，对于大屏幕，'/invoices'是一个有效的路径吗？右侧应该渲染什么
// 当用户手机竖屏时，平幕尺寸小，只渲染侧边菜单，当手机旋转成横屏时，有足够的空间展示更多细节，需要立即重定向。
// 对于这样的功能，React以前的静态路由并没有一个可组合的答案。但是当路由是动态的时，
// 可以声明性地组成这个功能。
// 考虑将路由作为UI而不是静态配置，则以下代码显而易见

const App = () => (
  <AppLayout>
    <Route path='/invoices' component={Invoices} />
  </AppLayout>
)
const Invoices = () => (
  <Layout>
    {/* 导航总是显示 */}
    <InvoicesNav />
    <Media query={PRETTY_SMALL}>
      {screenIsSmall => 
        screenIsSmall ? (
          <Switch>
            <Route exact path='/invoices/dashboard' component={Dashboard} />
            <Route path='/invoices/:id' component={Invoice} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/invoices/dashboard' component={Dashboard} />
            <Route path='/invoices/:id' component={Invoice} />
            <Redirect from='/invoices' to='/invoices/dashboard' />
          </Switch>
        )
      }
    </Media>
  </Layout>
)

// 总结：
// 为了让直觉与React Router一致，考虑组件，而不是静态路由。
// 考虑如何使用React的声明性和组合性解决问题
// 几乎每一个'react-router问题'都可能是一个react问题