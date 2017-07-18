import React from 'react'

import { parseText } from '../helpers/fixer.jsx'

export default class Header extends React.Component {
  render () {
    return (
      <div>
        {parseText(this.props.title)}
      </div>
    )
  }
}
