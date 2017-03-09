import React from 'react'
import LatestBadge from './latest-badge.jsx'

export default class LatestBadges extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    window.fetch(`/api/latest-badges/${this.props.issuerId}`)
      .then(r => r.json()).then(badges => {
        this.setState({ badges })
        console.log(badges)
      })
  }
  _parseTitle (title) {
    return title.replace('&#8211;', '-')
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
                title={this._parseTitle(badge.title)} />
            )
          })}
        </marquee>
      )
    } else {
      return (<span>Loading...</span>)
    }
  }
}
