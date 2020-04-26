import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
        if (localStorage["appState"]) {
          this.props.dispatch({type:'LOGEADO'});
            this.props.history.push('/dashboard');
        }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.loggin
    };
  }

  return connect(mapStateToProps)(Authenticate);
}