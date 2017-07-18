import React from 'react'
import Radium from 'radium'

import Badge from './Badge.jsx'

const debug = require('debug')('credly-widget:component:Badges')

class Badges extends React.Component {
  render () {
    const isInIframe = window.self !== window.top
    debug(`is in iframe? ${isInIframe}`)

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
            clickable={!isInIframe}
          />)
        })}
      </div>
    )
  }
}

export default Radium(Badges)
