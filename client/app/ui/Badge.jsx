import React from 'react'

export default class User extends React.Component {
  render () {
    return (
      <div>
        <img src={this.props.image} />
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
      </div>
    )
  }
}
