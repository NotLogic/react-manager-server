import React from 'react'
import Paging from '@/components/paging'
import { Button, Table ,Form, Input, Modal} from 'antd'
import http from '@/plugins/axios'
import apis from '@/apis'
import { connect } from 'react-redux'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'
import {deepcopy} from '@/libs/utils'

const SEARCH_FORM_NAME = 'search-form'
const SUBMIT_FORM_NAME = 'submit-form'

// 搜索
class SearchFrom extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      size: 'small'
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
    const {
      size
    } = this.state
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
            <Input size={ size } />
          )}
        </Form.Item>
        <Form.Item>
          <Button size={ size } style={styles} disabled={pageLoading} onClick={this.handleReset}>清空</Button>
          <Button size={ size } style={styles} disabled={pageLoading} type="primary" htmlType='submit'>搜索</Button>
          <Button size={ size } onClick={addRow} style={styles} disabled={pageLoading} type="primary">添加</Button>
          <Button size={ size } style={styles} disabled={pageLoading || selectedRowKeys.length == 0} type="danger">批量删除</Button>    
        </Form.Item>
      </Form>
    </div>);
  }
}
const WrappedSearchForm = Form.create({
  name: SEARCH_FORM_NAME
})(SearchFrom)

// 新增/编辑表单
class SubmitForm extends React.Component {
  constructor(props){
    super(props)

  }

  render () {
    const {
      currentDialog,
      form
    } = this.props
    const {
      getFieldDecorator
    } = form
    return (<Form
      layout='horizontal'
    >
      <Form.Item
        label='账号'
      >
        {getFieldDecorator('roleValue', {
          rules: [{ required: true, message: "账号不能为空" }]
        })(<Input placeholder='请输入账号' />)}
      </Form.Item>
      <Form.Item
        label='密码'
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='昵称'
      >
        <Input />
      </Form.Item>
    </Form>);
  }
}
const WrappedSubmitForm = Form.create({
  name: SUBMIT_FORM_NAME
})(SubmitForm)

// 新增/编辑 弹窗
class SubmitModal extends React.Component {
  constructor(props){
    super(props)

  }

  render () {
    let {
      currentDialog,
      dialogShow,
      submitFormDialog,
      resetFormDialog,
      closeFormDialog
    } = this.props
    return (<Modal
      maskClosable={false}
      title={currentDialog}
      visible={dialogShow}
      onOk={submitFormDialog}
      onCancel={closeFormDialog}
      footer={[
        <Button onClick={resetFormDialog} key='reset'>重置</Button>,
        <Button onClick={submitFormDialog} key='submit' type='primary'>确定</Button>
      ]}
    >
      <WrappedSubmitForm />
    </Modal>);
  }
}

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
      pageData: [
        {
          id: '1',
          key: '1',
          loginName: 'logic',
          nickName: '逻辑',
          role: [1, 2, 3],
          areaCode: '310303',
        },
        {
          id: '2',
          key: '2',
          loginName: 'lala123',
          nickName: '啦啦123',
          role: [2],
          areaCode: '310302',
        },
        {
          id: '3',
          key: '3',
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

    this.paging = this.paging.bind(this)
    this.addRow = this.addRow.bind(this)
    this.closeFormDialog = this.closeFormDialog.bind(this)
  }

  closeFormDialog(){
    this.setState({
      dialogShow: false
    })
    this.resetFormDialog()
  }
  resetFormDialog(){
    
  }

  submitFormDialog(){
    this.setState({
      dialogShow: false
    })
  }

  addRow () {
    this.setState({
      currentDialog: 'add',
      dialogShow: true
    })
  }

  delRow({id, title='确认删除', content='确认删除这条数据吗？'}){
    Modal.confirm({
      title,
      content,
      onOk: function(){
        console.log('id: ',id)
        
      }
    })
  }

  editRow(data){
    console.log('data: ',data)
  }

  // 翻页的时候为什么会执行两次
  paging(pager){
    // pager  翻页的信息
    const vm = this    
    
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
      currentDialog
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
        {/* 新增/编辑弹窗 */}
        <SubmitModal
          dialogShow={dialogShow}
          currentDialog={currentDialog}
          closeFormDialog={this.closeFormDialog}
          resetFormDialog={this.resetFormDialog}
          submitFormDialog={this.submitFormDialog}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // paging: state.paging
})
export default connect(mapStateToProps)(SystemUser)