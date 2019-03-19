import React, {Component} from 'react';
import {Button, Input, Modal, Form, Message} from 'semantic-ui-react'
import {buildurl} from "./helper"
import axios from "axios";

class LoginModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            loading  : false,
            error    : null
        }
    }

    login = () => {
        this.setState({loading: true, error: null});

        let payload = {
            email: this.state.username,
            password: this.state.password
        }
        axios.post(buildurl("api/instructor/v1/login"), payload, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let error = null;
                if (response.data && response.data.success === true && response.data.authenticationInfo && response.data.authenticationInfo.authToken) {
                    this.props.onLogin(response.data.authenticationInfo.authToken);
                } else {
                    error = "Invalid login";
                    if (response && response.data && response.data.errorCode) {
                        error = response.data.errorCode;
                    }
                    console.warn(response);
                }

                this.setState({loading: false, error: error});
            })
            .catch(error => {
                this.setState({loading: false, error: error.message});
            });
    };

    onCancel = () => {
        this.props.close();
    };

    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
    };

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    render() {
        return (
            <Modal open={this.props.open} size={'tiny'} closeIcon
                   onClose={this.onCancel} centered={false}
                   closeOnDimmerClick={false}>
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Form loading={this.state.loading}>
                        <Form.Field>
                            <label>Username</label>
                            <Input icon='user' type="email" iconPosition='left' placeholder='Username' value={this.state.username} onChange={this.onUsernameChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input icon='key' type="password" iconPosition='left' placeholder='Password' value={this.state.password} onChange={this.onPasswordChange}/>
                        </Form.Field>
                        {this.state.error ? (
                            <Message negative>{this.state.error}</Message>
                        ):(null)}
                        <Button onClick={this.login} positive fluid>
                            Login
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginModal
