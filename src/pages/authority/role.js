import React from 'react'
import { Button, Table ,Form, Input, Modal, Row, Col} from 'antd'
import Paging from '@/components/paging'
import enhancePage from '@/high-components/page'

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
const FormDialog = Form.create()(MyFormDialog)

class Role extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
            const {
              editRow,
              delRow
            } = this.props
            return (<div>
              <Button onClick={() => {
                editRow(record)
              }} size='small' type='primary' style={{marginRight: '16px'}}>编辑</Button>
              <Button onClick={() => {
                delRow({id: record.id})
              }} size='small' type='danger' style={{marginRight: '16px'}}>删除</Button>
            </div>);
          }
        },
      ],

      // 
    }
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
      paging,
      saveFormRef,
      addRow,
      closeModal,
      resetDialogForm,
      submitDialogForm,
    } = this.props
    const {
      columns
    } = this.state
    return (
      <div>
        <div style={{marginBottom: '16px'}}>
          <Button size='small' onClick={addRow} disabled={pageLoading} type="primary">添加</Button>
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
          paging={paging}
        />
        <FormDialog
          dialogShow={dialogShow}
          currentDialog={currentDialog}
          dialogSubmitLoading={dialogSubmitLoading}
          wrappedComponentRef={saveFormRef}
          closeModal={closeModal}
          resetDialogForm={resetDialogForm}
          submitDialogForm={submitDialogForm}
        />
      </div>
    );
  }
}
export default enhancePage(Role)