import React, { Component } from 'react'
import PokeCard from './PokeCard.js'
import Pagination from './Pagination.js'
import Search from './Search.js'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    data: [],
    limit: 150,
    offset: 0,
    cards: null,
    count: null,
    totalPages: 0,
    currentPage: 1
  }

  getData = async () => {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=${this.state.limit*(this.state.currentPage-1)}`)
    .then((res) => {
      let pages = Math.ceil(res.data.count / this.state.limit)
      return this.setState({
        data:res.data.results,
        count:res.data.count,
        totalPages:pages,
        next:res.data.next,
        previous:res.data.previous
      })
    })
    .catch(err => console.log(err))
    this.getPokeInfo()

  }

  getPokeInfo = async () => {
    let promises = this.state.data.map(item => {
      return axios.get(item.url)
    })
    Promise.all(promises).then(pokemonData => {
      let cards = pokemonData.map(item => item.data)
      this.setState({
        cards
      })
      console.log(this.state.cards, 'pokemons')
    })
  }

  async componentDidMount(){
     await this.getData()
  }

  async componentDidUpdate(prevProps, prevState){
    if (prevState.currentPage === this.state.currentPage &&
        prevState.limit === this.state.limit) return null
    await this.getData()
  }

  handlePageClick = (event) => {
    console.log(event.target)
    this.setState({currentPage: +event.target.innerHTML})
  }

  prevPage = () => {
      this.setState({
         currentPage: this.state.currentPage - 1
      })
   }

   nextPage = () => {
      this.setState({
         currentPage: this.state.currentPage + 1
      })
   }

   setItemsPerPage = (event) => {
      this.setState({
         limit: event.target.value
      })
   }

  render(){

    return (
      <div className='Main'>

        <Search />

        <Pagination
          setItemsPerPage={this.setItemsPerPage}
          currentPage={this.state.currentPage}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          handlePageClick={this.handlePageClick}
          totalPages={this.state.totalPages}
          limit={this.state.limit}
        />

      <div className='Main-container'>
        {
           this.state.cards && this.state.cards.map((item, index) => {
              return <PokeCard {...item} key={index}/>
           })
        }
      </div>

      </div>
    )
  }
}

export default App
