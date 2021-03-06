import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import Login from './Login';
import Notfound from './Notfound';
import history from './history';
import Regsiter from './Register';
import Example from './Example';
import Main from './Main';
import { Provider } from 'react-redux';
import store from '../store';
import { connect,useSelector,useDispatch } from "react-redux";
import requireAuth from './requireAuth';
import requireAuthLogin from './requireAuthLogin';
//store.dispatch({ type: "INCREMENT", otraVar:'oooo' });

class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                <Switch>
                    <Route history={history} path="/" exact component={requireAuthLogin(Main)} />
                    <Route history={history} path="/login" exact component={requireAuthLogin(Login)} />
                    <Route history={history} path="/register" exact component={requireAuthLogin(Regsiter)} />
                    <Route history={history} path="/dashboard" exact component={requireAuth(Example)} />
                    <Route path="*" exact component={Notfound}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}


export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
