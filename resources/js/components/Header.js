import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { PageHeader, Anchor, } from 'antd';
import { connect } from "react-redux";
//store.dispatch({ type: "INCREMENT", otraVar:'oooo' });

class Header extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return (
            <Anchor><PageHeader
                title='Prueba'
                className="site-page-header"
                extra={[
                    <Link key="login" to="/login">Login</Link>,
                    <Link key="register" to="/register">Register</Link>
                ]}
            >
            </PageHeader>
            </Anchor>     
        );
    }
}

function mapStateToProps(state) {
  return {
    isLogged: state.loggin
  }
}

export default connect(mapStateToProps)(Header);