import React, {Component} from 'react'
import {Card, Form, Icon, Input, Button, Checkbox, message} from 'antd'
import http from '@/plugins/axios'
import {deepcopy} from '@/libs/utils'
import jsCookie from 'js-cookie'
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
      loginLoading: false,
    }

    this.loginUrl = 'web/sys/user/login'
    this.getAuth = 'web/sys/perm/shiro/vue'
    this.loginErrTxt = LoginPack.error
    this.noAuthTxt = LoginPack.noAuth
    this.loginSuccess = LoginPack.success

    this.submitLogin = this.submitLogin.bind(this)
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
    var vm = this
    var {rememberMe} = vm.state
    if(rememberMe){
      sessionStorage.lu = JSON.stringify(data)
      localStorage.lu = JSON.stringify(data)
    }else{
      localStorage.removeItem('lu')
    }
  }

  submitLogin(e){
    e.preventDefault()
    var vm = this
    vm.props.form.validateFields((err, values) => {
      if(!err){
        // values 表单中绑定的name组成的对象
        // vm.setState({
        //   loginLoading: true
        // })
        var ajaxData = deepcopy(values)
        ajaxData.loginPass = window.hex_md5(ajaxData.loginPass)
        var loginParams = {
          method: 'post',
          url: vm.loginUrl,
          params: ajaxData
        }
        vm.savePassword(values)
        http(loginParams).then(function(res){
          if(res.code==1){
            let { sessionId, sysUser } = res.data
            sessionStorage.sysUser = JSON.stringify(sysUser)
            jsCookie.set('JSESSIONID',sessionId,{ path: '' })
            var authParms = {
              method: 'post',
              url: vm.getAuth,
            }
            http(authParms).then(function(res2){
              if(res2.code==1){
                // 授权成功
                var {history} = vm.props
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
    const {getFieldDecorator, getFieldsError} = this.props.form
    return (
      <div className="login-wrapper">
        <div className="login-main">
          <Card
            title="登录"
          >
            <Form onSubmit={this.submitLogin}>
              <Form.Item>
                {getFieldDecorator('loginName', {
                  rules: [{required: true,message: '请输入您的账号'}]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                )}
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('loginPass', {
                    rules: [{required: true,message: '请输入您的密码'}]
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={this.submitLogin} placeholder="密码" type="password" />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Checkbox checked={this.state.rememberMe} onChange={this.updateRememberMe}><span className="tips-text">记住密码</span></Checkbox>
              </Form.Item>
              <Button type="primary" disabled={hasErrors(getFieldsError())} loading={this.state.loginLoading} htmlType="submit" block>登录</Button>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
const LoginForm = Form.create({name: 'login-form'})(Login)
export default LoginForm