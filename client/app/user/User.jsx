import React from 'react'
import Radium from 'radium'
import { fetch, SCRIPT_HOST } from '../helpers/crossURL.jsx'

import Container from '../ui/Container.jsx'
import Header from '../ui/UserHeader.jsx'
import Badges from '../ui/Badges.jsx'
import Footer from '../ui/Footer.jsx'
import Spinner from '../ui/Spinner.jsx'

const debug = require('debug')('credly-widget:component:User')

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    fetch(`/api/user/${this.props.id}`).then(r => r.json())
      .then(user => {
        debug(user)
        this.setState({ user })
      })
  }
  render () {
    if (this.state.user) {
      return (
        <Container>
          <Header user={this.state.user.user} />
          <Badges badges={this.state.user.badges} />
          <Footer />
        </Container>
      )
    } else {
      return (
        <Container style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '128px'
        }}>
          <img src={`${SCRIPT_HOST}/assets/metis.svg`} style={{
            filter: 'grayscale(100%)',
            height: 200,
            marginBottom: '32px'
          }} />
          <Spinner />
        </Container>
      )
    }
  }
}

export default Radium(User)
