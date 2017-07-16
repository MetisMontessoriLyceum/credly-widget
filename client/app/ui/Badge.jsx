import React from 'react'

import fixImageURL from '../helpers/fixImageURL.jsx'

export default class User extends React.Component {
  render () {
    const WIDTH = 240
    const HEIGHT = 420
    return (
      <div style={{
        position: 'relative',
        boxSizing: 'border-box',

        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        backgroundColor: 'white',
        margin: 8,
        width: WIDTH,
        height: HEIGHT,
        overflow: 'hidden',
        padding: 16
      }}>
        <img src={fixImageURL(this.props.image)} style={{
          display: 'block',
          margin: '0 auto'
        }} />
        <div style={{
          fontWeight: '300',
          fontSize: '2em'
        }}>
          {this.props.title}
        </div>
        <div>{this.props.description}</div>

        {/* Shadow */}
        <div style={{
          boxShadow: 'inset 0px -98px 100px -33px white',
          width: WIDTH,
          height: HEIGHT,
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }} />
      </div>
    )
  }
}
