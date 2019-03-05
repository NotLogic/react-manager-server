import React from 'react'
import { connect } from 'react-redux'
import {submitLogout} from '@/redux/actions'
import { Row, Col, Menu, Dropdown, Icon, Modal, Form, Select, Button, Input } from 'antd'
import {sysUserKey} from '@/libs/config'

const DropdownMenu = handleMenuClick => (
  <Menu onClick={handleMenuClick} >
    <Menu.Item key="1">修改昵称/密码</Menu.Item>
    {/* <Menu.Item key="2">注销</Menu.Item> */}
  </Menu>
);

// 修改昵称/密码
const passTypeMap = {
  '0': '否',
  '1': '是'
}
class MyFormDialog extends React.Component {
  render(){
    const {
      form,
      dialogShow,
      dialogSubmitLoading,
      closeModal,
      resetDialogForm,
      submitDialogForm
    } = this.props
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const {
      getFieldDecorator
    } = form
    return (
      <Modal
        maskClosable={false}
        title='修改昵称/密码'
        visible={dialogShow}
        onCancel={closeModal}
        // 不允许点击遮罩关闭
        maskClosable={false}
        footer={[
          <Button key="reset" onClick={resetDialogForm}>重置</Button>,
          <Button key="submit" type="primary" loading={dialogSubmitLoading} onClick={submitDialogForm}>提交</Button>
        ]}
        // 自定义确定取消文字
        // okText=''
        // cancelText=''
      >
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='账号'
              >
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: "账号不能为空" }]
                })(<Input placeholder='请输入账号' disabled />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='昵称'
              >
                {getFieldDecorator('nickName', {
                  rules: [{ required: true, message: "昵称不能为空" }]
                })(<Input placeholder='请输入昵称' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='修改密码'
              >
                {getFieldDecorator('roleDesc', {})(<Select
                  placeholder='请选择'
                  onChange={this.handleSelectChange}
                >
                  {Object.keys(passTypeMap).map(key => <Select.Option key={key} value={key}>{passTypeMap[key]}</Select.Option>)}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='密码'
              >
                {getFieldDecorator('loginPass', {
                  rules: [{ required: true, message: "密码不能为空" }]
                })(<Input.Password placeholder='请输入密码' />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>      
    );
  }
}
const FormDialog = Form.create()(MyFormDialog)

class MyHeader extends React.Component {
  constructor (props) {
    super(props)
    this.formRef = null
    this.state = {
      nickName: '',
      dialogShow: false,
      dialogSubmitLoading: false
    }
    this.modifyPassword = 'web/sys/user/update'
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

  logout = () => {
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

  handleMenuClick = target => {
    if(target.key==1){
      this.setState({
        dialogShow: true
      })
      // 初始化表单数据
      if(sessionStorage[sysUserKey]){
        console.log('sessionStorage[sysUserKey]: ',sessionStorage[sysUserKey])
      }
      const form = this.formRef && this.formRef.props.form
      form && form.setFields({

      })
    }else if(target.key==2){
      this.logout()
    }
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  closeModal = () => {
    this.setState({
      dialogShow: false
    })
    this.resetDialogForm()
  }
  resetDialogForm = () => {
    const form = this.formRef && this.formRef.props.form
    form && form.resetFields()
  }
  submitDialogForm = () => {
    const form = this.formRef && this.formRef.props.form
    console.log('form: ',form)
  }

  render () {
    let {
      dialogShow,
      dialogSubmitLoading
    } = this.state

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
        {/* 修改昵称密码弹窗 */}
        <FormDialog
          dialogShow={dialogShow}
          dialogSubmitLoading={dialogSubmitLoading}
          wrappedComponentRef={this.saveFormRef}
          closeModal={this.closeModal}
          resetDialogForm={this.resetDialogForm}
          submitDialogForm={this.submitDialogForm}
        />
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
