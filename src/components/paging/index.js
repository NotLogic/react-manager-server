import React from 'react'
import { Pagination, Button } from 'antd'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'

class Paging extends React.Component {
  constructor(props){
    super(props)

    this.currentChange = this.currentChange.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
    this.paging = this.paging.bind(this)
  }

  currentChange(current){
    const { currentKey = defaultCurrentKey } = this.props
    const pager = {
      [currentKey]: current
    }
    this.paging(pager)
  }
  
  pageSizeChange(current, pageSize){
    // 自定义的当前页的key存在就取传的key，不存在就取默认key
    // 自定义的每页数量的key存在就取传的key，不存在就取默认key
    const { 
      currentKey = defaultCurrentKey,
      pageSizeKey = defaultPageSizeKey
    } = this.props
    const pager = {
      [currentKey]: current,
      [pageSizeKey]: pageSize,
    }
    this.paging(pager)
  }
  paging(pager){
    const { paging } = this.props
    paging(pager)
  }

  render () {
    const {
      current=1,
      size=10,
      total=50,      
      pageSizeOptions=['10', '20', '30', '40'],
      pageLoading=false,
    } = this.props
    return (
      <div className="clearfix" style={{padding: '10px'}}>
        <Pagination
          style={{float: 'right', marginLeft: '10px'}}
          showQuickJumper
          onChange={this.currentChange}
          showSizeChanger
          onShowSizeChange={this.pageSizeChange}
          pageSizeOptions={pageSizeOptions}
          current={current}
          pageSize={size}
          total={total}
        />
        <Button
          onClick={this.paging()}
          style={{float: 'right'}}
          className={pageLoading ? 'rotate' : ''}
          shape='circle'
          icon='sync'
        />
      </div>
    );
  }
}
export default Paging