import React from 'react'

export default class LatestBadges extends React.Component {
  render () {
    return (<marquee>Hello {this.props.id}!</marquee>)
  }
}
