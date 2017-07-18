import React from 'react'
import Radium from 'radium'

import { parseImageURL, parseText } from '../helpers/fixer.jsx'

class User extends React.Component {

  render () {
    const isInIframe = window.self !== window.top

    const children = (
      <div>
        <img src={parseImageURL(this.props.image)} style={styles.image} />
        <div style={styles.title}>
          {parseText(this.props.title)}
        </div>
        <div>{parseText(this.props.description)}</div>

        {/* Shadow */}
        <div style={styles.shadow} />
      </div>
    )

    if (isInIframe) {
      return (
        <div style={[styles.base]}>
          {children}
        </div>
      )
    } else {
      return (
        <a
          style={[styles.base, styles.baseClickable]}
          href={this.props.link}>
          {children}
        </a>
      )
    }
  }
}

const WIDTH = 240
const HEIGHT = 420

const styles = {
  base: {
    position: 'relative',
    boxSizing: 'border-box',

    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    outline: 'none',
    color: 'inherit',
    textDecoration: 'none',

    border: 0,
    textAlign: 'left',
    backgroundColor: 'white',
    margin: 8,
    width: WIDTH,
    height: HEIGHT,
    overflow: 'hidden',
    padding: 16
  },

  baseClickable: {
    ':hover': {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    }
  },

  image: {
    display: 'block',
    margin: '0 auto'
  },

  title: {
    fontWeight: '300',
    fontSize: '2em'
  },

  shadow: {
    boxShadow: 'inset 0px -98px 100px -33px white',
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none'
  }
}

export default Radium(User)
