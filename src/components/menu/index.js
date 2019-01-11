import React, {Component} from 'react'
import {Menu} from 'antd'


export default class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const {menuData} = this.props
    console.log('menuData: ',menuData)
    return (
      <Menu mode="inline" theme="dark">
        <Menu.Item key="1">
          啦啦啦
        </Menu.Item>
      </Menu>
    );
  }
}