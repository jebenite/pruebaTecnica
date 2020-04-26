import React, { Component } from 'react';
import { Empty, Anchor, } from 'antd';
import Header from './Header';
//store.dispatch({ type: "INCREMENT", otraVar:'oooo' });

class Main extends Component {
    constructor(props) {
        super(props);
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

export default Main;