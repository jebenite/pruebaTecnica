import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Formulario from './Formulario'
import { Form, Input, Button, notification, Modal, Card } from 'antd';
import { SmileOutlined, WarningOutlined } from '@ant-design/icons';
import url from './url';
import updateWord from '../store/action';
import { connect } from "react-redux";
import Header from './Header';

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
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogginInNot: false,
      showModal: false,
      loadingLogin: false,
    };
    this.onFinish = this.onFinish.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }
  showModal() {
    //this.props.dispatch(updateWord(4));
    this.setState({
      showModal: true
    })
  }
  componentDidMount() {
    if (localStorage["appState"]) {
      this.props.history.push('/dashboard');
    }
    else {
      this.setState({
        isLogginInNot: true
      })
    }
  }
  async onFinish(values) {
    try {
      this.setState({
        loadingLogin: true
      })
      let res = await fetch(`${url}/api/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await res.json();
      if (data.status != 200) {
        this.openNotification('Error', data.mensaje, true);
      }
      else {
        await this.guardarStorage(data);
        this.props.dispatch({type:'LOGEADO'});
        this.openNotification('Success', data.mensaje, false);
        this.props.history.push('/dashboard');
      }
      this.setState({
        loadingLogin: false
      })
    } catch (error) {
      this.openNotification('Error', 'Error ocurred!', true);
    }
  }
  openNotification(title, description, isError) {
    notification.open({
      message: title,
      description: description,
      icon: isError ? <WarningOutlined style={{ color: '#eb2f96' }} /> : <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
  handleCancel() {
    this.setState({
      showModal: false
    })
  }
  guardarStorage(data) {
    var promise = new Promise(function (resolve) {
      localStorage["appState"] = data.datos;
      localStorage["dataUser"] = JSON.stringify(data.dataUser);
      resolve();
    });
    return promise;
  }
  render() {
    /*const counter= useSelector(state=>state.count);
    const logginIs= useSelector(state=>state.loggin);
    const dispatch= useDispatch();*/

    return (
      <span>
        <Modal
          closable={false}
          width={800}
          title="Form Password Update"
          visible={this.state.showModal}
          footer={null}
        >
          <Formulario handleCancel={this.handleCancel} />
        </Modal>
        {this.state.isLogginInNot ?
          (
          <span>
          <Header/>
          <Card title="Login" style={{ width: '100%' }}>
            <Form
              {...layout}
              name="basic"
              onFinish={this.onFinish}
            >

              <Form.Item
                label="Email"
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
                label="Password"
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
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={this.state.loadingLogin}>
                  Submit
            </Button>
              <Button type="link" onClick={this.showModal}>Update Password</Button>
              </Form.Item>
            </Form>
          </Card>
          </span>
          ) : ''
        }

      </span>
    );
  }
}

export default connect()(Login);