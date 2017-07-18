import React from 'react'
import Radium from 'radium'
import { parseText } from '../helpers/fixer.jsx'

class Header extends React.Component {
  render () {
    return (
      <div>
        {parseText(this.props.title)}
      </div>
    )
  }
}

export default Radium(Header)
