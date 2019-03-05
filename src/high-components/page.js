import React from 'react'
import { Modal } from 'antd'
import request from '@/plugins/axios'
import { deepcopy } from '@/libs/utils'
// 默认当前页key  默认每页个数key
import { defaultCurrentKey, defaultPageSizeKey } from '@/libs/config'

// 此高阶组件用于处理公共的页面请求处理
// 此高阶组件使用到redux的state时，需要在connect的内层
let Enhance = ComposedComponent => class extends React.Component {
  constructor(props) {
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
      dialogSubmitLoading: false,
      pageData: [
        // 角色列表
        // {"id":1,"roleName":"管理员","roleValue":"admin","roleDesc":"拥有所有权限","createTime":"2018-08-02 11:20:40","modifyTime":"2018-08-02 11:20:40"},
        // {"id":9,"roleName":"开发","roleValue":"developer","roleDesc":"开发人员","createTime":"2018-09-04 14:48:08","modifyTime":"2018-09-04 14:48:08"},
        // {"id":10,"roleName":"预览菌","roleValue":"preview","roleDesc":"只可以查看搜索","createTime":"2018-09-05 15:44:04","modifyTime":"2018-09-05 15:44:04"},
        // {"id":12,"roleName":"代理商","roleValue":"agent","roleDesc":"代理商选择的角色","createTime":"2018-09-26 11:16:50","modifyTime":"2018-09-26 11:16:50"},
        // {"id":14,"roleName":"测试回显","roleValue":"test","roleDesc":"测试回显异常","createTime":"2018-09-26 15:12:43","modifyTime":"2018-09-26 15:12:43"},
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
        // {"id":70,"permValue":"adviceContent:add","parentValue":"adviceContent","permName":"新增","parentName":"反馈内容","permType":2,"isLeaf":1,"createTime":"2018-08-23 12:29:58","modifyTime":"2018-08-23 12:29:58"},
        // 系统用户列表
        // {"id":10,"loginName":"admin","loginPass":"f866758b07bac11002f1a2c0c72ddce5","nickName":"超级管理员","salt":"8aa8ab1929544c81a6908400b6fd8c2b","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":49,"loginName":"logic","loginPass":"0c2ff7668030a8eb7a4594e6b56455df","nickName":"逻辑","salt":"be095d9898cb4554bc2e28eac68b422b","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":56,"loginName":"zhouyali","loginPass":"07a7a928518187afaa5f89485b88fdf9","nickName":null,"salt":"3187030017d143f8890de1614ba53c2c","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":58,"loginName":"zhuyaping","loginPass":"d75d1f48cf7f037d1a19c1c5cbfa8f9b","nickName":null,"salt":"43a5a4b8a49144f3ac725e8809c0319a","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":59,"loginName":"fengjinlong","loginPass":"d00860eec4374b05eddeb59ac75e6c5f","nickName":null,"salt":"627101813eca441585b3319a6f980386","areaType":0,"areaCode":0,"userRoleId":null,"role":"管理员","roles":null,"permissions":null},
        // {"id":52,"loginName":"fifi","loginPass":"04af60d9c7169a40f5e97673a75226e5","nickName":null,"salt":"f001e9b478344dd5a65ed7fce7f87af0","areaType":0,"areaCode":0,"userRoleId":null,"role":"开发","roles":null,"permissions":null},
        // {"id":55,"loginName":"agent","loginPass":"dd7f4866b9c96aad2866f46e8e27c90f","nickName":"代理商2","salt":"cbbf4835341f45a589b716bbf1554eaf","areaType":4,"areaCode":120101,"userRoleId":null,"role":"预览菌","roles":null,"permissions":null},
        // {"id":54,"loginName":"1001","loginPass":"fb461bd5feb1df396a825ecdec4576b3","nickName":"代理一号","salt":"fc713d67b92f471c8f669ad0e86695cf","areaType":4,"areaCode":241204,"userRoleId":null,"role":"代理商","roles":null,"permissions":null}
        // 投稿
        // {"id": "524381031079936","serviceNumberId": 65,"userId": null,"content": "大爷下棋，棋法不走寻常路，开眼了，你们看得懂吗？","status": 0,"verifyTime": null,"createTime": "2019-01-21 17:52:02","serviceNumberName": null,"userheadPortrait": null,"bgPortrait": null,"userNickName": null,"remake": null,"isfollow": null,"fileManageList": [{"fileType": 2,"filePath": "zsx/web/serviceNumber/2019/1/21/524381031079936/","fileList": [{"id": null,"createTime": null,"modifyTime": null,"fileName": "524381047545856.mp4","fileSuffix": null,"fileGroupId": null,"fileSize": null,"fileHeight": 624,"fileWidth": 360,"fileType": 2,"fileStyle": 1,"videoImage": null,"filePath": null,"fileSource": null,"sourceId": null,"userId": null,"usePostion": null,"years": null,"months": null,"sort": 0,"version": null,"temp_file": null,"image_temp_name": null,"video_image_temp_file": null,"video_temp_file": null,"fileGroupIds": "524381047545856","video_image_temp_name": null,"fileVideoImage": "524381047545856.jpg"}],"file_map": null}]},
        // {"id": "524380830380032","serviceNumberId": 58,"userId": null,"content": "四川人民的生活","status": 0,"verifyTime": null,"createTime": "2019-01-21 17:51:07","serviceNumberName": null,"userheadPortrait": null,"bgPortrait": null,"userNickName": null,"remake": null,"isfollow": null,"fileManageList": [{"fileType": 2,"filePath": "zsx/web/serviceNumber/2019/1/21/524380830380032/","fileList": [{"id": null,"createTime": null,"modifyTime": null,"fileName": "524380836708352.mp4","fileSuffix": null,"fileGroupId": null,"fileSize": null,"fileHeight": 640,"fileWidth": 360,"fileType": 2,"fileStyle": 1,"videoImage": null,"filePath": null,"fileSource": null,"sourceId": null,"userId": null,"usePostion": null,"years": null,"months": null,"sort": 0,"version": null,"temp_file": null,"image_temp_name": null,"video_image_temp_file": null,"video_temp_file": null,"fileGroupIds": "524380836708352","video_image_temp_name": null,"fileVideoImage": "524380836708352.jpg"}],"file_map": null}]},
        // 

      ]
    }
  }
    // 对于默认方法不满足需求的,可在子组件内调用此方法进行数据更新（尽量避免此操作）
    updateHack = dataObj => {
      // dataObj  需要更新的数据对象
      if (dataObj instanceof Object) {
        // let {
        //   total,
        //   pageLoading,
        //   dialogShow,
        //   currentDialog,
        //   dialogSubmitLoading,
        //   pageData
        // } = dataObj
        // let current = dataObj[defaultCurrentKey]
        // let size = dataObj[defaultPageSizeKey]
        // let obj = {}
        // if (current) obj[defaultCurrentKey] = current
        // if (size) obj[defaultPageSizeKey] = size
        // if (total) obj['total'] = total
        // if (pageLoading) obj['pageLoading'] = pageLoading
        // if (dialogShow) obj['dialogShow'] = dialogShow
        // if (currentDialog) obj['currentDialog'] = currentDialog
        // if (dialogSubmitLoading) obj['dialogSubmitLoading'] = dialogSubmitLoading
        // if (pageData) obj['pageData'] = pageData
        // this.setState(obj)
        this.setState(dataObj)
      }
    }

    hasPerm = permStr => {
      let ret = false

      return ret
    }

    paging = (pager, pagingArguments) => {
      const vm = this
      // 可配置的分页key
      //    可配置默认当前页和每页个数key
      //    可自定义当前页和每页个数key
      let current = vm.state[defaultCurrentKey]
      let size = vm.state[defaultPageSizeKey]
      let defaultPageConfig = {}
      if (pager) {
        // 传pager就是翻页,不传的是刷新
        if (pager[defaultCurrentKey]) current = pager[defaultCurrentKey]
        if (pager[defaultPageSizeKey]) size = pager[defaultPageSizeKey]
      }
      defaultPageConfig = {
        [defaultCurrentKey]: current,
        [defaultPageSizeKey]: size
      }
      let _pageConfig = deepcopy(defaultPageConfig)
      let {
        params,
        config,
        pageConfig
      } = pagingArguments
      if (pageConfig) {
        let {
          currentKey,
          pageSizeKey
        } = pageConfig
        if (currentKey) {
          _pageConfig[currentKey] = current
          delete _pageConfig[defaultCurrentKey]
        }
        if (pageSizeKey) {
          _pageConfig[pageSizeKey] = size
          delete _pageConfig[defaultPageSizeKey]
        }
      }
      // 可配置的分页key   end
      params.params = {...params.params,..._pageConfig}
      console.log('params: ', params)
      vm.setState({
        [defaultCurrentKey]: current,
        [defaultPageSizeKey]: size,
      })
      return
      request(params, config).then(res => {
        console.log(res)
      })
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

    delRow = ({ id, title = '确认删除', content = '确认删除这条数据吗？' }) => {
      Modal.confirm({
        title,
        content,
        onOk: function () {
          console.log('id: ', id)

        }
      })
    }
    // 编辑行传入的data需要试经过格式化的用于回显的
    editRow = data => {
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
        if (!err) {
          console.log('values: ', values)
        }
      })
    }

    render() {
      return <ComposedComponent
        paging={this.paging}
        saveFormRef={this.saveFormRef}
        addRow={this.addRow}
        delRow={this.delRow}
        editRow={this.editRow}
        closeModal={this.closeModal}
        resetDialogForm={this.resetDialogForm}
        submitDialogForm={this.submitDialogForm}
        updateHack={this.updateHack}
        {...this.props}
        {...this.state}
      />
    }
  }
  export default Enhance