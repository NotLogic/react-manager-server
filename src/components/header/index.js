import React from 'react'
import { connect } from 'react-redux'
import {submitLogout} from '@/redux/actions'
import { Row, Col, Menu, Dropdown, Icon, Modal, Form, Select, Button } from 'antd'
import {sysUserKey} from '@/libs/config'

const DropdownMenu = handleMenuClick => (
  <Menu onClick={handleMenuClick} >
    <Menu.Item key="1">修改昵称/密码</Menu.Item>
    {/* <Menu.Item key="2">注销</Menu.Item> */}
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
    this.modifyPassword = 'web/sys/user/update'

    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.resetModal = this.resetModal.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.logout = this.logout.bind(this)
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
    const vm = this
    Modal.confirm({
      title: '确认退出',
      content: '请点击确定前往登录页进行重新登录',
      onOk: function(){
        const {history,submitLogout} = vm.props
        submitLogout().then(res=>{
          history.push('/login')
        }).catch(err=>{
          console.log(err)
        })
      }
    })    
  }

  handleMenuClick (target) {
    if(target.key==1){
      this.triggerModal(true)
    }else if(target.key==2){
      this.logout()
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
          面包屑导航
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
          <Button onClick={this.logout} style={{marginLeft: '20px'}}>注销</Button>
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
const mapStateToProps = state => ({
  login: state.login
})
const mapDispatchToProps = {
  submitLogout
}
export default connect(mapStateToProps, mapDispatchToProps)(MyHeader)
