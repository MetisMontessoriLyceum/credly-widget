import React from 'react'

import fixImageURL from '../helpers/fixImageURL.jsx'

export default class Header extends React.Component {
  render () {
    console.log(this.props.user.avatar)
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: 8
      }}>
        <img src={fixImageURL(this.props.user.avatar)} style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          marginLeft: 16,
          marginRight: 16
        }} />
        <div style={{
          fontSize: '1.5em',
          fontWeight: '300'
        }}>
          {this.props.user.display_name}
        </div>
      </div>
    )
  }
}
