import React, { Component } from 'react';
import { Empty, Anchor, } from 'antd';
import Header from './Header';
//store.dispatch({ type: "INCREMENT", otraVar:'oooo' });

class Main extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        console.log(11111111);
        if (localStorage["appState"]) {
            this.props.history.push('/dashboard');
        }
    }
    render() {
        return (
                <span>
                    <Header/>
                    <Empty description={false} />
                </span>
        );
    }
}

function mapStateToProps(state) {
  return {
    isLogged: state.loggin
  }
}

export default Main;