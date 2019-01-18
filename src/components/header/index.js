import React from 'react'
import { Link } from 'react-router-dom'

export default class SideMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  logout () {
    
  }

  render () {
    return (
      <div>
        头部
        <Link to="/login">注销</Link>
      </div>
    );
  }
}