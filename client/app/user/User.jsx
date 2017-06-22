import React from 'react'
import Container from '../ui/Container.jsx'
import Header from '../ui/Header.jsx'
import Badges from '../ui/Badges.jsx'
import Footer from '../ui/Footer.jsx'

export default class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    window.fetch(`/api/user/${this.props.id}`).then(r => r.json())
      .then(user => {
        console.log(user)
        console.log(this)
        this.setState({ user })
      })
  }
  render () {
    if (this.state.user) {
      return (
        <Container>
          <Header title={this.state.user.name} />
          <Badges badges={this.state.user.badges} />
          <Footer />
        </Container>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}
