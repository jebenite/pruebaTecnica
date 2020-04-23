import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Login from './Login';
import history from './history';
import { Button, PageHeader,Anchor, } from 'antd';
import Regsiter from './Register';
import Example from './Example';

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <Router>
                <Anchor>
                    <PageHeader
                        title='Prueba'
                        className="site-page-header"
                        extra={[
                            <Link key="login" to="/login">Login</Link>,
                            <Link key="register" to="/register">Register</Link>
                        ]}
                    >
                    </PageHeader>
                </Anchor>
                    <Route history={history} path="/login" exact component={Login}/>
                    <Route history={history} path="/register" exact component={Regsiter}/>
                    <Route path="/dashboard" exact component={Example}/>
            </Router>
            </div>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
