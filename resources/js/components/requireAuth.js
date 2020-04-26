import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
        if (!localStorage["appState"]) {
            notification.open({
                message: 'Ups!',
                description: 'You dont have permissions',
                icon: <WarningOutlined style={{ color: '#eb2f96' }} />
              });
            this.props.history.push('/login');
        }
        else{
            this.props.dispatch({type:'LOGEADO'});
        }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/login');
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