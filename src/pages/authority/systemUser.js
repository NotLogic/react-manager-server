import React from 'react'
import Paging from '@/components/paging'
import { Button, Table ,Form, Input, Modal, Row, Col, Select } from 'antd'
import { connect } from 'react-redux'
import enhancePage from '@/high-components/page'


// 搜索
class MySearchFrom extends React.Component {
    
  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log('values: ',values)
      }
    })
  }

  render () {
    const styles={
      marginRight: '16px'
    }
    const elementSize = 'small'
    const {
      form,
      selectedRowKeys,
      pageLoading,
      addRow,
      batchDelete
    } = this.props
    const {
      getFieldDecorator
    } = form
    return (<div
      style={{marginBottom: '16px'}}
    >
      <Form
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        <Form.Item
          label='用户'
        >
          {getFieldDecorator('key')(
            <Input size={ elementSize } />
          )}
        </Form.Item>
        <Form.Item>
          <Button size={ elementSize } style={styles} disabled={pageLoading} onClick={this.handleReset}>清空</Button>
          <Button size={ elementSize } style={styles} disabled={pageLoading} type="primary" htmlType='submit'>搜索</Button>
          <Button size={ elementSize } style={styles} disabled={pageLoading} type="primary" onClick={addRow}>添加</Button>
          <Button size={ elementSize } style={styles} disabled={pageLoading || selectedRowKeys.length == 0 } onClick={() => batchDelete({ids: selectedRowKeys})} type="danger">批量删除</Button>
        </Form.Item>
      </Form>
    </div>);
  }
}
const SearchFrom = Form.create()(MySearchFrom)

// 新增编辑弹窗
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
        <Button key="reset" onClick={resetDialogForm}>重置</Button>,
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

class SystemUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      columns: [
        {
          dataIndex: 'id',
          title: 'ID',          
        },
        {
          dataIndex: 'loginName',
          title: '账号',          
        },
        {
          dataIndex: 'nickName',
          title: '昵称',
        },
        {
          dataIndex: 'role',
          title: '角色',
        },
        {
          dataIndex: 'areaCode',
          title: '代理地区',
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
      // 表格默认选中的的
      selectedRowKeys: [],
      

    }
  }

  batchDelete({ids, title='确认删除', content='确认删除这些数据吗？'}){
    Modal.confirm({
      title,
      content,
      onOk: function(){
        console.log('ids: ',ids)
        
      }
    })
  }

  render () {
    const vm = this
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
      permissionList
    } = vm.props
    const {
      columns,
      selectedRowKeys
    } = vm.state
    const rowSelection =  {
      columnWidth: 80,
      selectedRowKeys: selectedRowKeys,
      onChange: function(selectedRowKeys, selectedRows) {
        vm.setState({
          selectedRowKeys
        })
      },
    }
    return (
      <div>
        <SearchFrom
          selectedRowKeys={selectedRowKeys}
          pageLoading={pageLoading}
          addRow={addRow}
          batchDelete={this.batchDelete}
        />
        <Table
          bordered
          loading={pageLoading}
          // 设为false不显示默认的分页；或者参考pagination设置分页属性
          pagination={false}
          columns={columns}
          dataSource={pageData}
          rowSelection={rowSelection}
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
  permissionList: state.permissionList
})
export default connect(mapStateToProps)(enhancePage(SystemUser))