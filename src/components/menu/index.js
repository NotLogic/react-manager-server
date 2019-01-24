import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(target){
    const {key: path} = target
    const {history} = this.props
    history.push(path)
  }

  render () {
    const {menuData} = this.props
    // 动态路由，侧边菜单由后端返回权限数据动态生成，路由同理
    // 返回的权限数据为后端查出来的权限列表中的部分(全部)数据
    return (
      <Menu mode="inline" theme="dark" onClick={this.handleClick}>
        {menuData.map(item=>{
          return (
            <SubMenu key={'/' + item.permValue} title={
              <span>
                {/* <Icon type="mail" /> */}
                <span>{item.permName}</span>
              </span>
            }>
              {item.children.map(child=>{
                return (
                  <Menu.Item key={'/' + item.permValue + '/' + child.permValue}>
                    {child.permName}
                  </Menu.Item>
                )  
              })}
            </SubMenu>
          )
        })}
      </Menu>
    );
  }
}
const mapStateToProps = state => ({
  menuData: state.menuData,
})


export default connect(mapStateToProps)(SideMenu)