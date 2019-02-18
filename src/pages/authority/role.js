import React from 'react'
import { Button, Table ,Form, Input, Modal, Row, Col} from 'antd'
import Paging from '@/components/paging'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'

const FormDialog = Form.create()(
  class MyFormDialog extends React.Component {
    handleSelectChange = (value) => {
      if(value == '2'){
       this.props.form.setFieldsValue({
        isLeaf: '1'
       }) 
      }
    }
    render(){
      const {
        currentDialog,
        dialogSubmitLoading,
        closeModal,
        resetDialogForm,
        submitDialogForm,
        dialogShow,
        form
      } = this.props
      const {
        getFieldDecorator
      } = form
      const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      return (<Modal
        maskClosable={false}
        title={currentDialog}
        visible={dialogShow}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={resetDialogForm}>重置</Button>,
          <Button key="submit" type="primary" loading={dialogSubmitLoading} onClick={submitDialogForm}>提交</Button>
        ]}
      >
        <Form>
          {/* 隐藏的id输入框 */}
          {getFieldDecorator('id', {})(<Input style={{display: 'none'}} />)}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='角色编码'
              >
                {getFieldDecorator('roleValue', {
                  rules: [{ required: true, message: "角色值不能为空" }]
                })(<Input placeholder='请输入角色值' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='角色名称'
              >
                {getFieldDecorator('roleName', {
                  rules: [{ required: true, message: "角色名称不能为空" }]
                })(<Input placeholder='请输入角色名称' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='角色描述'
              >
                {getFieldDecorator('roleDesc', {})(<Input placeholder='请输入角色描述' />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>);
    }
  }
)

class Role extends React.Component {
  constructor(props) {
    super(props)
    this.form = null
    this.state = {
      [defaultCurrentKey]: 1,
      [defaultPageSizeKey]: 10,
      total: 0,
      pageLoading: false,
      dialogShow: false,
      currentDialog: 'add',
      pageData: [
        {"id":1,"roleName":"管理员","roleValue":"admin","roleDesc":"拥有所有权限","createTime":"2018-08-02 11:20:40","modifyTime":"2018-08-02 11:20:40"},
        {"id":9,"roleName":"开发","roleValue":"developer","roleDesc":"开发人员","createTime":"2018-09-04 14:48:08","modifyTime":"2018-09-04 14:48:08"},
        {"id":10,"roleName":"预览菌","roleValue":"preview","roleDesc":"只可以查看搜索","createTime":"2018-09-05 15:44:04","modifyTime":"2018-09-05 15:44:04"},
        {"id":12,"roleName":"代理商","roleValue":"agent","roleDesc":"代理商选择的角色","createTime":"2018-09-26 11:16:50","modifyTime":"2018-09-26 11:16:50"},
        {"id":14,"roleName":"测试回显","roleValue":"test","roleDesc":"测试回显异常","createTime":"2018-09-26 15:12:43","modifyTime":"2018-09-26 15:12:43"}
      ],
      dialogSubmitLoading: false,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '角色编码',
          dataIndex: 'roleValue'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '角色描述',
          dataIndex: 'roleDesc'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '修改时间',
          dataIndex: 'modifyTime'
        },
        {
          title: '操作',
          render: (text, record, index) => {
            const vm = this
            return (<div>
              <Button onClick={() => {
                vm.editRow(record)
              }} size='small' type='primary' style={{marginRight: '16px'}}>编辑</Button>
              <Button onClick={() => {
                vm.delRow({id: record.id})
              }} size='small' type='danger' style={{marginRight: '16px'}}>删除</Button>
            </div>);
          }
        },
      ],

      // 
    }
  }

  paging = (pager) => {
    const vm = this
    
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
    let {
      current,
      size,
      total,
      pageLoading,
      pageData,
      currentDialog,
      dialogShow,
      dialogSubmitLoading,
      columns,
    } = this.state
    return (
      <div>
        <div style={{marginBottom: '16px'}}>
          <Button size='small' onClick={this.addRow} disabled={pageLoading} type="primary">添加</Button>
        </div>
        <Table
          bordered
          loading={pageLoading}
          pagination={false}
          columns={columns}
          dataSource={pageData}
        />
        <Paging
          current={current}
          size={size}
          total={total}
          pageLoading={pageLoading}
          paging={this.paging}
        />
        <FormDialog
          dialogShow={dialogShow}
          currentDialog={currentDialog}
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
export default Role