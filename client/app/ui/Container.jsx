import React from 'react'
import Radium, { StyleRoot } from 'radium'

class Container extends React.Component {
  render () {
    return (
      <StyleRoot>
        <div style={{
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          borderRadius: '2px',
          padding: '16px',
          backgroundColor: '#e0e0e0',
          fontFamily: '"Roboto", sans-serif',
          wordWrap: 'break-word',
          ...this.props.style
        }}>
          { this.props.children }
        </div>
      </StyleRoot>
    )
  }
}

export default Radium(Container)
