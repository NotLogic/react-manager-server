import React from 'react'
import { Button, Table ,Form, Input, Modal} from 'antd'
import Paging from '@/components/paging'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'

class Role extends React.Component {
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
      size: 'small'
    }

    this.paging = this.paging.bind(this)
    this.addRow = this.addRow.bind(this)
    this.editRow = this.editRow.bind(this)
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

  paging(pager){
    const vm = this    
    
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
        <div style={{marginBottom: '16px'}}>
          <Button size={ size } onClick={this.addRow} disabled={pageLoading} type="primary">添加</Button>
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
      </div>
    );
  }
}
export default Role