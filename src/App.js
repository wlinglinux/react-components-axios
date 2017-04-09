import React, { Component } from 'react';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      direction: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex, e) {
    // alert('selected=' + selectedIndex + ', direction=' + e.direction);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        <CarouselItem className='carousel-item'>
          <img alt="900x500" src="http://www.cgigc.com.cn/upload/invest/2015-11-16/invest-4766394873784-carouse.jpg"/>
          <div className='carousel-caption'>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </CarouselItem>
        <CarouselItem  className='carousel-item'>
          <img alt="900x500" src="http://www.cgigc.com.cn/upload/invest/2015-11-16/invest-4766371090048-carouse.jpg"/>
          <div className='carousel-caption'>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </CarouselItem>
        <CarouselItem  className='carousel-item'>
          <img alt="900x500" src="http://www.cgigc.com.cn/upload/invest/2015-11-17/invest-4775828794802-carouse.jpg"/>
          <div className='carousel-caption'>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
        </CarouselItem>
      </Carousel>
    );
  }
}

export default App;
