import React from 'react'
import {Layout} from 'antd'
import SideMenu from '@/components/menu'
import MyHeader from '@/components/header'
import { Route, Switch } from 'react-router-dom'
import { HOME_PATH } from '@/router/config'
import menuConfig from '@/router/config/menuConfig'
import Home from '@/pages/home'
import {connect} from 'react-redux'
import {requestMenuData} from '@/redux/actions'

const {Header, Footer, Sider, Content} = Layout

class App extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount(){
    const {requestMenuData, menuData} = this.props
    // 请求侧边菜单数据
    if(!menuData.length){
      requestMenuData()
    }
  }

  render () {
    const {history, menuData} = this.props
    return (
      <div style={{position: 'fixed',left: 0,right: 0,top: 0,bottom: 0}} >
        <Layout style={{ minHeight: '100vh'}}>
          <Sider style={{backgroundColor: '#001529' }}>
            <SideMenu history={history} />
          </Sider>
          <Layout>
            <Header style={{backgroundColor: '#fff',padding: '0 10px'}}>
              <MyHeader history={history}></MyHeader>
            </Header>
            <Content style={{margin: '10px',padding: '10px', border: '1px solid #999', backgroundColor: '#fff'}}>
              {/* 这里需要使用嵌套路由来渲染 */}
              <Switch>
                <Route path={HOME_PATH} component={Home} />
                {/* 这里要注意，箭头函数后用花括号要写return才可以，不然不报错，也匹配不到组件，这个错误很难查出来 */}
                {menuData.map(item => item.children.map(child=>{
                  return <Route
                    path={`/${item.permValue}/${child.permValue}`} 
                    component={menuConfig[child.permValue]}
                    />
                  })
                )}
              </Switch>
            </Content>
            <Footer style={{backgroundColor: '#f5f7f9',textAlign: 'center' }}>Copyright © 深圳市拉呱科技有限公司版权所有</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  menuData: state.menuData,
})
const mapDispatchToProps = {
  requestMenuData
}

export default connect(mapStateToProps, mapDispatchToProps)(App)