import React from 'react'

export default class LatestBadge extends React.Component {
  render () {
    return (
      <span style={{
        paddingRight: '30px'
      }}>
        <i>{this.props.name}</i> just got the <i>{this.props.title}</i> badge!
      </span>
    )
  }
}
