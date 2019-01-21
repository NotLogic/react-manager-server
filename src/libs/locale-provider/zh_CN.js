// 有没有办法全局传递，没的话就只能单独传递
// 以页面区分  
// 使用方法参见'src/pages/login'
var _default = {
  locale: 'zh-cn',
  common: {
    placeholder: '请选择',
    edit: '编辑',
    add: '添加',
    clear: '清空',
    submit: '提交',
    delete: '删除',
    search: '搜索',
    debugging: '调试',
    sure: '确定',
    close: '关闭',
    cancel: '取消',
  },
  login: {
    error: '您的用户名或密码输入错误，请重新输入！',
    success: '登陆成功！',
    noAuth: '对不起，您暂时无权访问本系统，请联系管理员给您进行授权',
    getAuthError: '获取权限失败，请稍后重试',
    title: '登录',
    button: '登录',
    usernamePlaceholder: '请输入您的账号',
    usernameNull: '账号不能为空',
    passwordPlaceholder: '请输入您的密码',
    passwordNull: '密码不能为空',
    rememberMe: '记住密码',
  }
}
export default _default