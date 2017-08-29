import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[['Buff', 'Subject 1', 1], ['Debuff', 'Subject 2', 2]] //Dummy items
    }

    this.addItem = this.addItem.bind(this);
    this.advanceRound = this.advanceRound.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  //Add a new item to the working list
  addItem(event) {
    event.preventDefault();//Prevent form submission from reloading the page
    var newListItem = [$('#buffInput').val(), $('#subjectInput').val(), $('#durationInput').val()] //Create new item via 
    var newItemsState = this.state.items.slice();
    newItemsState.unshift(newListItem);
    this.setState({items: newItemsState});
    $('#buffInput').val('');
    $('#subjectInput').val('');
    $('#durationInput').val('');
  }

  //Advance to the next round. Make all round counts decrease by 1.
  advanceRound() {
    var tempItemList = [];
    for (var i = 0; i < this.state.items.length; i++) {
      if(this.state.items[i][2] != 1 && this.state.items[i][2] != 0) {
        tempItemList.push([this.state.items[i][0], this.state.items[i][1], this.state.items[i][2] - 1]);
      }
    }
    console.log(tempItemList);
    this.setState({items: tempItemList});
  }

  clearItems() {
    this.setState({items: []});
  }

  render() {
    var itemList = this.state.items.map((buff) => { //Map all current items to display
        return (
          <ListItem effect={buff[0]} subject={buff[1]} duration={buff[2]+' Rounds'}/>
        )
    });

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>D&D Timer</h2>
        </div>
        
        <form id='inputForm' onSubmit={(e) => this.addItem(e)}>
          <input id='buffInput' type='text' placeholder='Buff description'/>
          <input id='subjectInput' type='text' placeholder='Subject'/>
          <input id='durationInput' type='number' placeholder='Duration' style={{width: '70px'}}/>
          <input type='submit' value='Add'/>
        </form>
        <button onClick={this.advanceRound}> Next Round </button>
        <button onClick={this.clearItems}> Clear </button>
        <div id='displayList'>
          <div>{itemList}</div>
        </div>
      </div>
    );
  }
}

export default App;
