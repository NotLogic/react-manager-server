import React from 'react'
import {connect} from 'react-redux'
import { submitLogin } from '@/redux/actions'
import {Card, Form, Icon, Input, Button, Checkbox, message} from 'antd'
import {deepcopy} from '@/libs/utils'
import md5 from 'md5'
import {savePasswordKey} from '@/libs/config'
import {HOME_PATH} from '@/router/config'

// 引入提示语言包
import LoginPack from '@/libs/locale-provider/zh_CN/login'
// import LoginPack from '@/libs/locale-provider/en_US/login'
// 登录的提示包

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
  // 所有的数据均写在类组件的构造方法中，方便统一管理
  constructor(props){
    super(props)
    this.state = {
      rememberMe: true,
    }

    this.loginUrl = 'web/sys/user/login'
    this.getAuth = 'web/sys/perm/shiro/vue'

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateRememberMe = this.updateRememberMe.bind(this)
  }
  

  componentDidMount(){
    if(localStorage[savePasswordKey]){
      let {loginName, loginPass} = JSON.parse(localStorage[savePasswordKey])
      this.props.form.setFieldsValue({
        loginName,
        loginPass,
      });
    }
  }

  savePassword(data){
    let vm = this
    let {rememberMe} = vm.state
    if(rememberMe){
      sessionStorage[savePasswordKey] = JSON.stringify(data)
      localStorage[savePasswordKey] = JSON.stringify(data)
    }else{
      localStorage.removeItem(savePasswordKey)
    }
  }

  skipLogin(){
    let vm = this
    let {history} = vm.props
    setTimeout(function(){
      message.success(LoginPack.success)
      history.push(HOME_PATH)
    }, 500)
  }

  storeLogin(submitForm) {
    const vm = this
    const {submitLogin, history} = vm.props
    let ajaxData = deepcopy(submitForm)
    ajaxData.loginPass = md5(ajaxData.loginPass)
    let loginParams = {
      method: 'post',
      url: vm.loginUrl,
      params: ajaxData,
    }
    let authParams = {
      method: 'post',
      url: vm.getAuth
    }
    // 
    submitLogin(loginParams, authParams).then(successMessage =>{
      message.success(successMessage)
      history.push(HOME_PATH)
    }).catch(errMessage=>
      message.error(errMessage)
    )
  }

  handleSubmit(e){
    e.preventDefault()
    let vm = this
    vm.props.form.validateFields((err, values) => {
      if(!err){
        // save password
        vm.savePassword(values)
        vm.skipLogin()
        // vm.storeLogin(values)
      }
    })
  }

  updateRememberMe(e){
    this.setState({
      rememberMe: e.target.checked
    })
  }

  render () {
    const {form, login: loginState} = this.props
    const {getFieldDecorator, getFieldsError} = form
    return (
      <div className="login-wrapper">
        <div className="login-main">
          <Card
            title={LoginPack.title}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('loginName', {
                  rules: [{required: true,message: LoginPack.usernameNull}]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={this.handleSubmit} placeholder={LoginPack.usernamePlaceholder} />
                )}
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('loginPass', {
                    rules: [{required: true,message: LoginPack.passwordNull}]
                  })(
                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={this.handleSubmit} placeholder={LoginPack.passwordPlaceholder} type="password" />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Checkbox checked={this.state.rememberMe} onChange={this.updateRememberMe}><span className="tips-text">{LoginPack.rememberMe}</span></Checkbox>
              </Form.Item>
              <Button type="primary" disabled={hasErrors(getFieldsError())} loading={loginState.isLogining} htmlType="submit" block>{LoginPack.button}</Button>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
// 登录组件不需要监听state变化
const mapStateToProps = state => {
  return {
    login: state.login
  }
}

// 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，
// 对象所定义的方法名将作为属性名；每个方法将返回一个新的函数，
// 函数中dispatch方法会将action creator的返回值作为参数执行。这些属性会被合并到组件的 props 中。
// const mapDispatchToProps = dispatch => ({
  
// })
const mapDispatchToProps = {
  submitLogin
}

// connect 连接组件类与Redux store  文档 https://www.redux.org.cn/docs/react-redux/api.

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))