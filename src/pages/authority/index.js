import React from 'react'
import { Button, Table ,Form, Input, Modal} from 'antd'
import Paging from '@/components/paging'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'

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
      pageData: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '权限类型',
          dataIndex: 'permType'
        },
        {
          title: '是否子节点',
          dataIndex: 'isLeaf'
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

    this.paging = this.paging.bind(this)
    this.addRow = this.addRow.bind(this)
    this.editRow = this.editRow.bind(this)
  }

  paging(pager){
    const vm = this    
    
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

  render () {
    let {
      current,
      size,
      total,
      pageLoading,
      pageData,
      columns,
    } = this.state
    return (
      <div>
        
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
      </div>
    );
  }
}
export default AuthorityList