import React from 'react'
import { Modal } from 'antd'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'

// 此高阶组件会使用到redux的state，需要在connect的内层

let Enhance = ComposedComponent => class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // 默认当前页
      [defaultCurrentKey]: 1,
      // 自定义当前页key  需要使用时进行填写
      currentKey: '',
      // 默认每页个数
      [defaultPageSizeKey]: 10,
      // 自定义每页个数key  需要使用时进行填写
      pageSizeKey: '',
      total: 0,
      pageLoading: false,
      dialogShow: false,
      currentDialog: 'add',
      pageData: [
        // 角色列表
        // {"id":1,"roleName":"管理员","roleValue":"admin","roleDesc":"拥有所有权限","createTime":"2018-08-02 11:20:40","modifyTime":"2018-08-02 11:20:40"},
        // {"id":9,"roleName":"开发","roleValue":"developer","roleDesc":"开发人员","createTime":"2018-09-04 14:48:08","modifyTime":"2018-09-04 14:48:08"},
        // {"id":10,"roleName":"预览菌","roleValue":"preview","roleDesc":"只可以查看搜索","createTime":"2018-09-05 15:44:04","modifyTime":"2018-09-05 15:44:04"},
        // {"id":12,"roleName":"代理商","roleValue":"agent","roleDesc":"代理商选择的角色","createTime":"2018-09-26 11:16:50","modifyTime":"2018-09-26 11:16:50"},
        // {"id":14,"roleName":"测试回显","roleValue":"test","roleDesc":"测试回显异常","createTime":"2018-09-26 15:12:43","modifyTime":"2018-09-26 15:12:43"}
        // 权限列表
        // {"id":238,"permValue":"ad","parentValue":null,"permName":"广告","parentName":null,"permType":1,"isLeaf":0,"createTime":"2018-10-26 10:15:47","modifyTime":"2018-10-26 10:15:47"},
        // {"id":239,"permValue":"adviceBack","parentValue":null,"permName":"意见反馈","parentName":null,"permType":1,"isLeaf":0,"createTime":"2018-10-26 10:16:45","modifyTime":"2018-10-26 10:16:45"},
        // {"id":26,"permValue":"adviceBack_index","parentValue":"adviceBack","permName":"反馈基础数据","parentName":"意见反馈","permType":1,"isLeaf":1,"createTime":"2018-08-15 19:49:01","modifyTime":"2018-08-15 19:49:01"},
        // {"id":65,"permValue":"adviceBack_index:add","parentValue":"adviceBack_index","permName":"新增","parentName":"反馈基础数","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:38","modifyTime":"2018-08-23 12:29:38"},
        // {"id":69,"permValue":"adviceBack_index:dataGrid","parentValue":"adviceBack_index","permName":"列表","parentName":"反馈基础数","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:42","modifyTime":"2018-08-23 12:29:42"},
        // {"id":66,"permValue":"adviceBack_index:delete","parentValue":"adviceBack_index","permName":"删除","parentName":"反馈基础数据","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:46","modifyTime":"2018-08-23 12:29:46"},
        // {"id":67,"permValue":"adviceBack_index:edit","parentValue":"adviceBack_index","permName":"编辑","parentName":"反馈基础数据","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:50","modifyTime":"2018-08-23 12:29:50"},
        // {"id":68,"permValue":"adviceBack_index:search","parentValue":"adviceBack_index","permName":"搜索","parentName":"反馈基础数据","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:54","modifyTime":"2018-08-23 12:29:54"},
        // {"id":28,"permValue":"adviceContent","parentValue":"adviceBack","permName":"反馈内容","parentName":"意见反馈","permType":1,"isLeaf":1,"createTime":"2018-08-15 19:49:48","modifyTime":"2018-08-15 19:49:48"},
        // {"id":70,"permValue":"adviceContent:add","parentValue":"adviceContent","permName":"新增","parentName":"反馈内容","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:58","modifyTime":"2018-08-23 12:29:58"}
        // 系统用户列表
        // {"id":10,"loginName":"admin","loginPass":"f866758b07bac11002f1a2c0c72ddce5","nickName":"超级管理员","salt":"8aa8ab1929544c81a6908400b6fd8c2b","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":49,"loginName":"logic","loginPass":"0c2ff7668030a8eb7a4594e6b56455df","nickName":"逻辑","salt":"be095d9898cb4554bc2e28eac68b422b","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":56,"loginName":"zhouyali","loginPass":"07a7a928518187afaa5f89485b88fdf9","nickName":null,"salt":"3187030017d143f8890de1614ba53c2c","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":58,"loginName":"zhuyaping","loginPass":"d75d1f48cf7f037d1a19c1c5cbfa8f9b","nickName":null,"salt":"43a5a4b8a49144f3ac725e8809c0319a","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":59,"loginName":"fengjinlong","loginPass":"d00860eec4374b05eddeb59ac75e6c5f","nickName":null,"salt":"627101813eca441585b3319a6f980386","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":52,"loginName":"fifi","loginPass":"04af60d9c7169a40f5e97673a75226e5","nickName":null,"salt":"f001e9b478344dd5a65ed7fce7f87af0","areaType":0,"areaCode":0,"userRoleId":null,"role":"开发","roles":null,"permissions":null},
        // {"id":55,"loginName":"agent","loginPass":"dd7f4866b9c96aad2866f46e8e27c90f","nickName":"代理商2","salt":"cbbf4835341f45a589b716bbf1554eaf","areaType":4,"areaCode":120101,"userRoleId":null,"role":"预览菌","roles":null,"permissions":null},
        // {"id":54,"loginName":"1001","loginPass":"fb461bd5feb1df396a825ecdec4576b3","nickName":"代理一号","salt":"fc713d67b92f471c8f669ad0e86695cf","areaType":4,"areaCode":241204,"userRoleId":null,"role":"代理商","roles":null,"permissions":null}
      ],
      dialogSubmitLoading: false,
    }
  }

  hasPerm = permStr => {
    let ret = false

    return ret
  }

  paging = (pager) => {
    const vm = this
    console.log('pager: ',pager)
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  addRow = () => {
    this.setState({
      currentDialog: 'add',
      dialogShow: true
    })
  }

  delRow = ({id, title='确认删除', content='确认删除这条数据吗？'}) => {
    Modal.confirm({
      title,
      content,
      onOk: function(){
        console.log('id: ',id)
        
      }
    })
  }

  editRow = (data) => {
    this.setState({
      currentDialog: 'edit',
      dialogShow: true
    })
    this.formRef.props.form.setFieldsValue(data)
  }

  closeModal = () => {
    this.setState({
      dialogShow: false
    })
    this.resetDialogForm()
  }

  resetDialogForm = () => {
    this.formRef.props.form.resetFields()
  }

  submitDialogForm = () => {
    const vm = this
    vm.formRef.props.form.validateFields((err, values) => {
      if(!err){
        console.log('values: ',values)
      }
    })    
  }

  render () {
    return <ComposedComponent
      paging={this.paging}
      saveFormRef={this.saveFormRef}
      addRow={this.addRow}
      delRow={this.delRow}
      editRow={this.editRow}
      closeModal={this.closeModal}
      resetDialogForm={this.resetDialogForm}
      submitDialogForm={this.submitDialogForm}
      {...this.props}
      {...this.state}
    />
  }
}
export default Enhance