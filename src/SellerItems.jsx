import React, { Component } from 'react';
import OneItem from './OneItem.jsx';
import { connect } from 'react-redux';
import styled from 'styled-components';

let Button = styled.button`
  border: 1px solid lightgrey;
  padding: 1em 2em;
  font-size: 1.5em;
  font-family: helvetica;
  text-transform: uppercase;
  font-weight: lighter;
  color: purple;
  width: 100%;
  &:hover {
    cursor: pointer;
    color: violet;
  }
  &:focus {
    outline: 0;
  }
`;

class SellerItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount = () => {
    let updateItems = async () => {
      // console.log(this.props.items);
      let responseBody = await fetch('/all-items', { method: 'POST' });
      let responseText = await responseBody.text();
      let itemsArray = JSON.parse(responseText);
      this.props.dispatch({
        type: 'set-items',
        content: itemsArray
      });
      this.props.dispatch({
        type: 'clear-tags'
      });
      this.setState({ items: this.props.items });
    };
    updateItems();
  };
  render = () => {
    let results = this.state.items.filter(item => {
      if (this.state.items === '') return true;
      console.log('tag', this.props.searchTag);
      return item.tag.includes(this.props.searchTag);
    });
    results = results.filter(item => {
      return item.seller === this.props.user;
    });
    if (results.length === 0 && this.state.items.length !== 0) {
      return <div style={{ marginTop: '5em' }}>No contents to display</div>;
    }

    return (
      <div style={{ marginTop: '5em' }}>
        <h1 className="all-items-title">Selling</h1>
        <p
          className="all-items-title"
          style={{ margin: '-1em 0 0 0', textTransform: 'none' }}
        >
          Click item to edit
        </p>
        <div className="all-items-display">
          {results.map((item, index) => {
            return (
              <div key={index}>
                {<OneItem item={item} link="seller-item-detail/" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    items: state.items,
    user: state.username,
    searchTag: state.searchTag
  };
};

export default connect(mapStateToProps)(SellerItems);
