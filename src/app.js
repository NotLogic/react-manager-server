import React from 'react'
import {Layout} from 'antd'
import SideMenu from '@/components/menu'
import MyHeader from '@/components/header'
import { Route, Link , Switch, Redirect } from 'react-router-dom'
import {study, HOME_PATH} from '@/router/config'
import menuConfig from '@/router/config/menuConfig'
import Home from '@/pages/home'
import {connect} from 'react-redux'
import {requestMenuData} from '@/redux/actions'

const {Header, Footer, Sider, Content} = Layout

class Routes extends React.Component {
  render () {
    const {menuData} = this.props
    console.log('menuData: ',menuData)
    return (
      <Switch>
        <Route path={HOME_PATH} component={Home} />
        {menuData.map(item=>{
          item.children.map(child=>{
            return <Route 
              exact
              path={`/app/${item.permValue}/${child.permValue}`} 
              // component={menuConfig[child.permValue]} 
              render={props=>{
                console.log(props)
                return null
              }}
              />
          })
        })}
        {/* <Route render={ () => <Redirect to='/404' />} /> */}
      </Switch>
    );
  }
}


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
    const {history, menuData, match, location} = this.props
    console.log('this.props: ',this.props)
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
            <Content style={{margin: '10px', border: '1px solid #999', backgroundColor: '#fff'}}>
              {/* 这里需要使用嵌套路由来渲染 */}
              <Routes menuData={menuData} {...this.props} />
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