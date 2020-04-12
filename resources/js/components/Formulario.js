import React, { Component } from 'react';
import { Form, Input, Button, notification, Divider } from 'antd';
import { SmileOutlined, WarningOutlined } from '@ant-design/icons';
import url from './url';

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
export default class Formulario extends Component {
  constructor(props){
    super(props)
    this.state = {
      keyForm: 1,
      loading: false,
    };
    this.onFinish = this.onFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }
    openNotification(title, description, isError){
      notification.open({
        message: title,
        description: description,
        icon: isError?<WarningOutlined style={{ color: '#eb2f96' }} />:<SmileOutlined style={{ color: '#108ee9' }} />,
      });
    };
    handleCancel(){
      this.setState({
        keyForm: this.state.keyForm+1
      })
      this.props.handleCancel();
    }
    async onFinish(values){
      try {
        this.setState({
          loading: true
        })
        let res = await fetch(`${url}/api/newpassword`, {
          method: 'POST',
          body: JSON.stringify(values), 
          headers:{
            'Content-Type': 'application/json'
          }
        })
        let data = await res.json();
        if(data.status!=200){
          this.openNotification('Error', data.mensaje, true);
        }
        else{
          this.props.handleCancel();
          this.openNotification('Success', data.mensaje, false);
        }
        this.setState({
          loading: false
        })
      } catch (error) {
        this.openNotification('Error', 'Error ocurred!', true);
      }
    }
    render() {
        return (
          <Form
          key={this.state.keyForm}
          {...layout}
          name="basic"
          onFinish={this.onFinish}
        >
          <Form.Item
            label="email"
            name="email"
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
            label="Old password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New password"
            name="password_new"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Submit
            </Button>
            <Divider type="vertical" />
            <Button onClick={this.handleCancel}>
              Close
            </Button>
          </Form.Item>
        </Form>
          
        );
    }
}

