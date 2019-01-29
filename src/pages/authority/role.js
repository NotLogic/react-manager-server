import React from 'react'
import { Table, Tag, Divider } from 'antd'

class Role extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pageData: [{
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      }, {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      }, {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }],

    }
  }



  render () {
    const { Column, ColumnGroup } = Table
    let { pageData } = this.state
    return (
      <div>
        <Table
          bordered
          dataSource={pageData}
        >
          {/* 列头 */}
          <ColumnGroup
            title='Name'
          >
            <Column
              title='First Name'
              dataIndex='firstName'
              key='firstName'
            />
            <Column
              title='Last Name'
              dataIndex='lastName'
              key='lastName'
            />
          </ColumnGroup>
          <Column
            title='Age'
            dataIndex='age'
            key='age'
          />
          <Column
            title='Address'
            dataIndex='address'
            key='address'
          />
          <Column
            title='Tags'
            dataIndex='tags'
            key='tags'
            render={tags => (
              <span>{tags.map(tag=><Tag key={tag}>{tag}</Tag>)}</span>
            )}
          />
          <Column
            title='Action'
            key='action'
            render={(text, record) => {
              // 这个函数会循环调用，就打印值来看text和record完全相同

              return (
                <span>
                  <a>{record.age}</a>
                  <Divider type='vertical' />
                  <a>{record.lastName}</a>
                </span>
              )
            }}
          />
        </Table>
      </div>
    );
  }
}
export default Role