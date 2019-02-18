import React from 'react'
import Paging from '@/components/paging'
import { Button, Table ,Form, Input, Modal, Row, Col, Select } from 'antd'
import http from '@/plugins/axios'
import apis from '@/apis'
import { connect } from 'react-redux'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'


// 搜索
const WrappedSearchForm = Form.create({})(
  class SearchFrom extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleReset = this.handleReset.bind(this)
    }
    
    handleReset(){
      this.props.form.resetFields()
    }

    handleSubmit(e){
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
        addRow
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
            <Button size={ elementSize } onClick={addRow} style={styles} disabled={pageLoading} type="primary">添加</Button>
            <Button size={ elementSize } style={styles} disabled={pageLoading || selectedRowKeys.length == 0} type="danger">批量删除</Button>    
          </Form.Item>
        </Form>
      </div>);
    }
  }
)

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

class SystemUser extends React.Component {
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
      dialogSubmitLoading: false,
      pageData: [
        {
          id: '1',
          loginName: 'logic',
          nickName: '逻辑',
          role: [1, 2, 3],
          areaCode: '310303',
        },
        {
          id: '2',
          loginName: 'lala123',
          nickName: '啦啦123',
          role: [2],
          areaCode: '310302',
        },
        {
          id: '3',
          loginName: 'haha123',
          nickName: '哈哈123',
          role: [3],
          areaCode: '301301',
        }
      ],
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
      // 表格默认选中的的
      selectedRowKeys: [],
      

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
    const vm = this
    let {
      current,
      size,
      total,
      pageLoading,
      pageData,
      columns,
      selectedRowKeys,
      dialogShow,
      currentDialog,
      dialogSubmitLoading
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
        <WrappedSearchForm
          selectedRowKeys={selectedRowKeys}
          pageLoading={pageLoading}
          addRow={this.addRow}
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
const mapStateToProps = state => ({
  // paging: state.paging
})
export default connect(mapStateToProps)(SystemUser)