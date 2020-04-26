import React, { Component } from 'react';
import { SmileOutlined } from '@ant-design/icons';
//store.dispatch({ type: "INCREMENT", otraVar:'oooo' });

class Notfound extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return (
                <div align="center">
                    <SmileOutlined rotate={180} /> | Page Not Found
                </div>
        );
    }
}

export default Notfound;