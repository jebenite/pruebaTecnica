import React, { Component } from 'react';
import { Form, Input, Button, notification, Divider } from 'antd';
import { SmileOutlined, WarningOutlined } from '@ant-design/icons';
import url from './url';
const bearer = 'Bearer ' + localStorage["appState"];
const messageError = 'error';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};
export default class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      keyForm: 1,
      messageErrorEmail: '',
      errorEmail: '',
      loading: false
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }
    openNotification(title, description, isError){
      notification.open({
        message: title,
        description: description,
        icon: isError?<WarningOutlined style={{ color: '#eb2f96' }} />:<SmileOutlined style={{ color: '#108ee9' }} />,
      });
    };
    async onFinishFailed(values){
      this.openNotification('Error', 'Please, review your inputs', true)
      this.setState({messageErrorEmail: '', errorEmail: ''});
      values.errorFields.forEach(element => {
        let name= element.name[0];
        let message= element.errors[0];
        if(name=='email'){
          this.setState({messageErrorEmail: message, errorEmail: messageError});
        }
      }
      );
    }
    async onFinish(values){
      try {
        this.setState({messageErrorEmail: '', errorEmail: '', loading: true});
        values.id= this.props.userData.id;
        let res = await fetch(`${url}/api/usuarios/${this.props.userData.id}`, {
          method: 'PUT',
          body: JSON.stringify(values), 
          headers:{
            'Content-Type': 'application/json',
            'Authorization': bearer,
          }
        })
        let data = await res.json();
        if(data.mensaje=="Error"){
          this.openNotification(data.mensaje, 'Please, review your inputs', true);
          if(data.datos.email){
            this.setState({messageErrorEmail: data.datos.email[0], errorEmail: messageError});
          }
        }
        else{
          this.setState({
            keyForm: this.state.keyForm+1
          })
          this.props.loadUsers();
          this.props.handleCancel();
          this.openNotification('Success', data.mensaje, false);
        }
        this.setState({loading: false});
      } catch (error) {
        this.openNotification('Error', 'Error ocurred!', true);
      }
    }
    render() {
        return (
          <Form
          key={this.props.keyForm}
          {...layout}
          name="basic"
          initialValues={this.props.userData}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            validateStatus={this.state.errorEmail}
            help={this.state.messageErrorEmail}
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Specialist"
            name="specialist"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Submit
            </Button>
            <Divider type="vertical" />
            <Button onClick={this.props.handleCancel}>
              Close
            </Button>
          </Form.Item>
        </Form>
          
        );
    }
}

