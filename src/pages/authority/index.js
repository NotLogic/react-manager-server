import React from 'react'
import { Button, Table ,Form, Input, Modal, Row, Col, Select } from 'antd'
import Paging from '@/components/paging'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'
// 对象中的number类型的key取值之后是string类型，使用map循环输出Select时需要注意
const permTypeMap = {
  1: '菜单',
  2: '按钮',
  3: '接口',
  4: '特殊',
}
const isLeafMap = {
  0: '不是',
  1: '是'
}

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
        width={700}
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
                label='权限类型'
              >
                {getFieldDecorator('permType', {
                  rules: [{ required: true, message: "请选择权限类型" }]
                })(<Select 
                  placeholder='请选择权限类型'
                  onChange={this.handleSelectChange}
                >
                  {Object.keys(permTypeMap).map(key => <Select.Option key={key} value={key}>{permTypeMap[key]}</Select.Option>)}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='是否子节点'
              >
                {getFieldDecorator('isLeaf', {
                  rules: [{ required: true, message: "请选择是否子节点" }]
                })(<Select 
                  placeholder='请选择权限类型'
                >
                  {Object.keys(isLeafMap).map(key => <Select.Option key={key} value={key}>{isLeafMap[key]}</Select.Option>)}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='权限编码'
              >
                {getFieldDecorator('permValue', {
                  rules: [{ required: true, message: "请输入权限编码" }]
                })(<Input placeholder='请输入权限编码' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='权限介绍'
              >
                {getFieldDecorator('permName', {})(<Input placeholder='请输入权限介绍' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='父权限编码'
              >
                {getFieldDecorator('parentValue', {})(<Input placeholder='请输入父权限编码' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label='父权限介绍'
              >
                {getFieldDecorator('parentName', {})(<Input placeholder='请输入父权限介绍' />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>);
    }
  }
)

class AuthorityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [defaultCurrentKey]: 1,
      [defaultPageSizeKey]: 10,
      total: 0,
      pageLoading: false,
      dialogShow: false,
      currentDialog: 'add',
      dialogSubmitLoading: false,
      pageData: [
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
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '权限类型',
          dataIndex: 'permType',
          render: key => <span>{permTypeMap[key]}</span>
        },
        {
          title: '是否子节点',
          dataIndex: 'isLeaf',
          render: key => <span>{isLeafMap[key]}</span>
        },
        {
          title: '权限编码',
          dataIndex: 'permValue'
        },
        {
          title: '权限介绍',
          dataIndex: 'permName'
        },
        {
          title: '父权限编码',
          dataIndex: 'parentValue'
        },
        {
          title: '父权限介绍',
          dataIndex: 'parentName'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
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
      columns,
      currentDialog,
      dialogShow,
      dialogSubmitLoading,
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
export default AuthorityList