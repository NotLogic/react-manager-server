import React, {Component} from 'react'
import {Menu} from 'antd'
import {connect} from 'react-redux'


class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const {menuData, login} = this.props
    return (
      <Menu mode="inline" theme="dark">
        <Menu.Item key="1">
          啦啦啦
        </Menu.Item>
      </Menu>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps)(SideMenu)