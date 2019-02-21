import React from 'react'
import { Pagination, Button } from 'antd'
import {defaultCurrentKey, defaultPageSizeKey} from '@/libs/config'

// 分页组件只用关注展示即可，自定义的当前页和每页个数key隐式传递
class Paging extends React.Component {

  currentChange = current => {
    const pager = {
      [defaultCurrentKey]: current
    }
    this.paging(pager)
  }
  
  pageSizeChange = (current, size) => {
    const pager = {
      [defaultCurrentKey]: current,
      [defaultPageSizeKey]: size,
    }
    this.paging(pager)
  }
  paging = pager => {
    const {
      paging,
      pagingArguments
    } = this.props
    paging(pager,pagingArguments)
  }

  render () {
    let {
      total=0,
      pageSizeOptions=['10', '20', '30', '40'],
      pageLoading=false,
      align='right'
    } = this.props
    
    let current = this.props[defaultCurrentKey] || 1
    let size = this.props[defaultPageSizeKey] || 10

    let contentAlign = align=='left' ? 'flex-start' : ( align=='right' ? 'flex-end' : 'center' )
    let wrapperStyles = {
      padding: '10px',
      display: 'flex',
      justifyContent: contentAlign,
    }
    return (
      <div className="clearfix" style={ wrapperStyles }>
        <Button
          onClick={ () => this.paging()}
          style={{marginRight: '10px'}}
          className={pageLoading ? 'rotate' : ''}
          shape='circle'
          icon='sync'
        />
        <Pagination
          showQuickJumper
          showSizeChanger
          pageSizeOptions={pageSizeOptions}
          current={current}
          pageSize={size}
          total={total}
          onChange={this.currentChange}
          onShowSizeChange={this.pageSizeChange}
        />
      </div>
    );
  }
}
export default Paging