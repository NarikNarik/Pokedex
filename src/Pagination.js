import React, { Component } from 'react'
import './Pagination.css'

class Pagination extends Component {
  makePaginationItems = () => {

    let items = []
    for(let i = 0; i < this.props.totalPages; i++){
      let styleName = 'Pagination-button'
      if (i+1 === this.props.currentPage) styleName +=' Current-button'
      items.push(<button className={styleName}
      key={i} onClick={this.props.handlePageClick} >{i+1}</button>)
    }
    return items
  }
    render(){
      return (
      <div className='qwe'>
        <div className='qqq'>
          <select className='Swaplimit-buttons' value={this.props.limit} onChange={this.props.setItemsPerPage}>
          <option value='100'>100</option>
          <option value='150'>150</option>
          <option value='200'>200</option>
          </select>
        </div>
      <div className='Pagination'>
        <button className='Nav button' disabled={this.props.currentPage === 1} onClick={this.props.prevPage}>{'<'}</button>
        <ul className='Container-buttons'>
          {this.makePaginationItems()}
        </ul>
        <button className='Nav button' disabled={this.props.currentPage === this.props.totalPages} onClick={this.props.nextPage}>{'>'}</button>

      </div>
      </div>
      )
    }






}
  export default Pagination
