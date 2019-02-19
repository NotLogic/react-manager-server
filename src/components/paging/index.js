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
      total=0,
      pageSizeOptions=['10', '20', '30', '40'],
      pageLoading=false,
      align='right'
    } = this.props
    let contentAlign = align=='left' ? 'flex-start' : ( align=='right' ? 'flex-end' : 'center')
    let wrapperStyles = {
      padding: '10px',
      display: 'flex',
      justifyContent: contentAlign,
    }
    return (
      <div className="clearfix" style={ wrapperStyles }>
        <Button
          onClick={this.paging()}
          style={{marginRight: '10px'}}
          className={pageLoading ? 'rotate' : ''}
          shape='circle'
          icon='sync'
        />
        <Pagination
          showQuickJumper
          onChange={this.currentChange}
          showSizeChanger
          onShowSizeChange={this.pageSizeChange}
          pageSizeOptions={pageSizeOptions}
          current={current}
          pageSize={size}
          total={total}
        />
      </div>
    );
  }
}
export default Paging