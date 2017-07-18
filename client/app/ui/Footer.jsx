import React from 'react'
import Radium from 'radium'

import CodeIcon from 'react-icons/lib/fa/code'
import HeartIcon from 'react-icons/lib/fa/heart'

class Footer extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        color: '#424242',
        marginTop: 8
      }}>
        <div style={{ flexGrow: 1 }} />
        <CodeIcon style={iconStyle} /> with <HeartIcon style={iconStyle} /> by Noah Loomans
      </div>
    )
  }
}

const iconStyle = {
  paddingLeft: 8,
  paddingRight: 8
}

export default Radium(Footer)
