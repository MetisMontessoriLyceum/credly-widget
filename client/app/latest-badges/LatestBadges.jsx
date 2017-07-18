import React from 'react'
import Radium from 'radium'
import { fetch } from '../helpers/crossURL.jsx'

import LatestBadge from './LatestBadge.jsx'

const debug = require('debug')('credly-widget:component:LatestBadges')

class LatestBadges extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    fetch(`/api/latest-badges/${this.props.issuerId}`)
      .then(r => r.json()).then(badges => {
        this.setState({ badges })
        debug(badges)
      })
  }
  render () {
    if (this.state.badges) {
      return (
        <marquee>
          {this.state.badges.map(badge => {
            return (
              <LatestBadge
                key={badge.id}
                name={badge.member.display_name}
                title={badge.title} />
            )
          })}
        </marquee>
      )
    } else {
      return (<span>Loading...</span>)
    }
  }
}

export default Radium(LatestBadges)
