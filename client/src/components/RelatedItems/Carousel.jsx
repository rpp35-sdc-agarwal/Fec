import React from 'react';
import ReactDOM from 'react-dom';
// import '../carousel.css';
import RelatedList from './RelatedList.jsx'
import Card from './Card.jsx'
import axios from 'axios';

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      relatedItems: [],
      currentProductId: ''

    }
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentProductId !== this.props.currentProductId) {
      this.setState({
        currentProductId: this.props.currentProductId
      }, () => {
        axios.get(`/products/${this.state.currentProductId}/related`)
        .then((res) => {
          this.setState({
            relatedItems: res.data
          }, () => console.log(this.state.relatedItems))
        })
        .catch((err) => console.log('there was an error'))
      })
    }
  }


  next(){
    if (this.state.currentIndex < (this.state.relatedItems.length - 3)) {
        this.setState({
          currentIndex: this.state.currentIndex + 1
        })
    }
  }

  prev(){
    if (this.state.currentIndex > 0) {
        this.setState({
          currentIndex: this.state.currentIndex - 1
        })
    }
}

  render() {

    return (

      <div className="wrapper">
        <div className="slider">
          {
            this.state.currentIndex > 0 &&
          <button className="cButton leftSide" onClick={this.prev}>
            <i class="arrow left"></i>
          </button>
          }
          <RelatedList
          products={this.state.relatedItems}
          type={'related'}
          isRelated={true}
          shift={this.state.currentIndex}
          />

          {this.state.currentIndex < (this.state.relatedItems.length - 3) &&

          <button className="cButton rightSide" onClick={this.next}>
            <i class="arrow right"></i>
          </button>
          }
        </div>
      </div>




    )
  }

}

export default Carousel