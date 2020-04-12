import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; 
import { Form, Input, Button, notification } from 'antd';
import { SmileOutlined, WarningOutlined } from '@ant-design/icons';
import url from './url';
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

export default class Regsiter extends Component {
  constructor(props){
    super(props)
    this.state = {
      keyForm: 1,
      loading: false,
      messageErrorName: '',
      errorName: '',
      messageErrorEmail: '',
      errorEmail: '',
      messageErrorPassword: '',
      errorPassword: '',
      isLogginInNot: false,
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }
  componentDidMount() {
    if(localStorage["appState"]){
      window.location.href = "/";
    }else{
      this.setState({
        isLogginInNot: true
      })
    }
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
    this.setState({messageErrorEmail: '', errorEmail: '', messageErrorName:'', errorName:'', messageErrorPassword:'',
      errorPassword: ''
    });
    values.errorFields.forEach(element => {
      let name= element.name[0];
      let message= element.errors[0];
      if(name=='email'){
        this.setState({messageErrorEmail: message, errorEmail: messageError});
      }
      if(name=='name'){
        this.setState({messageErrorName: message, errorName: messageError});
      }
      if(name=='password'){
        this.setState({messageErrorPassword: message, errorPassword: messageError});
      }
    }
    );
  }
  async onFinish(values){
    try {
      this.setState({messageErrorEmail: '', errorEmail: '', messageErrorName:'', errorName:'', messageErrorPassword:'',
        errorPassword: '', loading: true
      });
      let res = await fetch(`${url}/api/register`, {
        method: 'POST',
        body: JSON.stringify(values), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      let data = await res.json()
      if(data.mensaje=="Error"){
        this.openNotification(data.mensaje, 'Please, review your inputs', true);
        if(data.datos.email){
          this.setState({messageErrorEmail: data.datos.email[0], errorEmail: messageError});
        }
        if(data.datos.name){
          this.setState({messageErrorName: data.datos.name[0], errorName: messageError});
        }
        if(data.datos.password){
          this.setState({messageErrorPassword: data.datos.password[0], errorPassword: messageError});
        }
      }
      else{
        this.setState({
          keyForm: this.state.keyForm+1
        })
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
          <span>
            {this.state.isLogginInNot?
            (<Form
              key={this.state.keyForm}
          {...layout}
          name="basic"
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
            label="Password"
            name="password" 
            validateStatus={this.state.errorPassword}
            help={this.state.messageErrorPassword}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password allowClear/>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            validateStatus={this.state.errorName}
            help={this.state.messageErrorName}
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
            <Button type="primary" htmlType="submit"  loading={this.state.loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>):''
      }
        </span>
        );
    }
}

if (document.getElementById('regsiter')) {
    ReactDOM.render(<Regsiter />, document.getElementById('regsiter'));
}
