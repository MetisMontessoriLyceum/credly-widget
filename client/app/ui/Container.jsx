import React from 'react'

export default class User extends React.Component {
  render () {
    return (
      <div style={{
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        borderRadius: '2px',
        fontFamily: '"Roboto Mono", monospace',
        wordWrap: 'break-word'
      }}>
        { this.props.children }
      </div>
    )
  }
}
