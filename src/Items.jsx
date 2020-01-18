import React, { Component } from 'react';
import OneItem from './OneItem.jsx';
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  updateItems = async () => {
    let responseBody = await fetch('/all-items', { method: 'POST' });
    let responseText = await responseBody.text();
    console.log('response Text', responseText);
    let itemsArray = JSON.parse(responseText);
    this.setState({ items: itemsArray });
  };

  render = () => {
    return (
      <div>
        <button onClick={this.updateItems}>Reload items</button>
        {this.state.items.map((item, index) => {
          return <div key={index}>{<OneItem item={item} />}</div>;
        })}
      </div>
    );
  };
}
export default Items;
