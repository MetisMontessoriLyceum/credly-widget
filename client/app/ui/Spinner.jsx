import React from 'react'
import Radium from 'radium'

class Spinner extends React.Component {
  render () {
    const loading = Radium.keyframes({
      to: { transform: 'rotate(360deg)' }
    })

    return (
      <div style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'transparent',

        borderTop: '4px solid #5e5e5e',
        borderRight: '4px solid #5e5e5e',
        borderBottom: '4px solid #5e5e5e',
        borderLeft: '4px solid #dfdfdf',
        animation: 'loading 1.2s infinite  linear',
        animationName: loading
      }} />
    )
  }
}

export default Radium(Spinner)
