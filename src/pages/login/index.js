import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { submitLogin } from '@/redux/actions'
import {Card, Form, Icon, Input, Button, Checkbox, message} from 'antd'
import http from '@/plugins/axios'
import {deepcopy} from '@/libs/utils'
import jsCookie from 'js-cookie'
import md5 from 'md5'

// 引入提示语言包
import LanguagePack from '@/libs/locale-provider/zh_CN'
// import LanguagePack from '@/libs/locale-provider/en_US'
// 登录的提示包
const LoginPack = LanguagePack.login

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
  // 所有的数据均写在类组件的构造方法中，方便统一管理
  constructor(props){
    super(props)
    this.state = {
      rememberMe: true,
    }

    this.loginUrl = 'web/sys/user/login'
    this.getAuth = 'web/sys/perm/shiro/vue'
    this.sessionKey = 'JSESSIONID'
    this.loginErrTxt = LoginPack.error
    this.noAuthTxt = LoginPack.noAuth
    this.loginSuccess = LoginPack.success

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateRememberMe = this.updateRememberMe.bind(this)
  }
  

  componentDidMount(){
    if(localStorage.lu){
      let {loginName, loginPass} = JSON.parse(localStorage.lu)
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
      sessionStorage.lu = JSON.stringify(data)
      localStorage.lu = JSON.stringify(data)
    }else{
      localStorage.removeItem('lu')
    }
  }

  skipLogin(){
    let vm = this
    let {history} = vm.props
    setTimeout(function(){
      message.success(vm.loginSuccess)
      history.push('/home')
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
    submitLogin(loginParams, authParams, vm.sessionKey)
    setTimeout(function(){
      history.push('/')
    },1000)
  }

  handleSubmit(e){
    e.preventDefault()
    let vm = this
    vm.props.form.validateFields((err, values) => {
      if(!err){
        // save password
        vm.savePassword(values)
        // vm.skipLogin()
        vm.storeLogin(values)        
        return
        let ajaxData = deepcopy(values)
        ajaxData.loginPass = window.hex_md5(ajaxData.loginPass)
        let loginParams = {
          method: 'post',
          url: vm.loginUrl,
          params: ajaxData
        }
        http(loginParams).then(function(res){
          if(res.code==1){
            let { sessionId, sysUser } = res.data
            sessionStorage.sysUser = JSON.stringify(sysUser)
            jsCookie.set('JSESSIONID',sessionId,{ path: '' })
            let authParms = {
              method: 'post',
              url: vm.getAuth,
            }
            http(authParms).then(function(res2){
              if(res2.code==1){
                // 授权成功
                let {history} = vm.props
                message.success(vm.loginSuccess)
                history.push('/common')
              }else{
                message.error(vm.noAuthTxt)
              }
            })
          }else{
            message.error(vm.loginErrTxt)
          }
        })
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
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={this.handleSubmit} placeholder={LoginPack.passwordPlaceholder} type="password" />
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