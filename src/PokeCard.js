import React, { Component } from 'react'
import Profile from './Profile'
import './PokeCard.css'

class PokeCard extends Component {
  constructor (props) {
  super(props)
    this.state = {
    profileIsOpen: false
    }
  }
    openProfile = () => {
      this.setState({
    profileIsOpen: true
      })
    }
    closeProfile = () => {
      this.setState({
    profileIsOpen: false
      })
    }

    render() {
      return(
        <div className='AllCards'>
        <div className='AllCards-pokemonName'>
        { this.props.name }
          </div>
          ***
          <div className='id'>
          ID:{this.props.id}
          </div>
          <div>
            <img className='AllCards-image'
                src={ this.props.sprites.front_default }
                alt={ this.props.name }/>
          </div>
          <button className='AllCards-button' onClick={this.openProfile}>Info...</button>
            {
            this.state.profileIsOpen
            ? <Profile {...this.props} closeProfile={this.closeProfile}/>
            : null
          }
        </div>
      )
    }
}
export default PokeCard
