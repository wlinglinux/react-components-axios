import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;



class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['hello', 'world', 'click', 'me'],
      imgs:['http://www.cgigc.com.cn/member/upload/pms/201703/31112558kvkb.jpg',
      'http://www.cgigc.com.cn/member/upload/pms/201703/29110824k1u1.jpg']
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    const imgs = this.state.imgs.map((img, i) => (
      <div key={i}>
        <img src={img} key={img} />
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}>
          <h1>Fading at Initial Mount</h1>
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="carousel"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {imgs}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
