import React from 'react'
import { Button, Table ,Form, Input, Modal, Row, Col, Select } from 'antd'
import { connect } from 'react-redux'
import Paging from '@/components/paging'
import enhancePage from '@/high-components/page'


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
            const {
              editRow,
              delRow
            } = this.props
            return (<div>
              <Button onClick={() => editRow(record)} size='small' type='primary' style={{marginRight: '16px'}}>编辑</Button>
              <Button onClick={() => delRow({id: record.id})} size='small' type='danger' style={{marginRight: '16px'}}>删除</Button>
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
const mapStateToProps = state => ({
  
})
export default connect(mapStateToProps)(enhancePage(AuthorityList))