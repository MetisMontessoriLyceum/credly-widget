import React from 'react'
import Radium from 'radium'
import { parseImageURL, parseText } from '../helpers/fixer.jsx'

class UserHeader extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: 8
      }}>
        <img src={parseImageURL(this.props.user.avatar)} style={{
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
          {parseText(this.props.user.display_name)}
        </div>
      </div>
    )
  }
}

export default Radium(UserHeader)
