import React, { Component } from 'react'
import Profile from './Profile'
import axios from 'axios'
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchValue: '',
      pokemonData: [],
      profileIsOpen: false

    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    axios.get(`https://pokeapi.co/api/v2/pokemon/` +  this.state.searchValue)
    .then(res =>{
      return this.setState({
        pokemonData:res.data,
        profileIsOpen: true
      })
    })
    .catch(err => alert("Pokemon does not exist"))
  }

  closeProfile = (e) => {
    this.setState({
  profileIsOpen: false
    })
  }

  handleChange = (event) => {
    this.setState({searchValue: event.target.value})
  }

  render(){
    return(
      <div>
        <h1>Search...</h1>
        <input type="text" value={this.state.searchValue} onChange={this.handleChange}/>
        <button onClick = {this.handleSubmit}>GO!</button>
          {
                    this.state.profileIsOpen && <Profile {...this.state.pokemonData} closeProfile={this.closeProfile}/>
                 }
      </div>


    )
  }

}

export default Search
