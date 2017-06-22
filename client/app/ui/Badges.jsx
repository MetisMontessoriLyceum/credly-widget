import React from 'react'
import Badge from './Badge.jsx'

export default class User extends React.Component {
  render () {
    return (
      <div>
        {this.props.badges.map((badge, index) => {
          return (<Badge
            key={index}
            title={badge.title}
            image={badge.image}
            description={badge.description}
          />)
        })}
      </div>
    )
  }
}
