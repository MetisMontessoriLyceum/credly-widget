import React from 'react'
import Radium from 'radium'

import Badge from './Badge.jsx'

class Badges extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {this.props.badges.map((badge, index) => {
          return (<Badge
            key={index}
            title={badge.title}
            image={badge.image}
            description={badge.description}
            link={badge.links.member_badge}
          />)
        })}
      </div>
    )
  }
}

export default Radium(Badges)
