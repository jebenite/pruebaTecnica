import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login';
import history from './history';
import Regsiter from './Register';
import Example from './Example';
import Main from './Main';
import { Provider } from 'react-redux';
import store from '../store';
import { connect,useSelector,useDispatch } from "react-redux";
//store.dispatch({ type: "INCREMENT", otraVar:'oooo' });

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginIn: false,
        };
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route history={history} path="/" exact component={Main} />
                    <Route history={history} path="/login" exact component={Login} />
                    <Route history={history} path="/register" exact component={Regsiter} />
                    <Route history={history} path="/dashboard" exact component={Example} />
                </Router>
            </Provider>
        );
    }
}


export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
