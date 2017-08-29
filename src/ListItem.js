import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div> {this.props.effect} | {this.props.subject} | {this.props.duration} </div>
        )
    }
}

export default ListItem