import React from 'react'
import {Layout} from 'antd'
import SideMenu from '@/components/menu'
import MyHeader from '@/components/header'
import {Route, Switch} from 'react-router'
// import {study} from '@/router/config'

const {Header, Footer, Sider, Content} = Layout

export default class Common extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuData: []
    }
  }

  render () {
    return (
      <div style={{position: 'fixed',left: 0,right: 0,top: 0,bottom: 0}} >
        <Layout style={{ minHeight: '100vh'}}>
          <Sider style={{backgroundColor: '#001529' }}>
            <SideMenu menuData={this.state.menuData}></SideMenu>
          </Sider>
          <Layout>
            <Header style={{backgroundColor: '#fff',padding: '0 10px'}}>
              <MyHeader></MyHeader>
            </Header>
            <Content style={{margin: '10px', border: '1px solid #999', backgroundColor: '#fff'}}>
              如何在这里渲染不同的页面呢呢呢？？？
              {/* 这样写为什么无法渲染呢 */}
              {/* {Object.keys(study).map(key => {
                console.log('study[key]: ',study[key])
                return <Route
                          key={key}
                          path={study[key].path}
                          component={study[key].component}
                        ></Route>
              })} */}
            </Content>
            <Footer style={{backgroundColor: '#f5f7f9',textAlign: 'center' }}>Copyright © 深圳市拉呱科技有限公司版权所有</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}