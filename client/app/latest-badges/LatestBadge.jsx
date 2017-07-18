import React from 'react'

import { parseText } from '../helpers/fixer.jsx'

export default class LatestBadge extends React.Component {
  render () {
    return (
      <span style={{
        paddingRight: '30px'
      }}>
        <i>{parseText(this.props.name)}</i> just got the <i>{parseText(this.props.title)}</i> badge!
      </span>
    )
  }
}
