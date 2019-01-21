import React from 'react'
import { Row, Col, Menu, Dropdown, Icon, Modal, Form, Select } from 'antd'
import { Link } from 'react-router-dom'
import {sysUserKey} from '@/libs/config'
import http from '@/plugins/axios'

const DropdownMenu = handleMenuClick => (
  <Menu onClick={handleMenuClick} >
    <Menu.Item key="1">修改昵称/密码</Menu.Item>
    <Menu.Item key="2">注销</Menu.Item>
  </Menu>
);

class ChangePasswordForm extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  handleSubmit (e) {
    e.preventDefault()

  }

  render(){
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={12}>
            <Form.Item>
              1
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              2
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Select >
              <Select.Option value={1}>是</Select.Option>
              <Select.Option value={0}>否</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={12}></Col>
          <Col span={12}></Col>
        </Row>
      </Form>
    );
  }
}
const WrapperChangePasswordForm = Form.create()(ChangePasswordForm)

class MyHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nickName: '',
      modalShow: false,
      submitLoading: false
    }

    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.resetModal = this.resetModal.bind(this)
    this.submitModal = this.submitModal.bind(this)
  }

  componentDidMount () {
    if(sessionStorage[sysUserKey]){
      const sysUser = JSON.parse(sessionStorage[sysUserKey])
      let {nickName,loginName} = sysUser
      nickName = nickName || loginName
      this.setState({
        nickName,
      })
    }
  }

  changePassword (){

  }

  logout () {
    
  }

  handleMenuClick (e) {
    if(e.key==1){
      this.triggerModal(true)
    }else if(e.key==2){

    }
  }

  triggerModal (bool) {
    this.setState({
      modalShow: bool
    })
  }
  
  submitModal () {
    let vm = this
    vm.setState({
      submitLoading: true
    })
    setTimeout(function(){
      vm.setState({
        submitLoading: false
      })
    }, 500)
  }

  resetModal () {
    this.triggerModal(false)
  }

  render () {
    return (
      <div className="clear-fix">
        <div className="header-left fl">
          头部
          <Link to="/login">注销</Link>
        </div>
        <div className="header-right fr">
          <Dropdown overlay={ DropdownMenu(this.handleMenuClick) } placement='bottomCenter'>
            <span>
              <span style={{marginRight: '5px'}}>欢迎</span>
              <a className='ant-dropdown-link' href='javascript:;'>
                {this.state.nickName}
                <Icon type="down" />
              </a>
            </span>
          </Dropdown>
        </div>
        <Modal
          title='修改昵称/密码'
          visible={this.state.modalShow}
          onOk={this.submitModal}
          confirmLoading={this.state.submitLoading}
          onCancel={this.resetModal}
          // 不允许点击遮罩关闭
          maskClosable={false}
          // 自定义确定取消文字
          // okText=''
          // cancelText=''
        >
          {/* 在父组件中操作子组件的表单，需要看教程 */}
          <WrapperChangePasswordForm />
        </Modal>
      </div>
    );
  }
}

export default MyHeader
