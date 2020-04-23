import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Card, Input, Row, Col, Tooltip, Button, Popconfirm, Pagination, PageHeader, Anchor, notification, Modal } from 'antd';
import { SearchOutlined, DeleteOutlined, EditOutlined, SmileOutlined, WarningOutlined } from '@ant-design/icons';
import User from './User';
import url from './url';

const bearer = 'Bearer ';

export default class Example extends Component {
    constructor(props) {
        super(props)
        // definimos el state
        this.state = {
            loadingLogOut: false,
            keyForm: 1,
            showModal: false,
            isLogginIn: false,
            totalUser: 0,
            users: [],
            loading: true,
            search: '',
            dataUser: {
                name: '',
                specialist: ''
            }
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.changePage = this.changePage.bind(this);
        this.logout = this.logout.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.loadUsers = this.loadUsers.bind(this);

        this.columns = [
            {
                title: '',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Specialist',
                dataIndex: 'specialist',
                key: 'specialist',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Tooltip title="edit">
                            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => this.prepareUpdate(record)} />
                        </Tooltip>
                        {this.state.dataUser.id != record.id ?
                            (<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
                            </Popconfirm>) : ''
                        }

                    </span>
                ),
            },
        ];
    }
    async logout() {
        try {
            this.setState({
                loadingLogOut: true
            })
            var header = bearer + localStorage["appState"];
            localStorage.clear();
            let res = await fetch(`${url}/api/logout`, {
                headers: {
                    'Authorization': header,
                }
            });
            let data = await res.json();
            if (data.status == '200') {
                this.openNotification('Success', data.mensaje, false);
                window.location.href = "/login";
            }
            else {
                this.openNotification('Error', 'Something went wrong', false);
            }
        } catch (error) {
            this.openNotification('Error', error, true);
        }
    }
    openNotification(title, description, isError) {
        notification.open({
            message: title,
            description: description,
            icon: isError ? <WarningOutlined style={{ color: '#eb2f96' }} /> : <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    async handleSearch() {
        let search = this.state.search.trim();
        if (search.length) {
            this.setState({
                loading: true
            })
            //var url = new URL('http://localhost:8000/api/usuarios'),
            var url = new URL('http://pruebatecnicaapp.herokuapp.com/api/usuarios'),
                params = {
                    busqueda: search,
                };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            try {
                var header = bearer + localStorage["appState"];
                let res = await fetch(url, {
                    headers: {
                        'Authorization': header,
                    }
                });
                let data = await res.json();
                this.setState({
                    users: data.datos.data,
                    totalUser: data.datos.total,
                    loading: false,
                })
            } catch (error) {
                this.openNotification('Error', error, true);
            }
        }
        else {
            this.loadUsers();
        }
    }
    prepareUpdate(userData) {
        this.setState({
            keyForm: this.state.keyForm + 1,
            userData: userData,
            showModal: true
        })
    }
    async changePage(event) {
        let search = this.state.search.trim();
        //var url = new URL('http://localhost:8000/api/usuarios'),
        var url = new URL(' http://pruebatecnicaapp.herokuapp.com/api/usuarios'),
            params = {
                busqueda: search,
                page: event
            };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        try {
            var header = bearer + localStorage["appState"];
            let res = await fetch(url, {
                headers: {
                    'Authorization': header,
                }
            });
            let data = await res.json();
            this.setState({
                users: data.datos.data,
                totalUser: data.datos.total,
                loading: false,
            })
        } catch (error) {
            this.openNotification('Error', error, true);
        }
    }
    async handleDelete(id) {
        try {
            var header = bearer + localStorage["appState"];
            let res = await fetch(`${url}/api/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': header,
                }
            })
            let data = await res.json();
            await this.loadUsers();
        } catch (error) {
            this.openNotification('Error', error, true);
        }
    }
    // realizamos la peticion
    async componentDidMount() {
        if (localStorage["appState"]) {
            this.setState({ dataUser: JSON.parse(localStorage["dataUser"]) });
            this.setState({
                isLogginIn: true
            })
            await this.loadUsers();
        }
        else {
            window.location.href = "/login";
        }
    }
    handleCancel() {
        this.setState({
            showModal: false
        })
    }
    async handleChangeSearch(event) {
        this.setState({ search: event.target.value });
        let search = event.target.value.trim();
        if (!search.length) {
            await this.loadUsers();
        }
    }
    async loadUsers() {
        var header = bearer + localStorage["appState"];
        this.setState({
            loading: true
        })
        try {
            let res = await fetch(`${url}/api/usuarios`, {
                headers: {
                    'Authorization': header,
                }
            });
            // almacenamos la respeusta en data
            let data = await res.json();
            this.setState({
                users: data.datos.data,
                totalUser: data.datos.total,
                loading: false,
            })
        } catch (error) {
            this.openNotification('Error', error, true);
        }
    }
    render() {
        return (
            <div align="center">
                <Modal
                    closable={false}
                    width={800}
                    title="Form User"
                    visible={this.state.showModal}
                    footer={null}
                >
                    <User handleCancel={this.handleCancel} loadUsers={this.loadUsers} userData={this.state.userData} keyForm={this.state.keyForm} />
                </Modal>
                {this.state.isLogginIn ?
                    (
                        <span>
                            <Anchor>
                                <PageHeader
                                    title={this.state.dataUser.name}
                                    className="site-page-header"
                                    subTitle={this.state.dataUser.specialist}
                                    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                                    extra={[
                                        <Button key="log" loading={this.state.loadingLogOut} type="link" onClick={this.logout}>Log out</Button>
                                    ]}
                                >
                                </PageHeader>
                            </Anchor>
                            <Card size="small" title="Users">
                                <Row>
                                    <Col xs={{ span: 19, offset: 1 }} lg={{ span: 9, offset: 13 }}>
                                        <Input placeholder="Filter" allowClear value={this.state.search} onChange={this.handleChangeSearch} />
                                    </Col>
                                    <Col xs={{ span: 2, offset: 0 }} lg={{ span: 1, offset: 0 }}>
                                        <Tooltip title="search">
                                            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={this.handleSearch} />
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Table scroll={{ x: true }} loading={this.state.loading} columns={this.columns} dataSource={this.state.users} pagination={false} />
                                <Pagination defaultCurrent={1} total={this.state.totalUser} defaultPageSize={15} onChange={this.changePage} />
                            </Card></span>) : ''
                }

            </div>
        );
    }
}

