import React from 'react'
import Radium from 'radium'
import { parseText } from '../helpers/fixer.jsx'

class LatestBadge extends React.Component {
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

export default Radium(LatestBadge)
